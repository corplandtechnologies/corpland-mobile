import { StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { COLORS } from "../utils/color";
import WalletModal from "../components/WalletModal";
import { useNavigation } from "@react-navigation/native";
import SnackBar from "../components/ui/SnackBar";
import { useApp } from "../context/AppContext";
import { handleError } from "../utils";

const Redeem = () => {
  const navigation = useNavigation();
  const [couponCode, setCouponCode] = useState<string>("");
  const [redeemLoading, setRedeemLoading] = useState<boolean>(false);
  const {
    snackbarMessage,
    snackbarVisible,
    setSnackbarMessage,
    setSnackbarVisible,
  } = useApp();
  const handleRedeem = async (
    setLoadingState: Dispatch<SetStateAction<boolean>>
  ) => {
    if (couponCode.length === 0) {
      setSnackbarMessage("Enter a coupon code to continue.");
      setSnackbarVisible(true);
      return;
    }
    setLoadingState(true);
    try {
      setSnackbarMessage("Invalid Coupon Code");
      setSnackbarVisible(true);
      setLoadingState(false);
    } catch (error) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
      setLoadingState(true);
    } finally {
      setLoadingState(false);
    }
  };
  return (
    <View style={styles.main}>
      <View>
        <WalletModal
          balance={"3,458"}
          onPress={() => handleRedeem(setRedeemLoading)}
          isDeposit
          actionButtonText="Redeem"
          placeholder="Enter your coupon code"
          icon="ticket"
          onChangeText={setCouponCode}
          disabled={!couponCode}
        />
      </View>
      <SnackBar
        snackbarMessage={snackbarMessage}
        snackbarVisible={snackbarVisible}
        setSnackbarVisible={setSnackbarVisible}
      />
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
