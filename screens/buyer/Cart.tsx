import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../utils/color";
import CartItem from "../../components/features/CartItem";
import OrderSummary from "../../components/features/OrderSummary";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cartItem } = useCart();

  return (
    <View style={styles.main}>
      <CartItem product={cartItem} />
      <OrderSummary />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
    justifyContent: "space-between",
  },
});
