import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/color";
import WalletModal from "../components/WalletModal";
import { useNavigation } from "@react-navigation/native";

const Deposit = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={styles.walletView}>
        <WalletModal
          balance={"3,458"}
          onPress={() => {}}
          isDeposit
          actionButtonText="Deposit"
          isWallet
          placeholder="Enter Amount"
          icon="money"
        />
      </View>
    </View>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
    padding: 10,
  },
});
