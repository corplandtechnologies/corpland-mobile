import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/color";
import WalletModal from "../components/WalletModal";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";
import PrimaryButton from "../components/ui/PrimaryButton";

const CompleteDeposit = () => {
  const navigation = useNavigation();

  const handleRedirect = () => {
    Linking.openURL("https://gmail.com");
  };
  return (
    <View style={styles.main}>
      <Text style={styles.infoText}>
        An authorization link has been sent to your email to finalize the
        process. If you cannot find the email in your inbox, check the spam
        folder.
      </Text>
      <PrimaryButton value={"Check Mail"} onPress={handleRedirect} />
    </View>
  );
};

export default CompleteDeposit;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  infoText: {
    textAlign: "center",
    fontFamily: "InterBold",
    fontSize: 18,
  },
});
