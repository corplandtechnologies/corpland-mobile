import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../utils/color";
import { useNavigation } from "@react-navigation/native";
import AuthOption from "../components/auth/AuthOption";

const Onboarding = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;
  const [slideUpAnimation] = useState(new Animated.Value(windowHeight));
  const [titleAnimation] = useState(new Animated.Value(windowHeight));
  const [explanationAnimation] = useState(new Animated.Value(windowHeight));
  const [buttonAnimation] = useState(new Animated.Value(windowHeight));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(slideUpAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(titleAnimation, {
        toValue: 0,
        duration: 1000,
        delay: 1, // Delay before starting the next animation
        useNativeDriver: true,
      }),
      Animated.timing(explanationAnimation, {
        toValue: 0,
        duration: 1000,
        delay: 2, // Delay before starting the next animation
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 1000,
        delay: 3, // Delay before starting the next animation
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/Designer3.jpeg")} // Replace with your image path
      style={styles.backgroundImage}
    >
      <Animated.View
        style={[
          styles.slideUp,
          { transform: [{ translateY: slideUpAnimation }] },
        ]}
      >
        <View style={styles.bar}></View>
        <Animated.View
          style={[
            styles.titleContainer,
            { transform: [{ translateY: titleAnimation }] },
          ]}
        >
          <Text style={styles.title}>
            Let's Find the <Text style={{ color: COLORS.PRIMARY }}>Best</Text> &{" "}
            <Text style={{ color: COLORS.PRIMARY }}>Most Trustworthy</Text>{" "}
            Deals
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.explanationContainer,
            { transform: [{ translateY: explanationAnimation }] },
          ]}
        >
          <Text style={styles.explanation}>
            We will show you products and services that are genuinely worth
            buying and won’t break the bank! Just tap the button below to find
            them.
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.buttonContainer,
            { transform: [{ translateY: buttonAnimation }] },
          ]}
        >
          <Button
            icon={"arrow-right"}
            style={styles.button}
            textColor={COLORS.SECONDARY}
            onPress={() => navigation.navigate("Register")}
          >
            Get Started
          </Button>
          <AuthOption isRegistered option="Sign In" screen="Login" />
        </Animated.View>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  slideUp: {
    width: "100%",
    height: "40%",
    backgroundColor: COLORS.SECONDARY,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    justifyContent: "space-between",
  },
  titleContainer: {
    // Additional styles for the title container
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    color: COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "PoppinsExtraBold",
  },
  explanationContainer: {
    // Additional styles for the explanation container
  },
  explanation: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "PoppinsRegular",
  },
  buttonContainer: {
    // Additional styles for the button container
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 5,
    padding: 10,
  },
  bar: {
    height: 5,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 9999,
    width: "20%",
    alignSelf: "center",
  },
});

export default Onboarding;
