import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../utils/color";

interface HrProps {
  marginHorizontal?: number;
}
const Hr: React.FC<HrProps> = ({ marginHorizontal }) => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: COLORS.GRAY_LIGHT,
        marginHorizontal: marginHorizontal ? marginHorizontal : 0,
      }}
    />
  );
};

export default Hr;

const styles = StyleSheet.create({});
