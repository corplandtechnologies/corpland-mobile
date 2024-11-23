import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import { useApp } from "../../context/AppContext";
import { handleError } from "../../utils";
import WalletModal from "../../components/features/WalletModal";
import { COLORS } from "../../utils/color";
import { createWithdrawal } from "../../api";
import PopUpCard from "../../components/features/PopUpCard";
import { Withdrawal } from "../../interfaces";

const ConfirmWithdraw = () => {
  const route = useRoute();
  const { accountNumber, channel } = route.params as {
    accountNumber: string;
    channel: string;
  };
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { user } = useApp();
  const navigation: any = useNavigation();

  const handleWithdrawal = async () => {
    if (!amount) {
      setSnackbarMessage("Please provide the amount you want to withdraw");
      setSnackbarVisible(true);
      return;
    }
    setShowConfirmation(true);
  };

  const proceedWithWithdrawal = async () => {
    setLoading(true);
    try {
      const withdrawalData: Withdrawal = {
        userId: user?._id || "",
        amount: amount,
        accountNumber: accountNumber || "",
        channel: channel.toLowerCase(),
      };

      await createWithdrawal(withdrawalData);
      setSnackbarVisible(true);
      setSnackbarMessage("Withdrawal request has been made successfully!");
      setShowConfirmation(false);
      navigation.navigate("Withdraw");
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
          onPress={handleWithdrawal}
          isDeposit
          actionButtonText="Withdraw"
          isWallet
          placeholder="Enter Amount"
          icon="money"
          keyboardType="numeric"
          onChangeText={(value) => setAmount(Number(value))}
          loading={loading}
          disabled={loading}
        />
      </View>

      <PopUpCard
        visible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title={`Are you sure you want to withdraw GH₵ ${amount}?`}
        actionText="Confirm Withdrawal"
        onPress={proceedWithWithdrawal}
        loading={loading}
        warning={`Confirm amount of GH₵ ${amount} to ${accountNumber}`}
      />

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
