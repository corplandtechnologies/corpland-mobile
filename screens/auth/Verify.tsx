import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import UserHeader from "../../components/UserHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { COLORS } from "../../utils/color";
import { verifyEmail } from "../../api/index.auth";

const Verify = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([null, null, null, null]);
  const navigation = useNavigation();
  console.log(verificationCode);

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
    // Update the verificationCode array at the given index
    const newCode = [...verificationCode];
    newCode[index] = text;

    setVerificationCode(newCode);

    // Move to the next input if the current input is filled
    if (text && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // If the input is cleared, move to the previous input
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const data = {
        email,
        otp: verificationCode.join(""),
      };

      await verifyEmail(data);

      // After verification, navigate to complete profile
      navigation.navigate("CompleteProfile");
    } catch (error) {
      setSnackbarMessage("Invalid Code. Check and Try again!");
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <UserHeader
        title="Verify Code"
        description="Please enter the code we sent to your Email. Check the spam folder if you still can't find it."
      />

      <View style={styles.inputContainer}>
        {verificationCode.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            placeholder="-"
            value={digit}
            onChangeText={(text) => handleInputChange(index, text)}
          />
        ))}
      </View>

      <PrimaryButton
        value="Verify"
        loading={loading}
        onPress={handleVerify}
        disabled={verificationCode.join("").length !== 4} // Disable unless 4 digits entered
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Close",
          onPress: () => setSnackbarVisible(false),
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
});

export default Verify;
