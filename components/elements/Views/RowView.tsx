import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { ViewProps } from "../../../interfaces";

const RowView: FC<ViewProps> = ({ children, style }) => {
  return <View style={[styles.main, style]}>{children}</View>;
};

export default RowView;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    width: "100%",
  },
});
