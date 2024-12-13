import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/color";

const WalletBox = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.balance}>GHC: 235.00</Text>
    </View>
  );
};

export default WalletBox;

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: 5,
    padding: 5,
    backgroundColor: COLORS.PRIMARY,
  },
  balance: {
    color: COLORS.SECONDARY,
    fontFamily: "poppinsBold",
    fontSize: 14,
  },
});
