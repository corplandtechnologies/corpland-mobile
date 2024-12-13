import { StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { COLORS } from "../../utils/color";
import { BadgeProps } from "../../interfaces";

const Badge: FC<BadgeProps> = ({ bgColor, text, isOrder }) => {
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    if (text === "Order Placed") {
      setTextColor(COLORS.ORDERPLACED);
    } else if (text === "In Progress") {
      setTextColor(COLORS.INPROGRESS);
    } else if (text === "Delivered") {
      setTextColor(COLORS.DELIVERED);
    } else if (text === "Completed") {
      setTextColor(COLORS.COMPLETED);
    } else if (text === "Cancelled") {
      setTextColor(COLORS.CANCELLED);
    } else if (text === "Under Revision") {
      setTextColor(COLORS.REVISION);
    } else if (text === "Cancel Request") {
      setTextColor(COLORS.CANCELLED);
    }
  }, [text]);

  return (
    <View
      style={{
        backgroundColor: bgColor,
        paddingHorizontal: 5,
        paddingVertical: 2.5,
        width: 100,
        borderRadius: 9999,
      }}
    >
      <Text
        style={{
          fontFamily: "poppinsSemiBold",
          textAlign: "center",
          color: isOrder ? textColor : COLORS.PRIMARY,
          fontSize: 11,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({});
