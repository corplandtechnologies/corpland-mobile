// WalkthroughTour.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS } from "../../utils/color";

const slides = [
  {
    key: "one",
    title: "Welcome to Corpland",
    text: "Explore and discover products with ease.",
    // image: require("./assets/slide1.png"), // Add your image path here
    backgroundColor: "#59b2ab",
  },
  {
    key: "two",
    title: "Create Listings",
    text: "Create product requests and receive offers from sellers.",
    // image: require("./assets/slide2.png"),
    backgroundColor: "#febe29",
  },
  {
    key: "three",
    title: "Create Listings",
    text: "Create product requests and receive offers from sellers.",
    // image: require("./assets/slide2.png"),
    backgroundColor: "#febe29",
  },
  {
    key: "four",
    title: "Stay Connected",
    text: "Get notifications and manage your product interests easily.",
    // image: require("./assets/slide3.png"),
    backgroundColor: "#22bcb5",
  },
];

const WalkthroughTour = ({ onDone }) => {
  const _renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Text style={styles.title}>{item.title}</Text>
      {/* <Image source={item.image} style={styles.image} /> */}
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <AppIntroSlider renderItem={_renderItem} data={slides} onDone={onDone} />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "PoppinsBold",
    color: COLORS.SECONDARY,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "PoppinsRegular",
  },
});

export default WalkthroughTour;
