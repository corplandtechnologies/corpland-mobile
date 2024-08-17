import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Button } from "react-native-elements";
import { COLORS } from "../../utils/color";

interface primaryButtonProps {
  value: string;
  onPress?: any;
  disabled?: boolean;
  loading?: boolean;
  icon?: string | JSX.Element | any;
  isIcon?: boolean;
  secondary?: boolean;
  fontFamily?: string;
  style?: any;
}

const PrimaryButton: FC<primaryButtonProps> = ({
  value,
  onPress,
  disabled,
  loading,
  icon,
  isIcon,
  secondary,
  fontFamily,
  style,
}) => {
  return (
    <Button
      title={value}
      buttonStyle={{
        backgroundColor: secondary ? COLORS.BLUE_LIGHT : COLORS.COMPLIMENTARY,
        padding: 20,
      }}
      containerStyle={[
        {
          backgroundColor: secondary ? COLORS.BLUE_LIGHT : COLORS.COMPLIMENTARY,
          borderRadius: 10,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      icon={icon}
      titleStyle={
        isIcon
          ? { marginLeft: 10 }
          : {
              color: secondary ? COLORS.COMPLIMENTARY : COLORS.SECONDARY,
              fontFamily: fontFamily ? fontFamily : "InterMedium",
            }
      }
    />
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({});
