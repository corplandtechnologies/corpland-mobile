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
        "https://drive.usercontent.google.com/download?id=10XVpQCi2wt9tJVyT_hJTuarEqxELdOVT&export=download&authuser=0&confirm=t&uuid=10f76ac9-fc0e-4965-952b-a6ffa3a8e1c8&at=APZUnTXYICZu_dHQK3A5PMBr0lTt:1720668004147";
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
    fontFamily: "InterBold",
  },
  button: {
    backgroundColor: COLORS.COMPLIMENTARY, // Blue background
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 16,
    fontFamily: "InterBold",
  },
});

export default Header;
