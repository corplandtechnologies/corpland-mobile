// components/FormInput.tsx
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, Icon as FormIcons } from "react-native-elements";
import { COLORS } from "../../utils/color";
import Icon from "react-native-vector-icons/Ionicons";

interface FormInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  style?: object;
  icon?: string;
  multiline?: boolean;
  keyboardType?: string;
  isButtoned?: boolean;
  isButtonedIcon?: string;
  loading?: boolean;
  onPress: () => void;
  defaultValue?: string;
  value?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  onChangeText,
  style,
  icon,
  multiline,
  keyboardType,
  isButtoned,
  isButtonedIcon,
  loading,
  onPress,
  defaultValue,
}) => {
  return (
    <View style={styles.main}>
      <View style={[styles.inputContainer, style]}>
        <FormIcons
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
          cursorColor={COLORS.PRIMARY}
          defaultValue={defaultValue}
        />
        {/* Wrap the Button in a View to align it beside the TextInput */}
      </View>
      {isButtoned && (
        <View style={styles.buttonContainer}>
          <Button
            icon={
              <Icon
                name={isButtonedIcon}
                size={20}
                color="white"
              />
            }
            onPress={onPress}
            buttonStyle={styles.searchButton}
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
    backgroundColor: COLORS.SECONDARY,
    padding: 15,
    borderRadius: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.TERTIARY,
    flex: 4,
  },
  input: {
    width: "90%",
  },
  buttonContainer: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    padding: 18,
  },
});

export default FormInput;