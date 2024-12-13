// components/TextInputElements.tsx
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../../context/ThemeContext";
import { TextInputElementProps } from "./textInputElement.interface";
import IconElement from "../Icon/IconElement";
import ButtonElement from "../Button/ButtonElement";

const TextInputElements: React.FC<TextInputElementProps> = ({
  multiline,
  defaultValue,
  secureTextEntry,
  isPassword,
  placeholder,
  style,
  icon,
  keyboardType,
  isButtoned,
  buttonIconName,
  loading,
  onPress,
  value,
  onChangeText,
  isSecondaryButton,
}) => {
  const { theme } = useTheme();
  const handleChangeText = (text: string) => {
    const trimmedText = text.trim();
    if (onChangeText) {
      onChangeText(trimmedText);
    }
  };
  return (
    <View style={styles.main}>
      <View
        style={[
          styles.inputContainer,
          style,
          {
            backgroundColor: theme.SECONDARY,
            borderColor: theme.TERTIARY_LIGHTER,
          },
        ]}
      >
        <IconElement name={icon} color={theme.TERTIARY} />
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor={theme.TERTIARY}
          onChangeText={handleChangeText}
          multiline={multiline}
          keyboardType={keyboardType}
          cursorColor={theme.PRIMARY}
          defaultValue={defaultValue}
        />
        {/* Wrap the Button in a View to align it beside the TextInput */}
      </View>
      {isButtoned && (
        <View style={styles.buttonContainer}>
          <ButtonElement
            icon={
              <IconElement
                name={buttonIconName}
                size={20}
                color={isSecondaryButton ? theme.PRIMARY : theme.SECONDARY}
              />
            }
            onPress={onPress}
            loading={loading}
            disabled={loading}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    padding: 15,
    borderRadius: 10,
    gap: 10,
    borderWidth: 1,

    flex: 4,
  },
  input: {
    width: "90%",
    fontFamily: "poppinsRegular",
  },
  buttonContainer: {
    flex: 1,
  },
  searchButton: {
    borderRadius: 10,
    padding: 18,
  },
});

export default TextInputElements;
