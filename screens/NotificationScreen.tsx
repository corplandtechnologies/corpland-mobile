import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MainView from "../components/elements/Views/MainView";
import TextElement from "../components/elements/Texts/TextElement";
import { COLORS } from "../utils/color";
import Icon from "react-native-vector-icons/Ionicons";
import {
  getNotifications,
  markAllNotificationAsRead,
  markNotificationAsRead,
} from "../api/api";
import { useApp } from "../context/AppContext";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { handleError } from "../utils";
import SnackBar from "../components/ui/SnackBar";
import { Notification } from "../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../api";

const NotificationScreen = () => {
  const navigation: any = useNavigation();
  const {
    snackbarVisible,
    setSnackbarVisible,
    setSnackbarMessage,
    snackbarMessage,
    user,
    notifications,
    setNotifications,
    setUser,
    refreshing,
    setRefreshing,
    setUnreadNotifications,
    updateUnreadNotificationCount,
    refreshUserData,
  } = useApp();
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  useEffect(() => {
    refreshUserData();
  }, []);

  const fetchNotifications = async () => {
    setNotificationsLoading(true);
    try {
      const { data } = await getNotifications(user?._id);
      const sortedNotifications = data?.data.sort(
        (a: Notification, b: Notification) =>
          moment(b.createdAt).diff(moment(a.createdAt))
      );

      setNotifications(sortedNotifications);
    } catch (error) {
      // setSnackbarMessage(handleError(error));
      // setSnackbarVisible(true);
    } finally {
      setNotificationsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [notifications.length]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "transaction":
        return "cash-outline";
      case "order":
        return "cube-outline";
      case "user":
        return "person-outline";
      case "product":
        return "pricetag-outline";
      case "request":
        return "paper-plane-outline";
      case "ad":
        return "megaphone-outline";
      default:
        return "notifications-outline";
    }
  };

  const handleNotificationNavigation = async (id: string) => {
    setNotificationsLoading(true);

    try {
      const { data } = await markNotificationAsRead(id);

      switch (data.data.type) {
        case "transaction":
          return navigation.navigate("Wallet");
        case "order":
          return navigation.navigate("Orders");
        case "user":
          return navigation.navigate("Profile");
        case "product":
          return navigation.navigate("MyProducts");
        case "request":
          return navigation.navigate("MyRequests");
        case "ad":
          return navigation.navigate("MyAds");
        default:
          return navigation.navigate("Profile");
      }
    } catch (error) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
    } finally {
      setNotificationsLoading(false);
    }
  };

  const handleAllNotificationStatus = async () => {
    setNotificationsLoading(true);
    try {
      await markAllNotificationAsRead(user?._id);
      fetchNotifications();
    } catch (error) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
    } finally {
      setNotificationsLoading(false);
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = moment();
    const notificationDate = moment(date);
    const duration = moment.duration(now.diff(notificationDate));

    if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())}m`;
    } else if (duration.asHours() < 24) {
      return `${Math.floor(duration.asHours())}h`;
    } else if (duration.asDays() < 7) {
      return `${Math.floor(duration.asDays())}d`;
    } else if (duration.asWeeks() < 4) {
      return `${Math.floor(duration.asWeeks())}w`;
    } else if (duration.asMonths() < 12) {
      return `${Math.floor(duration.asMonths())}mo`;
    } else {
      return `${Math.floor(duration.asYears())}y`;
    }
  };

  const groupNotificationsByDate = (): { [key: string]: Notification[] } => {
    return notifications.reduce(
      (groups: { [key: string]: Notification[] }, notification) => {
        const date = moment(notification.createdAt).format("YYYY-MM-DD");
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(notification);
        return groups;
      },
      {}
    );
  };

  const renderNotifications = () => {
    const groupedNotifications = groupNotificationsByDate();

    return Object.entries(groupedNotifications).map(([date, notifications]) => {
      let displayDate: string;
      if (moment(date).isSame(moment(), "day")) {
        displayDate = "TODAY";
      } else if (moment(date).isSame(moment().subtract(1, "day"), "day")) {
        displayDate = "YESTERDAY";
      } else {
        displayDate = moment(date).format("DD MMMM YYYY");
      }

      return (
        <View key={date} style={styles.dateGroup}>
          <View style={styles.timeView}>
            <TextElement fontFamily="poppinsMedium" color={COLORS.GRAY}>
              {displayDate}
            </TextElement>
            <TouchableOpacity onPress={handleAllNotificationStatus}>
              <TextElement fontFamily="poppinsMedium">
                Mark all as read
              </TextElement>
            </TouchableOpacity>
          </View>
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification._id}
              style={
                notification.isRead
                  ? styles.notificationViewRead
                  : styles.notificationView
              }
              onPress={() => {
                handleNotificationNavigation(notification._id);
              }}
            >
              <View style={styles.notificationViewLeft}>
                <View
                  style={styles.iconWrapper}
                  style={
                    notification.isRead
                      ? styles.iconWrapperRead
                      : styles.iconWrapper
                  }
                >
                  <Icon
                    name={getNotificationIcon(notification.type)}
                    size={26}
                  />
                </View>
              </View>
              <View style={styles.notificationViewMiddle}>
                <TextElement fontSize={16}>{notification.title}</TextElement>
                <TextElement fontFamily="poppinsRegular" color={COLORS.GRAY}>
                  {notification.description}
                </TextElement>
              </View>
              <View style={styles.notificationViewRight}>
                <TextElement fontFamily="poppinsMedium" color={COLORS.GRAY}>
                  {formatTimeAgo(notification.createdAt)}
                </TextElement>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    });
  };

  const renderContent = () => {
    if (notificationsLoading) {
      return (
        <View style={styles.centerView}>
          <ActivityIndicator color={COLORS.PRIMARY} size={24} />
        </View>
      );
    }

    if (notifications.length === 0) {
      return (
        <View style={styles.noNotificationsView}>
          <TextElement fontSize={18} fontFamily="poppinsSemiBold">
            You have no notifications yet
          </TextElement>
        </View>
      );
    }

    return renderNotifications();
  };

  return (
    <MainView style={styles.main}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: COLORS.SECONDARY,
          height:
            notificationsLoading || notifications.length === 0
              ? "100%"
              : "auto",
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              try {
                fetchNotifications();
                refreshUserData();
              } catch (error) {
              } finally {
                setRefreshing(false);
              }
            }}
          />
        }
      >
        {renderContent()}
      </ScrollView>
      <SnackBar
        setSnackbarVisible={setSnackbarVisible}
        snackbarVisible={snackbarVisible}
        snackbarMessage={snackbarMessage}
      />
    </MainView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  main: {},
  timeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  notificationView: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderColor: COLORS.GRAY_VERY_LIGHT,
  },
  notificationViewLeft: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationViewMiddle: {
    flex: 6,
  },
  notificationViewRight: {
    flex: 1,
  },
  iconWrapper: {
    backgroundColor: COLORS.GRAY_VERY_LIGHT,
    borderRadius: 9999,
    padding: 10,
  },
  iconWrapperRead: {
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 9999,
    padding: 10,
  },
  notificationViewRead: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderColor: COLORS.GRAY_LIGHTER,
    backgroundColor: COLORS.GRAY_VERY_LIGHT,
  },
  centerView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dateGroup: {
    marginBottom: 20,
  },
  noNotificationsView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
