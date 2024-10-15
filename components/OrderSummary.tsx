import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/color";
import PrimaryButton from "./ui/PrimaryButton";
import AnimatedView from "./animated/AnimatedView";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import { createOrder } from "../api/api";
import { useUser } from "../context/UserContext";
import { Snackbar } from "react-native-paper";
import { useApp } from "../context/AppContext";
import { handleError } from "../utils";
import SnackBar from "./ui/SnackBar";

const OrderSummary = () => {
  const { cartItem, quantity }: any = useCart();
  const total = cartItem.price * quantity;
  const subTotal = cartItem.price * cartItem.quantity;
  const navigation: any = useNavigation();
  const { user: currentUser }: any = useApp();
  const {
    snackbarVisible,
    setSnackbarVisible,
    setSnackbarMessage,
    snackbarMessage,
    loading,
    setLoading,
  }: any = useApp();

  const handleOrder = async () => {
    if (total > currentUser?.wallet) {
      setTimeout(() => {
        setSnackbarVisible(true);
        setSnackbarMessage("Sorry, Your balance is not enough.");
      }, 2000);
      navigation.navigate("Wallet");
      return;
    }
    setLoading(true);
    try {
      const res = await createOrder(
        cartItem.sellerId,
        currentUser?._id,
        cartItem?._id,
        quantity,
        total
      );
      navigation.navigate("OrderSuccess");
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
      setLoading(false);
    } finally {
      setLoading(false);
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
          value="Confirm Payment"
          onPress={handleOrder}
          loading={loading}
        />
      </View>
      <SnackBar
        setSnackbarVisible={setSnackbarVisible}
        snackbarVisible={snackbarVisible}
        snackbarMessage={snackbarMessage}
      />
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
