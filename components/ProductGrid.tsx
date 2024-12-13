import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../utils/color";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getUserById } from "../api/api";
import ProductStats from "./ProductStats";

interface ProductItemProps {
  image: any;
  title: string;
  price: number;
  region: string;
  description: string;
  _id: string | number;
  onReset?: () => void;
  userId: string | number;
  dials: string[];
}

const ProductGrid: React.FC<ProductItemProps> = ({
  image,
  title,
  price,
  region,
  description,
  _id,
  onReset,
  userId,
  dials,
}) => {
  const [isLiked, setIsLiked] = useState<Boolean>(false);
  const [userInfo, setUserInfo] = useState<Object>({});
  const navigation = useNavigation();
  const toggleIsLiked = () => {
    setIsLiked(!isLiked);
  };

  const truncatedDesc =
    description.length > 20
      ? `${description.substring(0, 20)}...`
      : description;

  const productNavigate = () => {
    if (onReset) {
      onReset();
    }
    navigation.navigate("Product", { productId: _id });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(userId);
        setUserInfo(res.data.user);
      } catch (error) {}
    };
    fetchUser();
  }, [userId]);

  return (
    <TouchableOpacity style={styles.productMain} onPress={productNavigate}>
      <View style={{ flex: 1 }}>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>
      <View style={{ flex: 1, padding: 10, justifyContent: "space-between" }}>
        <View>
          <View>
            <Text style={styles.productTitle}>{title}</Text>
            {/* <ProductStats
              icon={"call"}
              value={dials?.length}
              name="Dials"
              card
            /> */}
          </View>
          <View style={styles.userView}>
            <View style={styles.avatarContainer}>
              {userInfo?.profilePicture ? (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: userInfo.profilePicture,
                  }}
                />
              ) : (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: "https://ik.imagekit.io/4hxqb9ldw/user.png?updatedAt=1725434780558",
                  }}
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  maxWidth: "90%",
                  flexWrap: "wrap",
                  gap: 5,
                }}
              >
                <Text style={styles.AvatarText}>{userInfo.name}</Text>
                {userInfo.verified && (
                  <Icon
                    name="checkmark-circle"
                    size={10}
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
          {/* <View>
            <Text style={styles.productDesc}>{truncatedDesc}</Text>
          </View> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Icon name="location" size={10} color={COLORS.GRAY} />
            <Text
              style={{
                color: COLORS.GRAY,
                fontFamily: "PoppinsRegular",
                fontSize: 11,
              }}
            >
              {region}
            </Text>
          </View>
          <Text style={styles.productPrice}>GH₵{price}</Text>
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
    width: "100%",
    flexDirection: "column",
    height: 350,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
  },
  productTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  productPrice: {
    fontFamily: "PoppinsExtraBold",
    color: COLORS.PRIMARY,
    fontSize: 14,
  },
  AvatarText: {
    color: COLORS.PRIMARY,
    fontSize: 8,
    fontFamily: "PoppinsBold",
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
    fontFamily: "PoppinsRegular",
    fontSize: 11,
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
    fontFamily: "PoppinsBold",
  },
  productView: {
    flexDirection: "row",
    overflow: "hidden",
    paddingHorizontal: 10,
    height: "100%",
  },
});
