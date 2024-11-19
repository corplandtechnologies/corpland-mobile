import { StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { COLORS } from "../utils/color";
import PrimaryButton from "./ui/PrimaryButton";
import AnimatedView from "./animated/AnimatedView";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import {
  createBonusOrder,
  createCashOnDeliveryOrder,
  createOrder,
} from "../api/api";
import { useUser } from "../context/UserContext";
import { Snackbar } from "react-native-paper";
import { useApp } from "../context/AppContext";
import { handleError } from "../utils";
import SnackBar from "./ui/SnackBar";
import PopUpCard from "./PopUpCard";

const OrderSummary = () => {
  const { cartItem, quantity }: any = useCart();
  const subTotal = cartItem.price * quantity;
  const transactionFee = cartItem.price * 0.01;
  const total = subTotal + transactionFee;
  const codTotal = subTotal;
  const navigation: any = useNavigation();
  const { user: currentUser }: any = useApp();
  const {
    snackbarVisible,
    setSnackbarVisible,
    setSnackbarMessage,
    snackbarMessage,
  }: any = useApp();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [mainAccountPurchaseLoading, setMainAccountPurchaseLoading] =
    useState<boolean>(false);
  const [bonusWalletPurchaseLoading, setBonusWalletPurchaseLoading] =
    useState<boolean>(false);
  const [cashOnDeliveryLoading, setCashOnDeliveryLoading] =
    useState<boolean>(false);
  const handleOrder = async (
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    if (total > currentUser?.wallet) {
      setTimeout(() => {
        setSnackbarVisible(true);
        setSnackbarMessage("Sorry, Your balance is not enough.");
      }, 2000);
      navigation.navigate("Wallet");
      return;
    }
    setIsLoading(true);
    try {
      const res = await createOrder(
        cartItem.sellerId,
        currentUser?._id,
        cartItem?._id,
        quantity,
        total,
        "regular"
      );
      navigation.navigate("OrderSuccess");
      setIsLoading(false);
    } catch (error: any) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleBonusOrder = async (
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    if (total > currentUser?.bonusWallet) {
      setTimeout(() => {
        setSnackbarVisible(true);
        setSnackbarMessage("Sorry, Your balance is not enough.");
      }, 2000);
      navigation.navigate("Wallet");
      return;
    }
    setIsLoading(true);
    try {
      const res = await createBonusOrder(
        cartItem.sellerId,
        currentUser?._id,
        cartItem?._id,
        quantity,
        total,
        "regular"
      );
      navigation.navigate("OrderSuccess");
      setIsLoading(false);
    } catch (error: any) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };
  const handleCashOnDeliveryOrder = async (
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    setIsLoading(true);
    try {
      const res = await createCashOnDeliveryOrder(
        cartItem.sellerId,
        currentUser?._id,
        cartItem?._id,
        quantity,
        codTotal,
        "cod"
      );
      navigation.navigate("OrderSuccess");
      setIsLoading(false);
    } catch (error: any) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <AnimatedView>
      <View style={styles.main}>
        {/* <View style={styles.summaryView}>
        <Text>Sub-Total</Text>
        <Text>GH₵ 120.00</Text>
        </View>
        <View style={styles.summaryView}>
        <Text>Delivery Fee</Text>
        <Text>GH₵ 120.00</Text>
      </View> */}
        <View style={styles.summaryView}>
          <Text style={styles.descText}>Sub-Total</Text>
          <Text style={styles.priceText}>GH₵ {subTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryView}>
          <Text style={styles.descText}>Transaction Fee (1%)</Text>
          <Text style={styles.priceText}>GH₵ {transactionFee.toFixed(2)}</Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: COLORS.GRAY_LIGHT,
          }}
        />
        <View style={styles.summaryView}>
          <Text style={styles.descText}>Total</Text>
          <Text style={styles.priceText}>GH₵ {total.toFixed(2)}</Text>
        </View>

        <PrimaryButton
          value="Select Channel"
          onPress={() => setIsModalVisible(true)}
        />
      </View>
      <SnackBar
        setSnackbarVisible={setSnackbarVisible}
        snackbarVisible={snackbarVisible}
        snackbarMessage={snackbarMessage}
      />
      <PopUpCard
        visible={isModalVisible}
        title="Select Your Payment Method"
        // actionText="Main Account"
        onPress={() => handleOrder(setMainAccountPurchaseLoading)}
        onClose={() => setIsModalVisible(false)}
        // isDoubleAction={true}
        secondaryActionText="Bonus Wallet"
        secondaryAction={() => handleBonusOrder(setBonusWalletPurchaseLoading)}
        secondaryActionLoading={bonusWalletPurchaseLoading}
        isMultipleActions
        warning="You won't be charged for Cash on Delivery."
      >
        <PrimaryButton
          value="Cash On Delivery"
          onPress={() => handleCashOnDeliveryOrder(setCashOnDeliveryLoading)}
          tertiary
          loading={cashOnDeliveryLoading}
        />
      </PopUpCard>
    </AnimatedView>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
  },
  summaryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  descText: {
    color: COLORS.GRAY,
    fontFamily: "PoppinsMedium",
  },
  priceText: {
    color: COLORS.PRIMARY,
    fontFamily: "PoppinsSemiBold",
  },
});
