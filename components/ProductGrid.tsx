import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../utils/color";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface ProductItemProps {
  image: string;
  title: string;
  price: number;
  region: string;
  description: string;
  userDetails: any;
  _id: string | number;
  onReset?: () => void;
}

const ProductGrid: React.FC<ProductItemProps> = ({
  image,
  title,
  price,
  region,
  description,
  userDetails,
  _id,
  onReset,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const navigation = useNavigation();
  const toggleIsLiked = () => {
    setIsLiked(!isLiked);
  };

  const truncatedDesc =
    description.length > 50
      ? `${description.substring(0, 50)}...`
      : description;

  const productNavigate = () => {
    if (onReset) {
      onReset();
    }
    navigation.navigate("Product", { productId: _id });
  };

  return (
    <TouchableOpacity
      style={styles.productMain}
      onPress={productNavigate}>
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: image }}
          style={styles.productImage}
        />
      </View>
      <View style={{ flex: 1, padding: 10, justifyContent: "space-between" }}>
        <View>
          <View>
            <Text style={styles.productTitle}>{title}</Text>
          </View>
          <View style={styles.userView}>
            <View style={styles.avatarContainer}>
              {userDetails &&
              userDetails.length > 0 &&
              userDetails[0]?.profilePicture ? (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: userDetails[0].profilePicture,
                  }}
                />
              ) : (
                <Avatar.Image
                  size={20}
                  source={require("../assets/user.png")}
                />
              )}
              <View>
                <Text style={styles.AvatarText}>
                  {(userDetails &&
                    userDetails.length > 0 &&
                    userDetails[0]?.name) ||
                    userDetails.name ||
                    "Unknown User"}
                </Text>
              </View>
              {/* <View>
              <TouchableOpacity onPress={toggleIsLiked}>
                <Icon
                  name={isLiked ? "heart" : "heart-outline"}
                  size={30}
                  color={"red"}
                />
              </TouchableOpacity>
            </View> */}
            </View>
          </View>
          <View>
            <Text style={styles.productDesc}>{truncatedDesc}</Text>
          </View>
        </View>
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
              size={10}
              color={COLORS.GRAY}
            />
            <Text
              style={{
                color: COLORS.GRAY,
                fontFamily: "InterRegular",
                fontSize: 11,
              }}>
              {region}
            </Text>
          </View>
          <Text style={styles.productPrice}>GHC {price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ProductGrid;

const styles = StyleSheet.create({
  productMain: {
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    shadowRadius: 3.84,
    width: "100%",
    flexDirection: "column",
    height: 300,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
  },
  productTitle: {
    fontFamily: "InterBold",
    fontSize: 16,
  },
  productPrice: {
    fontFamily: "InterExtraBold",
    color: COLORS.COMPLIMENTARY,
    fontSize: 14,
  },
  AvatarText: {
    color: COLORS.PRIMARY,
    fontSize: 8,
    fontFamily: "InterBold",
    // maxWidth: "80%",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
    width: "100%",
  },
  productDesc: {
    fontFamily: "InterRegular",
    fontSize: 11,
  },
  userView: {
    flexDirection: "row",
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
    paddingHorizontal: 10,
    height: "100%",
  },
});
