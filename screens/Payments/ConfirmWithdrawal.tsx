import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApp } from "../../context/AppContext";
import { handleError } from "../../utils";
import WalletModal from "../../components/WalletModal";
import { COLORS } from "../../utils/color";
import { withdrawal } from "../../api/api";

const ConfirmWithdraw = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { user, transferRecipient } = useApp();
  const navigation: any = useNavigation();

  const handleWithdrawal = async () => {
    if (!amount) {
      setSnackbarMessage("Please provide the amount you want to withdraw");
      setSnackbarVisible(true);
      return;
    }
    if (amount > user?.wallet) {
      setSnackbarMessage("Your balance is insufficient! Earn some money and try again.");
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    try {
      await withdrawal(amount, transferRecipient, user?._id);
      setSnackbarVisible(true);
      setSnackbarMessage("Withdrawal request has been made successfully!");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Something went wrong! Please try again later.");
      setSnackbarVisible(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.main}>
      <View>
        <WalletModal
          balance={user?.wallet}
          onPress={handleWithdrawal}
          isDeposit
          actionButtonText="Withdraw"
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

export default ConfirmWithdraw;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
    padding: 10,
  },
});
