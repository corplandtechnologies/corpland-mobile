import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, View } from "react-native";

const HrElement = () => {
  const { theme } = useTheme();
  return <View style={[styles.orLine, { backgroundColor: theme.TERTIARY }]} />;
};

export default HrElement;

const styles = StyleSheet.create({
  orLine: { flex: 1, height: 1 },
});
