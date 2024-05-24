import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, Image, StyleSheet, View } from "react-native";
import { COLORS } from "../utils/color";

const Banner = () => {
  const images = [
    require("../assets/shopping.jpg"),
    require("../assets/clothingImage.jpg"),
    require("../assets/CORPLAND (3).png"),
    require("../assets/CORPLAND5.png"),
    require("../assets/Designer.jpeg"),
    require("../assets/E-commerce.jpeg"),
    // Add more images as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
      // Scroll to the next image
      scrollViewRef.current?.scrollTo({
        x: nextIndex * Dimensions.get("window").width,
        y: 0,
        animated: true,
      });
    }, 5000); // Change image every 10 seconds

    return () => clearInterval(timer);
  }, [currentImageIndex]);

  const renderImages = () => {
    return images.map((image, index) => (
      <View
        key={index}
        style={{ width: Dimensions.get("window").width }}>
        <Image
          source={image}
          style={styles.imageStyle}
        />
      </View>
    ));
  };

  const renderDots = () => {
    return images.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          currentImageIndex === index ? styles.activeDot : {},
        ]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / Dimensions.get("window").width
          );
          setCurrentImageIndex(newIndex);
        }}
        scrollEventThrottle={16}>
        {renderImages()}
      </ScrollView>
      <View style={styles.dotsContainer}>{renderDots()}</View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  imageStyle: {
    width: "100%",
    height: 200, // Adjust the height as needed
    resizeMode: "cover",
    borderRadius: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.TERTIARY,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.SECONDARY,
  },
});
