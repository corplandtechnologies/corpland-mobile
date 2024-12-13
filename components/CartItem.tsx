import { StyleSheet, Text, Image, View } from "react-native";
import React, { useContext, useState } from "react";
import Card from "./ui/Card";
import QuantitySelector from "./ui/QuantitySelector";
import { COLORS } from "../utils/color";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils";

const CartItem = ({ product }) => {
  const { quantity, setQuantity } = useCart();
  return (
    <Card style={styles.wrapper}>
      <View style={{ flex: 1 }}>
        <Image source={{ uri: product?.image }} style={styles.productImage} />
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.title}>{product?.title}</Text>
        <Text style={styles.cat}>{product?.category}</Text>
        <View style={styles.priceQView}>
          <Text style={styles.price}>GH₵ {product?.price.toFixed(2)}</Text>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </View>
      </View>
    </Card>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    objectFit: "cover",
  },
  detailsView: {
    justifyContent: "space-between",
    flex: 2,
  },
  priceQView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontFamily: "poppinsBold",
    fontSize: 16,
  },
  cat: {
    color: COLORS.GRAY,
  },
  price: {
    fontFamily: "poppinsBold",
    color: COLORS.PRIMARY,
  },
});
