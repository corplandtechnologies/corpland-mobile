import React from "react";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS } from "../utils/color";

const Header = () => {
  const handlePress = () => {
    if (Platform.OS === "ios") {
      // Link to Google Forms for iOS users
      window.location.href =
        "https://docs.google.com/forms/d/e/1FAIpQLSeZH9Sy3dyyiLy8UkyRMUnN6zQdYTInesldplPPeL0H2fZZ0A/viewform?usp=sf_link";
    } else {
      // Link to download page for Android users
      window.location.href =
        "https://dl.dropboxusercontent.com/scl/fi/r8ikl80ypa80kq58ctcj5/Corpland-1.2.2.apk?rlkey=sm0kue6fmelaxl5jlppomc48s&st=05lav4ko&dl=0";
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        For a better experience, download the Corpland App now!
      </Text>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
