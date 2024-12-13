import { Button } from "@rneui/themed";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { ButtonElementProps } from "./interfaces/buttonElement.interface";
import { useTheme } from "../../../context/ThemeContext";

const ButtonElement: FC<ButtonElementProps> = ({
  onPress,
  disabled,
  loading,
  icon,
  isIcon,
  secondary,
  tertiary,
  fontFamily,
  style,
  width,
  title,
}) => {
  const { theme } = useTheme();
  return (
    <Button
      title={title}
      buttonStyle={{
        backgroundColor: tertiary
          ? theme.MONEY
          : secondary
          ? theme.TERTIARY_LIGHT
          : theme.PRIMARY,
        padding: 20,
        width: width ? width : "auto",
      }}
      containerStyle={[
        {
          backgroundColor: tertiary
            ? theme.TERTIARY_VERY_LIGHT
            : secondary
            ? theme.TERTIARY_LIGHT
            : theme.PRIMARY,
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
              color: tertiary
                ? theme.SECONDARY
                : secondary
                ? theme.PRIMARY
                : theme.SECONDARY,
              fontFamily: fontFamily ? fontFamily : "poppinsSemiBold",
            }
      }
    />
  );
};

export default ButtonElement;

const styles = StyleSheet.create({});
