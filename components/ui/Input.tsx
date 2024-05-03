import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../utils/color";

interface inputProps {
  children: React.ReactNode;
  height?: number;
  justifyContent?: string;
}

const Input: React.FC<inputProps> = ({ children, height, justifyContent }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: COLORS.TERTIARY,
        height: height ? height : 40,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        // justifyContent: height ? justifyContent : "center",
      }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Input;
