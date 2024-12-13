import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Input, Button, Icon, CheckBox } from "react-native-elements";
import { COLORS } from "../../utils/color";
import { useNavigation } from "@react-navigation/native";
import { authWithSocial } from "../../api/auth.api";
import { signUp } from "../../api";
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
import PhoneInput from "react-native-phone-input";
import { authService } from "../../services/auth.service";
import { useApp } from "../../context/AppContext";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [appleUserToken, setAppleUserToken] = useState<any>();
  const [googleUserInfo, setGoogleUserInfo] = useState<any>();
  const [referralCode, setReferralCode] = useState<string>("");
  const navigation: any = useNavigation();
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const { setUser } = useApp();
  useEffect(() => {
    // checkAuthStatus();
    checkAppleAuthAvailability();
  }, []);

  // const checkAuthStatus = async () => {
  //   const token = await AsyncStorage.getItem("token");
  //   if (token) {
  //     navigation.navigate("CompleteProfile");
  //   }
  // };

  const checkAppleAuthAvailability = async () => {
    const isAvailable = await AppleAuthentication.isAvailableAsync();
    setAppleAuthAvailable(isAvailable);
  };

  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    };
    checkAvailable();
  }, []);
  // useEffect(() => {
  //   GoogleSignin.configure();
  // }, []);
  // const handleGoogleSignUp = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo: any = await GoogleSignin.signIn();
  //     setGoogleUserInfo(userInfo);
  //     // const res = await authWithSocial({
  //     //   name: `${userInfo.fullName.givenName}" "${userInfo.fullName.familyName}`,
  //     //   email: userInfo.email,
  //     // });
  //     // // Assuming user object contains userInfo and token
  //     // await AsyncStorage.setItem("user", JSON.stringify(res.user));
  //     // await AsyncStorage.setItem("token", res.token);
  //     // setSnackbarVisible(true);
  //     // setSnackbarMessage("Registration Completed Successfully!");
  //     // navigation.navigate("CompleteProfile");
  //
  //   } catch (e) {
  //
  //     setSnackbarMessage(handleError(e));
  //     setSnackbarVisible(true);
  //   }
  // };

  const handleAppleSignUp = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { identityToken, fullName, email } = credential;

      if (!identityToken) {
        throw new Error("Failed to get identity token from Apple Sign In");
      }

      const userInfo = jwtDecode(identityToken);

      const res = await authWithSocial({
        name: fullName
          ? `${fullName.givenName} ${fullName.familyName}`
          : "Apple User",
        email: email || userInfo.email,
      });

      await AsyncStorage.setItem("user", JSON.stringify(res.user));
      await AsyncStorage.setItem("token", res.token);

      setSnackbarVisible(true);
      setSnackbarMessage("Registration Completed Successfully!");
      navigation.navigate("CompleteProfile");
    } catch (e) {
      setSnackbarVisible(true);
      setSnackbarMessage(handleError(e));
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !email ||
      !password ||
      !name ||
      !phoneNumber ||
      phoneNumber.trim() === "" ||
      phoneNumber.length < 10
    ) {
      setSnackbarMessage("All fields are required!");
      setSnackbarVisible(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setSnackbarMessage("Please enter a valid email address.");
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    try {
      const res = await signUp({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password.trim(),
        termsAccepted,
      });

      // Store the initial user data and token
      const userData = res.data?.data.user;
      const token = res.data?.data.token;

      await authService.setUser(userData);
      await authService.setToken(token);

      setSnackbarVisible(true);
      setSnackbarMessage(res.data?.message);
      navigation.navigate("Verify");
    } catch (error) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTermsPress = () => {
    // Will Create this page in the future
    // Linking.openURL("https://corpland.app/terms-and-conditions");
    Linking.openURL(
      "https://www.termsfeed.com/live/ba293553-5fc9-4f66-be64-9613b78987e8"
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <UserHeader
        title="Create Account"
        description="Fill your information below or register with your social account"
      />
      <View style={{ gap: 20 }}>
        <FormInput icon="user" placeholder="Name" onChangeText={setName} />
        <View style={styles.inputContainer}>
          <Icon name="phone" type="font-awesome" color={COLORS.GRAY} />
          <PhoneInput
            initialCountry={"gh"}
            textProps={{
              placeholder: "Enter a phone number...",
              cursorColor: COLORS.PRIMARY,
            }}
            style={styles.input}
            pickerBackgroundColor={COLORS.TERTIARY}
            onChangePhoneNumber={(text) => {
              setPhoneNumber(text);
            }}
            autoFormat={true}

            // You can customize the country list and other props as needed
          />
        </View>
        <FormInput
          icon="envelope"
          placeholder="Email"
          onChangeText={setEmail}
        />
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
      </View>

      <CheckBox
        title={
          <TouchableOpacity onPress={handleTermsPress}>
            <Text style={styles.termsText}>Agree with Terms & Conditions</Text>
          </TouchableOpacity>
        }
        checked={termsAccepted}
        onPress={() => setTermsAccepted(!termsAccepted)}
        containerStyle={styles.checkboxContainer}
        checkedColor={COLORS.PRIMARY}
        checkedIcon="check"
        uncheckedColor={COLORS.GRAY}
      />

      <PrimaryButton
        value="Sign Up"
        onPress={handleSignUp}
        disabled={!termsAccepted}
        loading={loading}
      />
      {/* 
      {Platform.OS === "ios" && (
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>or</Text>
          <View style={styles.separatorLine} />
        </View>
      )} */}

      <View style={styles.socialSignInContainer}>
        {/* <TouchableOpacity onPress={handleGoogleSignUp}>
          <Icon name="google" type="font-awesome" color={COLORS.GRAY} />
        </TouchableOpacity> */}
        {/* {Platform.OS === "ios" && (
        <>
           <TouchableOpacity onPress={handleAppleSignUp}>
           <Icon name="apple" type="font-awesome" color={COLORS.GRAY} />
         </TouchableOpacity>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={5}
            style={styles.button}
            onPress={handleAppleSignUp}
          />
        </>
         )}  */}
        {/* <TouchableOpacity onPress={() => }>
          <Icon name="facebook" type="font-awesome" color={COLORS.GRAY} />
        </TouchableOpacity> */}
      </View>

      <AuthOption isRegistered option="Sign In" screen="Login" />
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
    </ScrollView>
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
    marginLeft: 10,
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
    marginVertical: 10,
  },
  button: {
    width: 200,
    height: 64,
  },
});

export default Register;
