import { ScrollViewComponent, StyleProp, ViewStyle } from "react-native";

export interface ViewElementProps {
  safeAreaView?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  height?: number;
  backgroundColor?: string;
  scrollView?: boolean;
  props?: ScrollViewComponent;
}
