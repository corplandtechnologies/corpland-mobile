import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Input, Button, Icon, CheckBox } from "react-native-elements";
import { COLORS } from "../../utils/color";
import { useNavigation } from "@react-navigation/native";
import { signUp } from "../../api/auth.api";
import { Snackbar } from "react-native-paper"; // Ensure this is imported
import PrimaryButton from "../../components/ui/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserHeader from "../../components/UserHeader";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false); // New state for Snackbar visibility
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await signUp({
        name,
        email,
        password,
        termsAccepted,
      });
      // Assuming user object contains userInfo and token
      await AsyncStorage.setItem("user", JSON.stringify(res.user));
      await AsyncStorage.setItem("token", res.token);
      setSnackbarVisible(true);
      setSnackbarMessage(res.message);
      navigation.navigate("Verify");
    } catch (error) {
      console.log(error);
      setSnackbarMessage(error.message);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <UserHeader
        title="Create Account"
        description="Fill your information below or register with your social account"
      />

      <View style={styles.inputContainer}>
        <Icon
          name="user"
          type="font-awesome"
          color={COLORS.GRAY}
        />
        <TextInput
          placeholder="Name"
          style={styles.input}
          placeholderTextColor={COLORS.TERTIARY}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon
          name="envelope"
          type="font-awesome"
          color={COLORS.GRAY}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor={COLORS.TERTIARY}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon
          name="lock"
          type="font-awesome"
          color={COLORS.GRAY}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          style={styles.input}
          placeholderTextColor={COLORS.TERTIARY}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon
            name={isPasswordVisible ? "eye-slash" : "eye"}
            type="font-awesome"
            color={COLORS.GRAY}
          />
        </TouchableOpacity>
      </View>

      <CheckBox
        title="Agree with Terms & Conditions"
        checked={termsAccepted}
        onPress={() => setTermsAccepted(!termsAccepted)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.termsText}
      />

      <PrimaryButton
        value="Sign Up"
        onPress={handleSignUp}
        disabled={!termsAccepted}
        loading={loading}
      />

      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.separatorLine} />
      </View>

      <View style={styles.socialSignInContainer}>
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
      </View>

      {/* "Don't have an account? Sign In" Text */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.signInText}>Already have an Account? Sign In</Text>
      </TouchableOpacity>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Close",
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}>
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
    fontFamily: "InterBold",
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
  },
});

export default Register;