import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { COLORS } from "../utils/color";
import WalletModal from "../components/WalletModal";
import { useNavigation } from "@react-navigation/native";
import { useApp } from "../context/AppContext";
import MainView from "../components/elements/Views/MainView";
import { RefreshControl } from "react-native";
import Hr from "../components/elements/HR/Hr";
import TextElement from "../components/elements/Texts/TextElement";
import SnackBar from "../components/ui/SnackBar";
import Card from "../components/ui/Card";
import Icon from "react-native-vector-icons/Ionicons";
import { handleError } from "../utils";

const MyCoupons = () => {
  const navigation: any = useNavigation();
  const {
    user,
    snackbarMessage,
    snackbarVisible,
    setSnackbarVisible,
    setSnackbarMessage,
  } = useApp();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = async (item: string) => {
    setIsCopied(true);
    try {
      await Clipboard.setStringAsync(item);
      setSnackbarMessage("Referral code copied to clipboard");
      setSnackbarVisible(true);
    } catch (error) {
      console.log(error);
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
    } finally {
      setIsCopied(false);
    }
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
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={() => {
        //       setRefreshing(true);
        //       try {
        //         fetchTransactions(setTransactionsLoading);
        //         fetchUser();
        //         setRefreshing(false);
        //       } catch (error) {
        //         setRefreshing(false);
        //       }
        //     }}
        //   />
        // }
      >
        {/* <View style={styles.walletView}>
          <WalletModal
            balance={user?.wallet}
            onPress={() => navigation.navigate("Redeem")}
            actionButtonText="Redeem"
            keyboardType="numeric"
            isWallet
            isBonus
          />
        </View>
        <Hr height={5} marginVertical={25} marginHorizontal={100} /> */}
        <MainView style={styles.loadingView}>
          {/* {transactionsLoading ? (
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
          )} */}
          <View style={styles.couponView}>
            <TextElement fontSize={18}>Your referral code</TextElement>
            <Card style={{ padding: 0 }}>
              <View style={styles.couponViewTop}>
                <TextElement fontFamily="PoppinsBold" fontSize={18}>
                  {user.referralCode}
                </TextElement>
                <TextElement
                  fontSize={11}
                  fontFamily="PoppinsMedium"
                  color={COLORS.GRAY}
                >
                  Allow your friends or references to use your code to register
                  and earn commission off every purchase they make for 6 months
                  straight.
                </TextElement>
                <View style={styles.couponViewTopOfferView}>
                  <Icon
                    name="checkmark-circle"
                    size={24}
                    color={COLORS.MONEY}
                  />
                  <TextElement fontFamily="PoppinsBold">
                    Earn 20% commission
                  </TextElement>
                </View>
              </View>
              <TouchableOpacity
                style={styles.couponViewBottom}
                onPress={() => copyToClipboard(user?.referralCode)}
              >
                <TextElement fontFamily="PoppinsMedium">
                  {isCopied ? "COPIED" : "COPY CODE"}
                </TextElement>
              </TouchableOpacity>
            </Card>
            {/* <View style={styles.couponViewOffers}>
              <TextElement fontSize={18}>Best offers for you</TextElement>
              <Card style={{ padding: 0 }}>
                <View style={styles.couponViewTop}>
                  <TextElement fontFamily="PoppinsBold" fontSize={18}>
                    WELCOME200
                  </TextElement>
                  <TextElement
                    fontSize={11}
                    fontFamily="PoppinsMedium"
                    color={COLORS.GRAY}
                  >
                    Allow your friends or references to use your code to
                    register and earn commission off every purchase they make
                    for 6 months straight.
                  </TextElement>
                  <View style={styles.couponViewTopOfferView}>
                    <Icon
                      name="checkmark-circle"
                      size={24}
                      color={COLORS.MONEY}
                    />
                    <TextElement fontFamily="PoppinsBold">
                      Earn 20% commission
                    </TextElement>
                  </View>
                </View>
                <TouchableOpacity style={styles.couponViewBottom}>
                  <TextElement fontFamily="PoppinsMedium">
                    COPY CODE
                  </TextElement>
                </TouchableOpacity>
              </Card>
              <Card style={{ padding: 0 }}>
                <View style={styles.couponViewTop}>
                  <TextElement fontFamily="PoppinsBold" fontSize={18}>
                    CASHBACK12
                  </TextElement>
                  <TextElement
                    fontSize={11}
                    fontFamily="PoppinsMedium"
                    color={COLORS.GRAY}
                  >
                    Add Items worth GHC20.00 or more to unlock
                  </TextElement>
                  <View style={styles.couponViewTopOfferView}>
                    <Icon
                      name="checkmark-circle"
                      size={24}
                      color={COLORS.MONEY}
                    />
                    <TextElement fontFamily="PoppinsBold">
                      Up to 10% cashback
                    </TextElement>
                  </View>
                </View>
                <TouchableOpacity style={styles.couponViewBottom}>
                  <TextElement fontFamily="PoppinsMedium">
                    COPY CODE
                  </TextElement>
                </TouchableOpacity>
              </Card>
            </View> */}
          </View>
        </MainView>
        {/* <SnackBar
          setSnackbarVisible={setSnackbarVisible}
          snackbarVisible={snackbarVisible}
          snackbarMessage={snackbarMessage}
        /> */}
      </ScrollView>
      <SnackBar
        setSnackbarVisible={setSnackbarVisible}
        snackbarVisible={snackbarVisible}
        snackbarMessage={snackbarMessage}
      />
    </MainView>
  );
};

export default MyCoupons;

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
  couponViewTop: {
    flex: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  couponViewBottom: {
    flex: 1,
    backgroundColor: COLORS.GRAY_VERY_LIGHT,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  couponViewTopOfferView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  couponView: {
    gap: 10,
  },
  couponViewOffers: {
    gap: 20,
    marginTop: 20,
  },
});
