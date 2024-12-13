import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { IconElementProps } from "./interfaces/iconElement.interface";
import { useTheme } from "../../../context/ThemeContext";

const IconElement: React.FC<IconElementProps> = ({ name, size, color }) => {
  const { theme } = useTheme();
  return (
    <Ionicons name={name} size={size} color={color ? color : theme.PRIMARY} />
  );
};

export default IconElement;

const styles = StyleSheet.create({});
