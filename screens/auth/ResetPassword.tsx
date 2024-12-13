import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Input, Button, Icon, CheckBox } from "react-native-elements";
import { COLORS } from "../../utils/color";
import { Route, useNavigation } from "@react-navigation/native";
import { resetPassword } from "../../api/index.auth";
import { Snackbar } from "react-native-paper"; // Ensure this is imported
import PrimaryButton from "../../components/ui/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserHeader from "../../components/UserHeader";
import FormInput from "../../components/ui/FormInput";
import AuthOption from "../../components/auth/AuthOption";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform } from "react-native";
import { jwtDecode } from "jwt-decode";
import { handleError } from "../../utils";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

const ResetPassword = ({ route }: { route: any }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const navigation: any = useNavigation();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const userEmail = route.params.email;

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setSnackbarMessage("All Fields are required!");
      setSnackbarVisible(true);
      return;
    }
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match!");
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(userEmail, password);
      setSnackbarVisible(true);
      setSnackbarMessage("Password Reset Completed Successfully!");
      navigation.navigate("Login");
    } catch (error) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <UserHeader
        title="New Password"
        description="Your new password must be different from the previously used passwords."
      />
      <View style={{ gap: 20 }}>
        <View style={styles.inputContainer}>
          <Icon name="lock" type="font-awesome" color={COLORS.GRAY} />
          <TextInput
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            style={styles.input}
            placeholderTextColor={COLORS.TERTIARY}
            onChangeText={setPassword}
            cursorColor={COLORS.PRIMARY}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? "eye-slash" : "eye"}
              type="font-awesome"
              color={COLORS.GRAY}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" type="font-awesome" color={COLORS.GRAY} />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!isPasswordVisible}
            style={styles.input}
            placeholderTextColor={COLORS.TERTIARY}
            onChangeText={setConfirmPassword}
            cursorColor={COLORS.PRIMARY}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? "eye-slash" : "eye"}
              type="font-awesome"
              color={COLORS.GRAY}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <PrimaryButton
          value="Create New Password"
          onPress={handleResetPassword}
          disabled={!password || !confirmPassword}
          loading={loading}
        />
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Close",
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: COLORS.SECONDARY,
  },
  pageTitle: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "PoppinsBold",
  },
  descriptiveText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.GRAY,
  },
  termsButton: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
  signUpButton: {
    marginTop: 20,
    backgroundColor: COLORS.PRIMARY,
    padding: 20,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY,
    padding: 15,
    borderRadius: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHTER,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    // outline: "none",
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    marginTop: 10,
    marginBottom: 30,
  },
  termsText: {
    fontSize: 14,
    color: COLORS.GRAY,
    textDecorationLine: "underline",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20, // Adjust the vertical margin as needed
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.TERTIARY, // Adjust the color as needed
  },
  separatorText: {
    marginHorizontal: 10, // Adjust the horizontal margin as needed
    color: COLORS.GRAY, // Adjust the color as needed
  },
  socialSignInContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    width: 200,
    height: 64,
  },
});

export default ResetPassword;
