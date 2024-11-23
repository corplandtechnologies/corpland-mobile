import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../utils/color";
import PrimaryButton from "../common/Button/PrimaryButton";
import Icon from "react-native-vector-icons/Ionicons";
import FormInput from "../common/Input/FormInput";
import { walletModalProps } from "../../interfaces";

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
  isBonus,
  disabled,
  secondaryActionButtonText,
  onSecondaryPress,
  secondaryLoading,
  secondarydisabled,
}) => {
  return (
    <View style={styles.walletWrapper}>
      {isWallet && (
        <View style={styles.fundView}>
          <View>
            <Text style={styles.walletTitle}>
              {isBonus ? "Bonus Wallet Balance" : "Wallet Balance"}
            </Text>
            <Text style={styles.walletFunds}>GH₵ {balance.toFixed(2)}</Text>
          </View>
          <View style={styles.walletIcon}>
            <Icon name="wallet" color={COLORS.PRIMARY} size={36} />
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
      {isBonus && !isDeposit ? (
        <View style={styles.bonusWallet}>
          <View style={{ flex: 1 }}>
            <PrimaryButton
              value={actionButtonText}
              onPress={onPress}
              loading={loading}
              disabled={disabled}
            />
          </View>
          {/* <View style={{ flex: 1 }}>
            <PrimaryButton
              secondary
              value={secondaryActionButtonText}
              onPress={onSecondaryPress}
              loading={secondaryLoading}
              disabled={secondarydisabled}
            />
          </View> */}
        </View>
      ) : (
        <View>
          <PrimaryButton
            value={actionButtonText}
            onPress={onPress}
            loading={loading}
            disabled={disabled}
          />
        </View>
      )}
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
    fontFamily: "PoppinsRegular",
  },
  walletFunds: {
    fontFamily: "PoppinsBold",
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
  bonusWallet: {
    flexDirection: "row",
  },
});
