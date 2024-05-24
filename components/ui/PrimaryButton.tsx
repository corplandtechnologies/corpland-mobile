import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Button } from "react-native-elements";
import { COLORS } from "../../utils/color";

interface primaryButtonProps {
  value: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string | JSX.Element;
  isIcon?: boolean;
}

const PrimaryButton: FC<primaryButtonProps> = ({
  value,
  onPress,
  disabled,
  loading,
  icon,
  isIcon,
}) => {
  return (
    <Button
      title={value}
      buttonStyle={styles.primaryButton}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      icon={icon}
      titleStyle={isIcon ? { marginLeft: 10 } : {}}
    />
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: 20,
    borderRadius: 10,
  },
});
