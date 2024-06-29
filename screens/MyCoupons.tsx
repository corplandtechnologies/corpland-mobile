import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/color";
import WalletModal from "../components/WalletModal";
import { useNavigation } from "@react-navigation/native";

const MyCoupons = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={styles.walletView}>
        <WalletModal
          balance={"3,458"}
          onPress={() => navigation.navigate("Redeem")}
          actionButtonText="Claim your bonus now!"
        />
      </View>
    </View>
  );
};

export default MyCoupons;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
    padding: 10,
  },
});
