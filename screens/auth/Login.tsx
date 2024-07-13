import React, { useState } from "react";
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
import { login } from "../../api/auth.api";
import AuthOption from "../../components/auth/AuthOption";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false); // New state for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

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
      console.log({
        email: email,
        password: password,
      });
      const res = await login({
        email: email,
        password: password,
      });

      // Assuming user object contains userInfo and token
      await AsyncStorage.setItem("user", JSON.stringify(res.user));
      await AsyncStorage.setItem("token", res.token);
      setSnackbarVisible(true);
     setSnackbarMessage("Logged In Successfully!");
      navigation.navigate("TabNavigator", { screen: "Home" });
    } catch (error) {
      console.log(error);
      let errorMessage = "An unexpected error occurred.";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.message || error.response.statusText;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response received from the server.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }
      setSnackbarMessage(errorMessage);
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

      {/* <TouchableOpacity onPress={() => console.log("Forgot Password")}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity> */}

      <PrimaryButton
        value="Sign In"
        onPress={handleLogin}
        loading={loading}
        disabled={!password}
      />

      {/* <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.separatorLine} />
      </View> */}

      {/* <View style={styles.socialSignInContainer}>
        <TouchableOpacity onPress={() => console.log("Google Sign In")}>
          <Icon
            name="google"
            type="font-awesome"
            color={COLORS.GRAY}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Apple Sign In")}>
          <Icon
            name="apple"
            type="font-awesome"
            color={COLORS.GRAY}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Facebook Sign In")}>
          <Icon
            name="facebook"
            type="font-awesome"
            color={COLORS.GRAY}
          />
        </TouchableOpacity>
      </View> */}
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
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  termsText: {
    fontSize: 14,
    color: COLORS.COMPLIMENTARY,
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
});

export default Login;
