import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../utils/color";

const Banner = () => {
  const images = [
    require("../assets/AdBannerCaution.jpg"),
    require("../assets/AdBannerCautionPurple.jpg"),
    require("../assets/AdBannerCautionGold.jpg"),
    require("../assets/CORPLAND (3).png"),
    require("../assets/CORPLAND5.png"),
    // Add more images as needed
  ];

  // Phone numbers for WhatsApp
  const whatsAppPhoneNumbers = [
    "+233201027084",
    "+233201027084",
    "+233201027084",
  ];

  // Phone numbers for fallback dialer
  const dialerPhoneNumbers = [
    "+233246815631",
    "+233246815631",
    "+233246815631",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const openWhatsAppOrDial = (whatsAppNumber: string, dialerNumber: string) => {
    // Construct the WhatsApp URL
    const url = `whatsapp://send?phone=${whatsAppNumber}`;

    // Check if WhatsApp is available
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          // Open WhatsApp
          return Linking.openURL(url);
        } else {
          // Fallback to dialer with a different number
          const dialUrl = `tel:${dialerNumber}`;
          return Linking.openURL(dialUrl);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

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
      <TouchableOpacity
        key={index}
        onPress={() =>
          openWhatsAppOrDial(
            whatsAppPhoneNumbers[index],
            dialerPhoneNumbers[index]
          )
        }>
        <View style={{ width: Dimensions.get("window").width }}>
          <Image
            source={image}
            style={styles.imageStyle}
          />
        </View>
      </TouchableOpacity>
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
