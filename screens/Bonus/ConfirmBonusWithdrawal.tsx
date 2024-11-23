import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import { useApp } from "../../context/AppContext";
import { handleError } from "../../utils";
import WalletModal from "../../components/features/WalletModal";
import { COLORS } from "../../utils/color";
import { bonusWithdrawal, withdrawal } from "../../api/api";

const ConfirmBonusWithdrawal = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { user } = useApp();
  const navigation: any = useNavigation();

  const handleWithdrawal = async () => {
    if (!amount) {
      setSnackbarMessage("Please provide the amount you want to withdraw");
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    try {
      const { data } = await bonusWithdrawal(amount, user?._id);
      setSnackbarMessage(data.message);
      setSnackbarVisible(true);
      navigation.navigate("Home");
    } catch (error) {
      setSnackbarMessage(handleError(error));
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
          balance={user?.bonusWallet}
          onPress={handleWithdrawal}
          isDeposit
          actionButtonText="Withdraw"
          isWallet
          placeholder="Enter Amount"
          icon="money"
          keyboardType="numeric"
          onChangeText={setAmount}
          loading={loading}
          isBonus
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

export default ConfirmBonusWithdrawal;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
    padding: 10,
  },
});
