import { useTheme } from "@/context/ThemeContext";
import { CheckBox } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import useCheckBox from "./hooks/useCheckBox";

const CheckBoxElement = () => {
  const { checked, toggleCheckbox } = useCheckBox();
  const { theme } = useTheme();
  return (
    <CheckBox
      checked={checked}
      onPress={toggleCheckbox}
      iconType="material-community"
      checkedIcon="checkbox-marked"
      uncheckedIcon="checkbox-blank-outline"
      checkedColor={theme.PRIMARY}
      containerStyle={{ backgroundColor: theme.SECONDARY, padding: 0 }}
    />
  );
};

export default CheckBoxElement;

const styles = StyleSheet.create({});
