// import React, { useEffect, useRef, useState } from "react";
// import {
//   Dimensions,
//   ScrollView,
//   Image,
//   StyleSheet,
//   View,
//   Linking,
//   TouchableOpacity,
// } from "react-native";
// import { COLORS } from "../utils/color";

// const Banner = () => {
//   const images = [
//     require("../assets/AdBannerCaution.jpg"),
//     require("../assets/AdBannerCautionPurple.jpg"),
//     require("../assets/AdBannerCautionGold.jpg"),
//     require("../assets/CORPLAND (3).png"),
//     require("../assets/CORPLAND5.png"),
//     // Add more images as needed
//   ];

//   // Phone numbers for WhatsApp
//   const whatsAppPhoneNumbers = [
//     "+233201027084",
//     "+233201027084",
//     "+233201027084",
//   ];

//   // Phone numbers for fallback dialer
//   const dialerPhoneNumbers = [
//     "+233246815631",
//     "+233246815631",
//     "+233246815631",
//   ];

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const scrollViewRef = useRef<ScrollView>(null);

//   const openWhatsAppOrDial = (whatsAppNumber: string, dialerNumber: string) => {
//     // Construct the WhatsApp URL
//     const url = `whatsapp://send?phone=${whatsAppNumber}`;

//     // Check if WhatsApp is available
//     Linking.canOpenURL(url)
//       .then((supported) => {
//         if (supported) {
//           // Open WhatsApp
//           return Linking.openURL(url);
//         } else {
//           // Fallback to dialer with a different number
//           const dialUrl = `tel:${dialerNumber}`;
//           return Linking.openURL(dialUrl);
//         }
//       })
//       .catch((err) => );
//   };

//   useEffect(() => {
//     const timer = setPoppinsval(() => {
//       const nextIndex = (currentImageIndex + 1) % images.length;
//       setCurrentImageIndex(nextIndex);
//       // Scroll to the next image
//       scrollViewRef.current?.scrollTo({
//         x: nextIndex * Dimensions.get("window").width,
//         y: 0,
//         animated: true,
//       });
//     }, 5000); // Change image every 10 seconds

//     return () => clearPoppinsval(timer);
//   }, [currentImageIndex]);

//   const renderImages = () => {
//     return images.map((image, index) => (
//       <TouchableOpacity
//         key={index}
//         onPress={() =>
//           openWhatsAppOrDial(
//             whatsAppPhoneNumbers[index],
//             dialerPhoneNumbers[index]
//           )
//         }>
//         <View style={{ width: Dimensions.get("window").width }}>
//           <Image
//             source={image}
//             style={styles.imageStyle}
//           />
//         </View>
//       </TouchableOpacity>
//     ));
//   };

//   const renderDots = () => {
//     return images.map((_, index) => (
//       <View
//         key={index}
//         style={[
//           styles.dot,
//           currentImageIndex === index ? styles.activeDot : {},
//         ]}
//       />
//     ));
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         ref={scrollViewRef}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={(event) => {
//           const newIndex = Math.round(
//             event.nativeEvent.contentOffset.x / Dimensions.get("window").width
//           );
//           setCurrentImageIndex(newIndex);
//         }}
//         scrollEventThrottle={16}>
//         {renderImages()}
//       </ScrollView>
//       <View style={styles.dotsContainer}>{renderDots()}</View>
//     </View>
//   );
// };

// export default Banner;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     overflow: "hidden",
//     marginVertical: 10,
//   },
//   imageStyle: {
//     width: "100%",
//     height: 200, // Adjust the height as needed
//     resizeMode: "cover",
//     borderRadius: 10,
//   },
//   dotsContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     bottom: 10,
//     width: "100%",
//   },
//   dot: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: COLORS.TERTIARY,
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     backgroundColor: COLORS.SECONDARY,
//   },
// });

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../utils/color";
import AnimatedView from "../animated/AnimatedView";
import { useNavigation } from "@react-navigation/native";

const Banner = () => {
  const navigation: any = useNavigation();
  return (
    <AnimatedView>
      <View style={styles.discover}>
        <View style={styles.discoverTextView}>
          <Text style={styles.discoverText}>Are you hungry?</Text>
          <Text style={styles.discoverSubText}>
            Order what you want at the the Food category!
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              navigation.navigate("ProductDisplay", { category: "Food" })
            }
          >
            <Text style={styles.buttonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageView}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/drwzb6vqn/image/upload/v1728993809/discoverImage_dxeuc1.png",
            }}
            style={styles.imageStyle}
          />
        </View>
      </View>
    </AnimatedView>
  );
};

export default Banner;

const styles = StyleSheet.create({
  discover: {
    backgroundColor: COLORS.GRAY_LIGHT,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 20,
    gap: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  discoverText: {
    color: COLORS.PRIMARY,
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
  },
  discoverSubText: {
    color: COLORS.TERTIARY,

    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "PoppinsMedium",
  },
  buttonStyle: {
    backgroundColor: COLORS.PRIMARY,
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
    fontFamily: "PoppinsRegular",
    width: "60%",
  },
  buttonText: {
    color: COLORS.SECONDARY,
    fontFamily: "PoppinsSemiBold",
    fontSize: 11,
  },
  discoverTextView: {
    flex: 2,
  },
  imageView: {
    flex: 1,
  },
});
