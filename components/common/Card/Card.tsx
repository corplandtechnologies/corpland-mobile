import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../../utils/color";

interface CardProps {
  children: React.ReactNode;
  style?: any;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 10,
    padding: 10,
    // shadowColor: COLORS.GRAY,
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
  },
});

export default Card;
