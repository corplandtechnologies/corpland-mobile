import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { ViewProps } from "../../../interfaces";

const ColumnView: FC<ViewProps> = ({ children, style }) => {
  return <View style={[styles.main, style]}>{children}</View>;
};

export default ColumnView;

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
  },
});
