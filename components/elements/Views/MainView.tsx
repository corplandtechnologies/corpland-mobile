import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { ViewProps } from "../../../interfaces";
import { useTheme } from "../../../context/ThemeContext";

const MainView: FC<ViewProps> = ({ children, style, padding }) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: theme.BACKGROUND,
          height: "100%",
          padding: padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default MainView;

const styles = StyleSheet.create({});
