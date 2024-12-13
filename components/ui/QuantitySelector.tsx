import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}
const QuantitySelector: FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
}) => {
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decreaseQuantity}>
        <Text style={styles.button}>-</Text>
      </TouchableOpacity>
      <View style={styles.quantity}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>
      <TouchableOpacity onPress={increaseQuantity}>
        <Text style={styles.button}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 50,
    textAlign: "center",
    justifyContent: "center",
  },
  button: {
    fontSize: 20,
    marginHorizontal: 10,
    color: COLORS.SECONDARY,
    fontFamily: "poppinsBold",
    padding: 2,
  },
  quantity: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 5,
    width: 40,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontFamily: "poppinsBold",
    fontSize: 16,
    color: COLORS.SECONDARY,
  },
});

export default QuantitySelector;
