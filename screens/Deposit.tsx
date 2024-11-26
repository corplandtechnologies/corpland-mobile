import { Linking, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { COLORS } from "../utils/color";
import WalletModal from "../components/features/WalletModal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import { deposit, getUserById } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApp } from "../context/AppContext";
import { handleError } from "../utils";

const Deposit = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { user } = useApp();
  const navigation: any = useNavigation();

  const handleDeposit = async () => {
    if (!amount) {
      setSnackbarMessage("All Fields are required!");
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    try {
      const res = await deposit(user?.email, amount, user?._id);
      console.log("res", res.data);
      
      setSnackbarVisible(true);
      setSnackbarMessage("Authorization URL sent successfully!");
      Linking.openURL(res.data?.authorizationUrl);
    } catch (error) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.main}>
      <View>
        <WalletModal
          balance={user?.wallet}
          onPress={handleDeposit}
          isDeposit
          actionButtonText="Deposit"
          isWallet
          placeholder="Enter Amount"
          icon="money"
          keyboardType="numeric"
          onChangeText={setAmount}
          loading={loading}
        />
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Close",
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        {snackbarMessage}
      </Snackbar>
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
