import { StyleProp, ViewStyle } from "react-native";

export interface ButtonElementProps {
  title?: string;
  onPress?: any;
  disabled?: boolean;
  loading?: boolean;
  icon?: string | JSX.Element | any;
  isIcon?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  fontFamily?: string;
  style?: StyleProp<ViewStyle>;
  width?: number;
}
