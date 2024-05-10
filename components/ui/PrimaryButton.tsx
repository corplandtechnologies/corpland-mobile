import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Button } from "react-native-elements";
import { COLORS } from "../../utils/color";

interface primaryButtonProps {
  value: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const PrimaryButton: FC<primaryButtonProps> = ({
  value,
  onPress,
  disabled,
  loading,
}) => {
  return (
    <Button
      title={value}
      buttonStyle={styles.primaryButton}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
    />
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  primaryButton: {
    marginTop: 20,
    backgroundColor: COLORS.PRIMARY,
    padding: 20,
    borderRadius: 10,
  },
});
