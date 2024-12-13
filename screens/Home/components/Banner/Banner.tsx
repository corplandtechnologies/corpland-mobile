import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";

import React, { useState, useEffect, useRef } from "react";
import { COLORS } from "../../../../utils/color";
import AnimatedView from "../../../../components/animated/AnimatedView";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../../../context/ThemeContext";
import { Image } from "expo-image";
import PagerView from "react-native-pager-view";
import { Badge } from "@rneui/themed";
import ViewElement from "../../../../components/common/View/ViewElement";
import TextElement from "../../../../components/common/Text/TextElement";

const Banner = () => {
  const navigation: any = useNavigation();
  const { theme } = useTheme();
  const images = [
    require("../../../../assets/AdBannerCaution.jpg"),
    require("../../../../assets/AdBannerCautionPurple.jpg"),
    require("../../../../assets/CORPLAND (3).png"),
    require("../../../../assets/CORPLAND5.png"),
    require("../../../../assets/banner.jpg"),
    // Add more images as needed
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % images.length); // Move to the next page
    }, 5000); // Change every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  useEffect(() => {
    if (pagerRef.current) {
      pagerRef.current.setPage(currentPage);
    }
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={image} style={styles.imageStyle} transition={2} />
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0)"]}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradient}
            />
            
          </View>
        ))}
      </PagerView>
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: 10,
  },
  imageContainer: {
    width: Dimensions.get("window").width,
    height: 200, // Adjust height as needed
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
  },
  textContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  imageStyle: {
    padding: 0,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  pagerView: {
    height: 200,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#2C465C",
  },
  inactiveDot: {
    backgroundColor: "#D6D6D6",
  },
});
