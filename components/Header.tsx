import React from "react";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS } from "../utils/color";
import { AppStoreButton, GooglePlayButton } from "react-mobile-app-button";
import PrimaryButton from "./ui/PrimaryButton";

const Header = () => {
  const APKUrl =
    "https://play.google.com/store/apps/details?id=com.corplandtechnologies.corpland&pcampaignid=web_share";

  const appleAppURL = "https://apps.apple.com/gh/app/corpland/id6670435009";

  const handlePress = () => {
    if (Platform.OS === "ios") {
      // Link to Google Forms for iOS users
      window.location.href = appleAppURL;
    } else {
      // Link to download page for Android users
      window.location.href = APKUrl;
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>For a better experience...</Text>
      <View style={{ flexDirection: "row" }}>
        {Platform.OS === "ios" ? (
          <PrimaryButton
            value="Get it On Apple App Store"
            onPress={handlePress}
          />
        ) : (
          <PrimaryButton
            value="Get it On Google Play Store"
            onPress={handlePress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: "#f8f8f8", // Light grey background
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
  button: {
    backgroundColor: COLORS.PRIMARY, // Blue background
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
});

export default Header;
