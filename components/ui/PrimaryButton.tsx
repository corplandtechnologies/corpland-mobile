import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Button } from "react-native-elements";
import { COLORS } from "../../utils/color";

interface primaryButtonProps {
  value: string | undefined;
  onPress?: any;
  disabled?: boolean;
  loading?: boolean;
  icon?: string | JSX.Element | any;
  isIcon?: boolean;
  secondary?: boolean;
  fontFamily?: string;
  style?: any;
  width?: number | string;
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
  width,
}) => {
  return (
    <Button
      title={value}
      buttonStyle={{
        backgroundColor: secondary ? COLORS.GRAY_LIGHT : COLORS.PRIMARY,
        padding: 20,
        width: width ? width : "auto",
      }}
      containerStyle={[
        {
          backgroundColor: secondary ? COLORS.GRAY_LIGHT : COLORS.PRIMARY,
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
              color: secondary ? COLORS.PRIMARY : COLORS.SECONDARY,
              fontFamily: fontFamily ? fontFamily : "PoppinsSemiBold",
            }
      }
    />
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({});
