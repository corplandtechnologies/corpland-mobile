import { Dispatch, SetStateAction } from "react";
import { TextInputElementTypes } from "./textInputElement.types";

export interface TextInputElementProps extends TextInputElementTypes {
  onChangeText: Dispatch<SetStateAction<string>>;
  multiline?: boolean;
  defaultValue?: string;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  placeholder: string;
  style?: object;
  icon?: string | any;
  keyboardType?: string | any;
  isButtoned?: boolean;
  buttonIconName?: string | any;
  loading?: boolean;
  onPress?: () => void;
  value?: string;
  isSecondaryButton?: boolean;
}
