import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { COLORS } from "../../../utils/color";
import { ViewProps } from "../../../interfaces";

const MainView: FC<ViewProps> = ({ children, style, padding }) => {
  return (
    <View
      style={[
        {
          backgroundColor: COLORS.SECONDARY,
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
