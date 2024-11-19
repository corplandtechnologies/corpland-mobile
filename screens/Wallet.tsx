import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../utils/color";
import PrimaryButton from "../components/ui/PrimaryButton";
import Icon from "react-native-vector-icons/Ionicons";
import FormInput from "../components/ui/FormInput";
import WalletModal from "../components/WalletModal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProductById, getUserById, getUserTransactions } from "../api/api";
import Card from "../components/ui/Card";
import { useApp } from "../context/AppContext";
import TextElement from "../components/elements/Texts/TextElement";
import SnackBar from "../components/ui/SnackBar";
import { handleError } from "../utils";
import moment from "moment";
import { GroupedTransactions, Transaction } from "../interfaces";
import MainView from "../components/elements/Views/MainView";
import { RefreshControl } from "react-native";
import Hr from "../components/elements/HR/Hr";

const Wallet: React.FC = () => {
  const navigation: any = useNavigation();
  const {
    snackbarVisible,
    setSnackbarVisible,
    setSnackbarMessage,
    snackbarMessage,
    user,
    refreshing,
    setRefreshing,
    setUser,
  } = useApp();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] =
    useState<boolean>(false);

  const fetchUser = async () => {
    try {
      const userInfo: any = await AsyncStorage.getItem("user");
      const parsedUserInfo = JSON.parse(userInfo);
      const res: any = await getUserById(parsedUserInfo?._id);
      setUser(res?.data?.user);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchTransactions = async (
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoadingState(true);
    try {
      const { data } = await getUserTransactions(user?._id);

      data.sort((a: Transaction, b: Transaction) =>
        moment(b.createdAt).diff(moment(a.createdAt))
      );
      setTransactions(data);

      setLoadingState(false);
    } catch (error: any) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
      setLoadingState(false);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetchTransactions(setTransactionsLoading);
  }, [user?._id]);

  const groupTransactionsByDate = (): GroupedTransactions[] => {
    const grouped = transactions.reduce(
      (groups: { [key: string]: Transaction[] }, transaction) => {
        const date = moment(transaction.createdAt).format("YYYY-MM-DD");
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
      },
      {}
    );

    return Object.keys(grouped).map((date) => ({
      date,
      transactions: grouped[date],
    }));
  };

  const renderTransactions = () => {
    const groupedTransactions = groupTransactionsByDate();

    return groupedTransactions.map((group, index) => {
      let displayDate: string;
      if (moment(group.date).isSame(moment(), "day")) {
        displayDate = "Today";
      } else if (
        moment(group.date).isSame(moment().subtract(1, "day"), "day")
      ) {
        displayDate = "Yesterday";
      } else {
        displayDate = moment(group.date).format("DD MMMM YYYY");
      }

      return (
        <View key={index} style={styles.reportView}>
          <TextElement color={COLORS.GRAY}>{displayDate}</TextElement>
          {group.transactions.map((transaction, idx) => (
            <Card key={idx} style={styles.wrapper}>
              <View style={styles.infoWrapper}>
                <TextElement>{transaction.description}</TextElement>
                <TextElement
                  color={COLORS.GRAY}
                  fontSize={12}
                  fontFamily="PoppinsMedium"
                >
                  {moment(transaction.createdAt).format("DD MMMM | hh:mm A")}
                </TextElement>
              </View>
              <View style={styles.amountWrapper}>
                <TextElement
                  color={
                    transaction.type === "credit"
                      ? COLORS.MONEY
                      : COLORS.CANCELLED
                  }
                >
                  {transaction.type === "credit" ? "+" : "-"} GH₵
                  {transaction.amount}
                </TextElement>
                <TextElement
                  color={COLORS.GRAY}
                  fontSize={12}
                  fontFamily="PoppinsMedium"
                >
                  Balance GH₵ {transaction.balanceAfter}
                </TextElement>
              </View>
            </Card>
          ))}
        </View>
      );
    });
  };

  return (
    <MainView>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: COLORS.SECONDARY,
          // height: "100%",
          padding: 10,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              try {
                fetchTransactions(setTransactionsLoading);
                fetchUser();
                setRefreshing(false);
              } catch (error) {
                setRefreshing(false);
              }
            }}
          />
        }
      >
        <View style={styles.walletView}>
          <WalletModal
            balance={user?.wallet}
            onPress={() => navigation.navigate("Deposit")}
            actionButtonText="Add Money"
            keyboardType="numeric"
            isWallet
          />
        </View>
        <Hr height={5} marginVertical={25} marginHorizontal={100} />
        <MainView style={styles.loadingView}>
          {transactionsLoading ? (
            <View style={styles.centerView}>
              <ActivityIndicator color={COLORS.PRIMARY} size={30} />
            </View>
          ) : (
            <>
              {transactions.length <= 0 ? (
                <View style={styles.centerView}>
                  <TextElement fontSize={20} textAlign="center">
                    No transactions yet
                  </TextElement>
                </View>
              ) : (
                <>{renderTransactions()}</>
              )}
            </>
          )}
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

export default Wallet;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
    padding: 10,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    height: 65,
    alignItems: "center",
  },
  title: {
    fontFamily: "PoppinsBold",
  },
  amountWrapper: {
    alignItems: "flex-end",
    flex: 1,
  },
  amount: {
    color: COLORS.MONEY,
    fontFamily: "PoppinsBold",
  },
  reportView: {
    gap: 10,
    marginVertical: 10,
  },
  infoWrapper: {
    flex: 1,
  },
  loadingView: {
    height: "100%",
    flex: 4,
  },
  walletView: {
    flex: 1,
  },
  centerView: {
    height: "100%",
    justifyContent: "center",
  },
});
