import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/color";
import WalletModal from "../components/WalletModal";
import { useNavigation } from "@react-navigation/native";

const Redeem = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={styles.walletView}>
        <WalletModal
          balance={"3,458"}
          onPress={() =>
            alert(
              "Depositing is coming soon but if you were invited by a friend, don't hesitate to use your coupon code to claim your bonus!"
            )
          }
          isDeposit
          actionButtonText="Redeem"
          placeholder="Enter your coupon code"
          icon="ticket"
        />
      </View>
    </View>
  );
};

export default Redeem;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
    padding: 10,
  },
});
