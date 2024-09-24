import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Input, Button, Icon, CheckBox } from "react-native-elements"; // Import CheckBox
import { COLORS } from "../../utils/color";
import { useNavigation } from "@react-navigation/native";
import UserHeader from "../../components/UserHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar } from "react-native-paper";
import { authWithSocial, login } from "../../api/auth.api";
import AuthOption from "../../components/auth/AuthOption";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform } from "react-native";
import { jwtDecode } from "jwt-decode";
import { handleError } from "../../utils";
import TextElement from "../../components/elements/Texts/TextElement";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false); // New state for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const [appleUserToken, setAppleUserToken] = useState<any>();
  const navigation: any = useNavigation();

  useEffect(() => {
    // Check if the user is already authenticated on component mount
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        // User is already authenticated, navigate to CompleteProfile
        navigation.navigate("CompleteProfile");
      }
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    };
    checkAvailable();
  }, []);

  const handleAppleSignUp = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Check if the credential has the identityToken
      if (credential && credential.identityToken) {
        const userInfo = jwtDecode(credential.identityToken); // Decode the token
        const name = `${userInfo.fullName?.givenName || ""} ${
          userInfo.fullName?.familyName || ""
        }`.trim();

        // Make sure the necessary fields are present before sending the request
        if (!name || !userInfo.email) {
          throw new Error("Missing name or email from Apple Sign-In.");
        }

        // Send the request to the backend for social authentication
        const res = await authWithSocial({
          name,
          email: userInfo.email,
        });

        // Store user information and token in AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(res.user));
        await AsyncStorage.setItem("token", res.token);

        // Provide feedback to the user
        setSnackbarVisible(true);
        setSnackbarMessage("Registration Completed Successfully!");

        // Navigate to the next page (e.g., TabNavigator)
        navigation.navigate("TabNavigator");
      } else {
        throw new Error("Apple Sign-In did not return an identity token.");
      }

      console.log(credential); // For debugging purposes
    } catch (e) {
      console.log(e);
      setSnackbarMessage(handleError(e)); // Handle the error and display the message
      setSnackbarVisible(true);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setSnackbarMessage("All Fields are required!");
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    try {
      const res = await login({
        email: email.toLowerCase().trim(),
        password: password.trim(),
      });

      // Assuming user object contains userInfo and token
      await AsyncStorage.setItem("user", JSON.stringify(res.user));
      await AsyncStorage.setItem("token", res.token);
      setSnackbarVisible(true);
      setSnackbarMessage("Logged In Successfully!");
      navigation.navigate("TabNavigator", { screen: "Home" });
    } catch (error) {
      console.log(error);
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <UserHeader
        title="Sign In"
        description="Fill your information below or register with your social account"
      />
      <View style={styles.inputContainer}>
        <Icon name="envelope" type="font-awesome" color={COLORS.GRAY} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor={COLORS.TERTIARY}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" type="font-awesome" color={COLORS.GRAY} />
        <TextInput
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          style={styles.input}
          placeholderTextColor={COLORS.TERTIARY}
          onChangeText={setPassword}
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

      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <TextElement textAlign="right" fontFamily="PoppinsRegular">
          Forgot Password?
        </TextElement>
      </TouchableOpacity>

      <PrimaryButton
        value="Sign In"
        onPress={handleLogin}
        loading={loading}
        disabled={!password}
      />

      {Platform.OS === "ios" && (
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>or</Text>
          <View style={styles.separatorLine} />
        </View>
      )}

      <View style={styles.socialSignInContainer}>
        {/* <TouchableOpacity onPress={() => console.log("Google Sign In")}>
          <Icon name="google" type="font-awesome" color={COLORS.GRAY} />
        </TouchableOpacity> */}
        {Platform.OS === "ios" && (
          <TouchableOpacity onPress={handleAppleSignUp}>
            <Icon name="apple" type="font-awesome" color={COLORS.GRAY} />
          </TouchableOpacity>
        )}

        {/* <TouchableOpacity onPress={() => console.log("Facebook Sign In")}>
          <Icon name="facebook" type="font-awesome" color={COLORS.GRAY} />
        </TouchableOpacity> */}
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

      <AuthOption option="Sign Up" screen="Register" />
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
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.TERTIARY,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "PoppinsRegular",
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  termsText: {
    fontSize: 14,
    color: COLORS.PRIMARY,
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
  signInText: {
    textAlign: "center",
    color: COLORS.GRAY,
    fontSize: 16,
    marginTop: 10,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: COLORS.GRAY,
    fontSize: 16,
  },
  button: {
    width: 200,
    height: 64,
  },
});

export default Login;
