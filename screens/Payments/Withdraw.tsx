import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { COLORS } from "../../utils/color";
import WalletModal from "../../components/WalletModal";
import { useNavigation } from "@react-navigation/native";
import Card from "../../components/ui/Card";
import { useApp } from "../../context/AppContext";
import TextElement from "../../components/elements/Texts/TextElement";
import SnackBar from "../../components/ui/SnackBar";
import moment from "moment";
import MainView from "../../components/elements/Views/MainView";
import { RefreshControl } from "react-native";
import Hr from "../../components/elements/HR/Hr";
import Icon from "react-native-vector-icons/Ionicons";
import { getWithdrawals } from "../../api";
import { handleError } from "../../utils";
import { authService } from "../../services/auth.service";

const Withdraw: React.FC = () => {
  const navigation: any = useNavigation();
  const {
    snackbarVisible,
    setSnackbarVisible,
    setSnackbarMessage,
    snackbarMessage,
    user,
    refreshing,
    setRefreshing,
  } = useApp();

  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWithdrawals = async () => {
    try {
      setIsLoading(true);
      const response = await getWithdrawals(user?._id || "");
      setWithdrawRequests(
        response.data.data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (error) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, [withdrawRequests?.length]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    authService.getCurrentUser();
    fetchWithdrawals();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Icon name="time" size={24} color={COLORS.WARNING} />;
      case "accepted":
        return <Icon name="checkmark-circle" size={24} color={COLORS.MONEY} />;
      case "rejected":
        return <Icon name="close-circle" size={24} color={COLORS.CANCELLED} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return COLORS.WARNING;
      case "accepted":
        return COLORS.MONEY;
      case "rejected":
        return COLORS.CANCELLED;
      default:
        return COLORS.GRAY;
    }
  };

  const renderWithdrawRequests = () => {
    if (isLoading) {
      return (
        <View style={styles.centerView}>
          <ActivityIndicator color={COLORS.PRIMARY} />
        </View>
      );
    }

    if (withdrawRequests.length === 0) {
      return (
        <View style={styles.centerView}>
          <TextElement color={COLORS.GRAY}>
            No withdrawal history found
          </TextElement>
        </View>
      );
    }

    return withdrawRequests.map((request) => (
      <Card key={request._id} style={styles.wrapper}>
        <View style={styles.infoWrapper}>
          <View style={styles.statusRow}>
            {getStatusIcon(request.status)}
            <TextElement
              style={styles.statusText}
              color={getStatusColor(request.status)}
            >
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </TextElement>
          </View>
          <TextElement
            color={COLORS.GRAY}
            fontSize={12}
            fontFamily="PoppinsMedium"
          >
            {moment(request.createdAt).format("DD MMMM | hh:mm A")}
          </TextElement>
          <TextElement
            color={COLORS.GRAY}
            fontSize={12}
            fontFamily="PoppinsMedium"
          >
            Account: {request.accountNumber}
          </TextElement>
        </View>
        <View style={styles.amountWrapper}>
          <TextElement color={COLORS.PRIMARY}>GH₵ {request.amount}</TextElement>
        </View>
      </Card>
    ));
  };

  return (
    <MainView>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: COLORS.SECONDARY,
          padding: 10,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.walletView}>
          <WalletModal
            balance={user?.wallet}
            onPress={() => navigation.navigate("WithdrawalChannel")}
            actionButtonText="Withdraw"
            keyboardType="numeric"
            isWallet
          />
        </View>
        <Hr height={5} marginVertical={25} marginHorizontal={100} />
        <TextElement style={styles.title}>Withdraw History</TextElement>
        <MainView style={styles.loadingView}>
          {renderWithdrawRequests()}
        </MainView>
        <SnackBar
          setSnackbarVisible={setSnackbarVisible}
          snackbarVisible={snackbarVisible}
          snackbarMessage={snackbarMessage}
        />
      </ScrollView>
    </MainView>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
    padding: 10,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    marginBottom: 10,
  },
  amountWrapper: {
    alignItems: "flex-end",
    flex: 1,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  statusText: {
    marginLeft: 8,
    fontFamily: "PoppinsMedium",
  },
  infoWrapper: {
    flex: 2,
  },
  loadingView: {
    flex: 1,
  },
  walletView: {
    flex: 1,
  },
  centerView: {
    height: "100%",
    justifyContent: "center",
  },
});
