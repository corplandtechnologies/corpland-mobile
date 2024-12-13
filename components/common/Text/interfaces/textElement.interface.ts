import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { textElementPropsTypes } from "../types/textElement.types";

export interface textElementProps extends textElementPropsTypes {
  children: React.ReactNode;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
  color?: string;
}
