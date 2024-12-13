import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../utils/color";

interface HrProps {
  marginHorizontal?: number;
  marginVertical?: number;
  height?: number;
}
const Hr: React.FC<HrProps> = ({
  marginHorizontal,
  marginVertical,
  height,
}) => {
  return (
    <View
      style={{
        height: height ? height : 1,
        backgroundColor: COLORS.GRAY_LIGHTER,
        marginHorizontal: marginHorizontal ? marginHorizontal : 0,
        marginVertical: marginVertical ? marginVertical : 0,
        borderRadius: 9999,
      }}
    />
  );
};

export default Hr;

const styles = StyleSheet.create({});
