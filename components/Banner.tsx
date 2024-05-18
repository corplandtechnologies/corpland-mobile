import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/color";

const Banner = () => {
  return (
    <View style={styles.discover}>
      <View style={styles.discoverTextView}>
        <Text style={styles.discoverText}>Are you hungry?</Text>
        <Text style={styles.discoverSubText}>
          Order what you want at the the Food category!
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => console.log("Button pressed")}>
          <Text style={styles.buttonText}>Discover More</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={require("../assets/discoverImage.png")}
          style={styles.imageStyle}
        />
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  discover: {
    backgroundColor: COLORS.PRIMARY,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 30,
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  discoverText: {
    color: COLORS.SECONDARY,
    fontSize: 24,
    fontFamily: "InterBold",
  },
  discoverSubText: {
    color: COLORS.SECONDARY,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "InterRegular",
  },
  buttonStyle: {
    backgroundColor: COLORS.SECONDARY,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: "InterRegular",
  },
  buttonText: {
    color: COLORS.PRIMARY,
  },
  discoverTextView: {
    width: "60%",
  },
});
