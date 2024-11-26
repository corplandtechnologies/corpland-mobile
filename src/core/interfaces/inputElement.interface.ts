import { KeyboardTypeOptions } from "react-native";

export interface InputElementProps {
  placeholder: string;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  rightIcon?: React.ReactNode;
}

