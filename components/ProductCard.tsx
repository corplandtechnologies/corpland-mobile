import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Image } from "expo-image";
import { COLORS } from "../utils/color";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { getUserById } from "../api/api";
import ProductStats from "./ProductStats";
import { blurhash, formatPrice } from "../utils";

interface Product {
  title: string;
  description: string;
  price: string;
  image: string;
  location: string;
}

interface ProductCardProps {
  product: Product;
  onReset?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onReset }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(product.userId);
        setUserInfo(res.data.user);
      } catch (error) {}
    };
    fetchUser();
  }, [product?.userId]);
  const truncatedDesc =
    product.description?.length > 20
      ? `${product.description.substring(0, 20)}...`
      : product.description;

  const productNavigate = () => {
    if (onReset) {
      onReset();
    }
    navigation.navigate("Product", { productId: product._id });
  };

  return (
    <TouchableOpacity style={styles.productMain} onPress={productNavigate}>
      <View style={{ flex: 1 }}>
        <Image
          source={product?.image || product?.images[0]}
          placeholder={{ blurhash }}
          transition={1000}
          style={styles.productImage}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.topContent}>
          <Text style={styles.productTitle}>{product.title}</Text>
          {/* <ProductStats
            icon={"call"}
            value={product.dials.length}
            name="Dials"
          /> */}
          <View style={styles.userView}>
            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={20}
                source={{
                  uri:
                    userInfo.profilePicture ||
                    "https://res.cloudinary.com/ddhdyuktu/image/upload/v1717377760/corpland/user_yn44if.png",
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: "90%",
                  gap: 5,
                }}
              >
                <Text style={styles.AvatarText}>{userInfo.name}</Text>
                {userInfo.verified && (
                  <Icon
                    name="checkmark-circle"
                    // size={18}
                    color={COLORS.PRIMARY}
                  />
                )}
              </View>
            </View>
          </View>
          {/* <Text style={styles.productDesc}>{truncatedDesc}</Text> */}
        </View>

        <View style={styles.bottomContent}>
          <View style={styles.locationContainer}>
            <Icon name="location" size={11} color={COLORS.GRAY} />
            <Text
              style={{
                color: COLORS.GRAY,
                fontFamily: "poppinsRegular",
                fontSize: 11,
              }}
            >
              {product.region}
            </Text>
          </View>
          <View style={styles.priceView}>
            <Text style={styles.productPrice}>
              GH₵{formatPrice(product?.price)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productMain: {
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 10,
    padding: 10,
    gap: 2.5,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    flex: 1,
  },
  productImage: {
    // width: "100%",
    height: 150,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    // padding: 10,
    gap: 10,
  },
  topContent: {
    gap: 5,
  },
  bottomContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: COLORS.TERTIARY,
    gap: 10,
    flex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  productTitle: {
    fontFamily: "poppinsSemiBold",
    // fontSize: 20,
    width: 200,
  },
  productPrice: {
    fontFamily: "poppinsBold",
    color: COLORS.PRIMARY,
    // fontSize: 18,
  },
  AvatarText: {
    color: COLORS.PRIMARY,
    fontSize: 11,
    fontFamily: "poppinsBold",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
  },
  productDesc: {
    fontFamily: "poppinsRegular",
    // fontSize: 16,
  },
  userView: {
    flexDirection: "row",
    // width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
