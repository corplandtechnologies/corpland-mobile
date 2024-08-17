import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { COLORS } from "../utils/color";
import WalletModal from "../components/WalletModal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import { deposit, getUserById } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApp } from "../context/AppContext";

const Deposit = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { user } = useApp();
  const navigation = useNavigation();

  const handleDeposit = async () => {
    if (!amount) {
      setSnackbarMessage("All Fields are required!");
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    try {
      await deposit(user?.email, amount, user?._id);
      setSnackbarVisible(true);
      setSnackbarMessage("Authorization URL sent successfully!");
      navigation.navigate("CompleteDeposit");
    } catch (error) {
      console.log(error);
      let errorMessage = "An unexpected error occurred.";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.message || error.response.statusText;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response received from the server.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }
      setSnackbarMessage(errorMessage);
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
