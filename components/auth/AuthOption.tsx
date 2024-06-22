import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../utils/color";
import { useNavigation } from "@react-navigation/native";
import { authOptionProps } from "../../interfaces";

const AuthOption: React.FC<authOptionProps> = ({
  option,
  screen,
  isRegistered,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen)}>
      <Text style={styles.signInText}>
        {isRegistered ? "Already have an Account? " : "New here? "}
        <Text style={styles.optionText}>{option}</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default AuthOption;

const styles = StyleSheet.create({
  signInText: {
    textAlign: "center",
    color: COLORS.GRAY,
    fontSize: 16,
    marginTop: 10,
  },
  optionText: {
    color: COLORS.COMPLIMENTARY,
    fontSize: 16,
    fontFamily: "InterRegular",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.COMPLIMENTARY,
    textDecorationLine: "underline",
  },
});
