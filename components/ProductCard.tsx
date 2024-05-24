import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../utils/color";
import { Avatar } from "react-native-paper";
import Card from "./ui/Card";
import Icon from "react-native-vector-icons/Ionicons";

const ProductCard = () => {
  const [isLiked, setIsLiked] = useState(false);
  const toggleIsLiked = () => {
    setIsLiked(!isLiked);
  };
  const dummyText =
    "To limit the title to a specific number of letters and add .. if it exceeds that length, you can't directly use the Text component's numberOfLines and ellipsizeMode props because they are designed for line-based truncation. Instead, you'll need to manually truncate the string in your component's logic before rendering it.";
  const truncatedTitle =
    dummyText.length > 100 ? `${dummyText.substring(0, 100)}...` : dummyText;

  return (
    <View style={styles.productMain}>
      <Image
        source={require("../assets/clothingImage.jpg")}
        style={styles.productImage}
      />

      <View style={{ padding: 10 }}>
        <Text style={styles.productTitle}>
          Quality RoundRoundRoundRoundRound Neck Tops
        </Text>

        <View style={styles.userView}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={20}
              source={require("../assets/shopping.jpg")}
            />
            <View>
              <Text style={styles.AvatarText}>Sylvester</Text>
              {/* <View style={styles.levelView}>
                <Text style={styles.levelText}>Level 1</Text>
              </View> */}
            </View>
          </View>
        </View>
        {/* <Text style={styles.productDesc}>{truncatedTitle}</Text> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}>
            <Icon
              name="location"
              size={20}
              color={COLORS.GRAY}
            />
            <Text style={{ color: COLORS.GRAY, fontFamily: "InterRegular" }}>
              Accra, Ghana
            </Text>
          </View>
          <Text style={styles.productPrice}>GHC 400</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productMain: {
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 250,
    marginRight: 20,
    marginBottom: 20,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    objectFit: "cover",
  },
  productTitle: {
    fontFamily: "InterBold",
    fontSize: 20,
  
  },
  productPrice: {
    fontFamily: "InterExtraBold",
    color: COLORS.COMPLIMENTARY,
    fontSize: 18,
  },
  AvatarText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontFamily: "InterBold",
    marginTop: 5,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
  },
  productDesc: {
    fontFamily: "InterRegular",
    fontSize: 16,
  },
  userView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelView: {
    backgroundColor: COLORS.COMPLIMENTARY,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
  },
  levelText: {
    color: COLORS.SECONDARY,
    textAlign: "center",
    fontFamily: "InterBold",
  },
  productView: {
    flexDirection: "row",
    overflow: "hidden",
    paddingHorizontal: 10, // Adjust paddingHorizontal to prevent stretching
  },
});
