import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { COLORS } from "../utils/color";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Card from "./ui/Card";
import { blurhash } from "../utils";

interface ProductItemProps {
  image: any[];
  title: string;
  price: number;
  region: string;
  description: string;
  userDetails: any;
  _id: string | number;
  onReset?: () => void;
  status?: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  image,
  title,
  price,
  region,
  description,
  userDetails,
  _id,
  onReset,
  status,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const navigation = useNavigation();
  const toggleIsLiked = () => {
    setIsLiked(!isLiked);
  };

  const truncatedTitle =
    description.length > 10
      ? `${description.substring(0, 10)}...`
      : description;

  const productNavigate = () => {
    if (onReset) {
      onReset();
    }
    navigation.navigate("Product", { productId: _id });
  };

  return (
    <TouchableOpacity onPress={productNavigate}>
      <Card
        style={{
          width: "100%",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={image}
            placeholder={{ blurhash }}
            transition={1000}
            style={styles.productImage}
          />
        </View>
        <View style={{ flex: 2, padding: 10, justifyContent: "space-between" }}>
          <View>
            <View>
              <Text style={styles.productTitle}>{title}</Text>
            </View>
            <View style={styles.userView}>
              <View style={styles.avatarContainer}>
                <Avatar.Image
                  size={20}
                  source={{
                    uri:
                      userDetails?.profilePicture ||
                      "https://ik.imagekit.io/4hxqb9ldw/user.png?updatedAt=1725434780558",
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    maxWidth: "90%",
                    flexWrap: "wrap",
                    gap: 5,
                  }}
                >
                  <Text style={styles.AvatarText}>
                    {(userDetails &&
                      userDetails.length > 0 &&
                      userDetails[0]?.name) ||
                      userDetails.name ||
                      "Unknown User"}
                  </Text>
                  {userDetails.verified && (
                    <Icon
                      name="checkmark-circle"
                      size={15}
                      color={COLORS.PRIMARY}
                    />
                  )}
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
              flex: 1,
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                flex: 1,
              }}
            >
              <Icon name="location" size={20} color={COLORS.GRAY} />
              <Text
                style={{ color: COLORS.GRAY, fontFamily: "poppinsRegular" }}
              >
                {region}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text style={styles.productPrice}>GH₵{price}</Text>
            </View>
          </View>
        </View>
        {status === "In Review" && (
          <View style={{ flex: 0.25, alignItems: "center" }}>
            <Icon name="time" size={20} color={"#FF851B"} />
          </View>
        )}
        {status === "Rejected" && (
          <View style={{ flex: 0.25, alignItems: "center" }}>
            <Icon name="close-circle" size={20} color={"red"} />
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};
export default ProductItem;

const styles = StyleSheet.create({
  productMain: {
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 20,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    width: "100%",
    flexDirection: "row",
    // height: 200,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    flex: 1,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
  },
  productTitle: {
    fontFamily: "poppinsSemiBold",
    fontSize: 18,
  },
  productPrice: {
    fontFamily: "poppinsSemiBold",
    color: COLORS.PRIMARY,
    fontSize: 18,
  },
  AvatarText: {
    color: COLORS.PRIMARY,
    fontSize: 11,
    fontFamily: "poppinsSemiBold",
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
    fontFamily: "poppinsRegular",
    fontSize: 16,
  },
  userView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelView: {
    backgroundColor: COLORS.PRIMARY,
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
    fontFamily: "poppinsBold",
  },
  productView: {
    flexDirection: "row",
    overflow: "hidden",
    paddingHorizontal: 10,
    height: "100%",
  },
});
