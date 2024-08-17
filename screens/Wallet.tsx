import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { COLORS } from "../utils/color";
import PrimaryButton from "../components/ui/PrimaryButton";
import Icon from "react-native-vector-icons/Ionicons";
import FormInput from "../components/ui/FormInput";
import WalletModal from "../components/WalletModal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../api/api";
import Card from "../components/ui/Card";
import { useApp } from "../context/AppContext";

const Wallet = () => {
  const navigation = useNavigation();
  const { user } = useApp();
  return (
    <View style={styles.main}>
      <View style={styles.walletView}>
        <WalletModal
          balance={user?.wallet}
          onPress={() => navigation.navigate("Deposit")}
          actionButtonText="Add Money"
          keyboardType="numeric"
          isWallet
        />
        <View>
          <Text>Today</Text>
          <Card style={styles.wrapper}>
            <View>
              <Text style={styles.title}>Money Added to Wallet</Text>
              <Text>24 September | 7:30 AM</Text>
            </View>
            <View style={styles.amountWrapper}>
              <Text style={styles.amount}>+ GH₵ 500.00</Text>
              <Text>Balance GH₵ 23,044.00</Text>
            </View>
          </Card>
        </View>
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
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    fontFamily: "InterBold",
  },
  amountWrapper: {
    alignItems: "flex-end",
  },
  amount: {
    color: COLORS.MONEY,
    fontFamily: "InterBold",
  },
});
