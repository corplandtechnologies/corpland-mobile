import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/color";
import PrimaryButton from "../components/ui/PrimaryButton";
import Icon from "react-native-vector-icons/Ionicons";
import FormInput from "../components/ui/FormInput";
import { walletModalProps } from "../interfaces";

const WalletModal: React.FC<walletModalProps> = ({
  isDeposit,
  balance,
  onPress,
  actionButtonText,
  isWallet,
  placeholder,
  icon,
  keyboardType,
  onChangeText,
  loading,
}) => {
  return (
    <View style={styles.walletWrapper}>
      {isWallet && (
        <View style={styles.fundView}>
          <View>
            <Text style={styles.walletTitle}>Wallet Balance</Text>
            <Text style={styles.walletFunds}>GH₵ {balance}.00</Text>
          </View>
          <View style={styles.walletIcon}>
            <Icon name="wallet" color={COLORS.COMPLIMENTARY} size={36} />
          </View>
        </View>
      )}
      {isDeposit && (
        <View>
          <View>
            <FormInput
              icon={icon}
              placeholder={placeholder}
              keyboardType={keyboardType}
              onChangeText={onChangeText}
            />
          </View>
        </View>
      )}
      <View>
        <PrimaryButton
          value={actionButtonText}
          onPress={onPress}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default WalletModal;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
    padding: 10,
  },
  walletWrapper: {
    backgroundColor: COLORS.WRAPPER,
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  walletTitle: {
    color: COLORS.GRAY,
    fontFamily: "InterRegular",
  },
  walletFunds: {
    fontFamily: "InterBold",
  },
  fundView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  walletIcon: {
    padding: 5,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 10,
  },
});
