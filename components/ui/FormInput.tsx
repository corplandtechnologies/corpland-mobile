// components/FormInput.tsx
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { COLORS } from "../../utils/color";

interface FormInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  style?: object;
  icon?: string;
  multiline?: boolean;
  keyboardType?: string;
  disableFullscreenUI?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  onChangeText,
  style,
  icon,
  multiline,
  keyboardType,
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Icon
        name={icon}
        type="font-awesome"
        color={COLORS.GRAY}
      />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={COLORS.TERTIARY}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY,
    padding: 15,
    borderRadius: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.TERTIARY,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
});

export default FormInput;
