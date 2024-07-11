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
        "https://download946.mediafire.com/wyfbyqqm6rlgrbi4CQ6-0gYhvr1ajIIsgJZd_Ufhq1RiOlyB3Psuzpb4H4X0mb1AVqWEdfbXgNuNcXsYtXLAhlJeozhS35Oj9vy1exXBL597KIF5wWeadkE-S0EkfMsQyjaktJt0T04TvD_zERYK0qIWfFgZ0IUPigpOtGKtQjUw/efpne7xyiyr8oak/Corpland+1.2.2.apk";
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
