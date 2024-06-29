import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/color";
import PrimaryButton from "../components/ui/PrimaryButton";
import Icon from "react-native-vector-icons/Ionicons";
import FormInput from "../components/ui/FormInput";
import WalletModal from "../components/WalletModal";
import { useNavigation } from "@react-navigation/native";

const Wallet = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={styles.walletView}>
        <WalletModal
          balance={"3,458"}
          onPress={() => navigation.navigate("Deposit")}
          actionButtonText="Add Money"
          isWallet
        />
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
    padding: 10,
  },
});
