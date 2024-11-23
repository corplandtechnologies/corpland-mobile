import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../utils/color";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserHeader from "../../components/features/UserHeader";
import PrimaryButton from "../../components/common/Button/PrimaryButton";
import { verifyResetCode } from "../../api/index.auth";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleError } from "../../utils";
import { RouteProp } from "@react-navigation/native";

const VerifyEmailPasswordReset = ({ route }: { route: RouteProp<any> }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const userEmail = route.params.email;

  const navigation: any = useNavigation();

  const inputRefs = useRef([null, null, null, null]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("user");
        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          setEmail(parsedUserInfo.email);
        }
      } catch (error) {}
    };

    fetchUser();
  }, []);

  const handleInputChange = (index: number, text: string) => {
    let newCode = verificationCode;

    // If the input is being cleared, remove the corresponding character
    if (text.length === 0) {
      newCode = newCode.slice(0, index) + newCode.slice(index + 1);
    } else {
      // Otherwise, insert the new character at the correct position
      newCode = newCode.slice(0, index) + text + newCode.slice(index);
    }

    setVerificationCode(newCode);

    // Move focus to the next input if there is one
    if (index < inputRefs.current.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await verifyResetCode(userEmail, verificationCode);
      setSnackbarVisible(true);
      setSnackbarMessage("Verification Successful!");
      navigation.navigate("ResetPassword", {
        email: userEmail,
      });
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
        title="Verify Email"
        description="Please enter the code we sent to your Email. Check the spam folder if you still can't find it."
      />

      <View style={styles.inputContainer}>
        {[...Array(4)].map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            placeholder="-"
            onChangeText={(text) => handleInputChange(index, text)}
          />
        ))}
      </View>
      <PrimaryButton
        value="Verify"
        loading={loading}
        onPress={handleVerify}
        disabled={verificationCode.length !== 4}
      />
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

  inputContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    justifyContent: "center",
    gap: 10,
  },

  input: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.TERTIARY,
    borderRadius: 10,
    textAlign: "center",
  },

  termsButton: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },

  otp: {
    textAlign: "right",
    color: COLORS.GRAY,
    fontSize: 16,
  },
});

export default VerifyEmailPasswordReset;
