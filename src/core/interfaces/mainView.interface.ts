import { ViewStyle, StyleProp } from "react-native";

import React from "react";

export interface MainViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
