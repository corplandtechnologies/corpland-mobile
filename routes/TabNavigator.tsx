import React, { useCallback, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";
import CreateProduct from "../screens/seller/CreateProduct";
import Favorite from "../screens/Favorite";
import Orders from "../screens/Orders/Orders";
import Profile from "../screens/Profile";
import CustomTabBar from "./components/CustomTabBar";
import { COLORS } from "../utils/color";
import { View, Text, TouchableOpacity } from "react-native";
import BackButton from "../components/ui/BackButton";
import { useSellerMode } from "../context/SellerModeContext";
import { Icon as BadgeIcon, withBadge } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../api/api";
import { useApp } from "../context/AppContext";
import CreateRequest from "../screens/buyer/CreateRequest";
import AuthModal from "../components/auth/AuthModal";

const Tab = createBottomTabNavigator();
const BadgedIcon = withBadge(0)(Icon);

const TabNavigator: React.FC = () => {
  const { user, setUser } = useApp();
  const { isSellerMode } = useSellerMode();
  const [isRequest, setIsRequest] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onToggleSwitch = () => setIsRequest(!isRequest);

  const getUserInfo = async () => {
    try {
      const parsedUserInfo: any = JSON.parse(
        (await AsyncStorage.getItem("user")) || "{}"
      );
      const res = await getUserById(parsedUserInfo?._id);
      setUser(res?.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [])
  );
  const handleTabPress = (routeName: string, defaultHandler: () => void) => {
    if (!user) {
      setModalVisible(true);
    } else {
      defaultHandler();
    }
  };

  const CustomHeaderLeft = () => {
    const navigation: any = useNavigation();

    return (
      <View style={{ paddingLeft: 10 }}>
        <Text style={{ color: COLORS.TERTIARY }}>Location</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Icon name="location" size={20} color={COLORS.PRIMARY} />
          <TouchableOpacity
            onPress={() => {
              if (!user) {
                setModalVisible(true);
              } else {
                navigation.navigate("EditProfile");
              }
            }}
          >
            {user ? (
              <Text
                style={{ color: COLORS.PRIMARY, fontFamily: "PoppinsSemiBold" }}
              >
                {user?.region}, {user?.country}
              </Text>
            ) : (
              <Text
                style={{ color: COLORS.PRIMARY, fontFamily: "PoppinsSemiBold" }}
              >
                Select Location
              </Text>
            )}
          </TouchableOpacity>
          <Icon name="chevron-down" size={18} color={COLORS.PRIMARY} />
        </View>
      </View>
    );
  };

  const CustomHeaderRight = () => (
    <View
      style={{
        paddingRight: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <BadgedIcon name="notifications" type="ionicon" size={25} />
    </View>
  );
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string = "";

            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Favorite":
                iconName = "heart";
                break;
              case "Add":
                iconName = "add-circle";
                break;
              case "Orders":
                iconName = "bag";
                break;
              case "Profile":
                iconName = "person";
                break;
            }

            return <Icon name={iconName} color={color} size={size} />;
          },
        })}
        tabBar={(props) => <CustomTabBar {...props} />}
        screenListeners={({ route, navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress(route.name, () => navigation.navigate(route.name));
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: "home",
            headerTitle: "",
            headerLeft: () => <CustomHeaderLeft />,
            // headerRight: () => <CustomHeaderRight />,
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{
            tabBarIcon: "heart",
            headerTitle: "Favorites",
            headerTitleStyle: {
              fontFamily: "PoppinsSemiBold",
            },
            headerLeft: () => <BackButton />,
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Add"
          component={isSellerMode ? CreateProduct : CreateRequest}
          options={{
            tabBarIcon: "add-circle",
            headerTitle: isSellerMode ? "Post Product" : "Post Request",
            headerTitleStyle: {
              fontFamily: "PoppinsSemiBold",
            },
            headerLeft: () => <BackButton />,
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarIcon: "bag",
            headerTitle: "My Orders",
            headerTitleStyle: {
              fontFamily: "PoppinsSemiBold",
            },
            headerLeft: () => <BackButton />,
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: "person",
            headerTitle: "Profile",
            headerTitleStyle: {
              fontFamily: "PoppinsSemiBold",
            },
            headerLeft: () => <BackButton />,
            headerTitleAlign: "center",
          }}
        />
      </Tab.Navigator>
      <AuthModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default TabNavigator;
