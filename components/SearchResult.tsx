import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../utils/color";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import noProfilePic from "../assets/user.png";
import { useNavigation } from "@react-navigation/native";
import ProductStats from "./ProductStats";

interface SearchResultProps {
  image: any[];
  title: string;
  price: number;
  region: string;
  description: string;
  userDetails: any;
  _id: string | number;
  dials: string | number;
}

const SearchResult: React.FC<SearchResultProps> = ({
  image,
  title,
  price,
  region,
  description,
  userDetails,
  _id,
  dials,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const toggleIsLiked = () => {
    setIsLiked(!isLiked);
  };

  console.log("userDetails", userDetails);

  const truncatedTitle =
    description.length > 20
      ? `${description.substring(0, 20)}...`
      : description;

  const navigation = useNavigation();
  const productNavigate = () => {
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
      <View style={{ flex: 2, padding: 10, justifyContent: "space-between" }}>
        <View>
          <View>
            <Text style={styles.productTitle}>{title}</Text>
            <ProductStats
              icon={"call"}
              value={dials.length}
              name="Dials"
            />
          </View>
          <View style={styles.userView}>
            <View style={styles.avatarContainer}>
              {userDetails.profilePicture ? (
                <Avatar.Image
                  size={20}
                  source={{ uri: userDetails.profilePicture }}
                />
              ) : (
                <Avatar.Image
                  size={20}
                  source={require("../assets/user.png")}
                />
              )}
              <View>
                <Text style={styles.AvatarText}>
                  {userDetails.name || "Unknown User"}
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
            <Text style={styles.productDesc}>{truncatedTitle}</Text>
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
              size={20}
              color={COLORS.GRAY}
            />
            <Text style={{ color: COLORS.GRAY, fontFamily: "InterRegular" }}>
              {region}
            </Text>
          </View>
          <Text style={styles.productPrice}>GH₵ {price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default SearchResult;

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
    width: "100%",
    flexDirection: "row",
    height: 250,
    marginTop: 10,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
  },
  productTitle: {
    fontFamily: "InterBold",
    fontSize: 18,
  },
  productPrice: {
    fontFamily: "InterExtraBold",
    color: COLORS.COMPLIMENTARY,
    fontSize: 18,
  },
  AvatarText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
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
    fontSize: 16,
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
