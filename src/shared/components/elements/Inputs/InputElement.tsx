import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { FC, useState } from "react";
import { Input } from "react-native-elements";
import { InputElementProps } from "@core/interfaces/inputElement.interface";
import { useTheme } from "@app/providers/ThemeProvider";
import TextElement from "../Texts/TextElement";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

const InputElement: FC<InputElementProps> = ({
  placeholder,
  label,
  secureTextEntry,
  keyboardType,
  rightIcon,
}) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TextElement>{label}</TextElement>
      <Input
        placeholder={placeholder}
        style={[
          styles.input,
          {
            backgroundColor: theme.SECONDARY,
          },
        ]}
    outlineColor={theme.TERTIARY_LIGHTER}
        activeOutlineColor={theme.PRIMARY}
        outlineStyle={{ borderRadius: 10 }}
        placeholderTextColor={theme.TERTIARY}
        passwordRules="Password must be at least 8 characters long"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        //  right={
        //   showPassword ? (
        //     <Input.Icon
        //       icon="eye-off"
        //       onPress={() => setShowPassword(false)}
        //     />
        //   ) : (
        //     <TextInput.Icon
        //       icon={rightIcon as IconSource}
        //       onPress={() => setShowPassword(true)}
        //     />
        //   )
        // }
      />
    </View>
  );
};

export default InputElement;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  input: {
    width: "100%",
  },
});
