import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../utils/color";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { getUserById } from "../api/api";
import ProductStats from "./ProductStats";

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
  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          const res = await getUserById(product.userId);
          setUserInfo(res.data.user);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }, [])
  );
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
    <TouchableOpacity
      style={styles.productMain}
      onPress={productNavigate}>
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
      />

      <View style={styles.contentContainer}>
        <View style={styles.topContent}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <ProductStats
            icon={"call"}
            value={product.dials.length}
            name="Dials"
          />
          <View style={styles.userView}>
            <View style={styles.avatarContainer}>
              {userInfo.profilePicture ? (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: userInfo.profilePicture,
                  }}
                />
              ) : (
                <Avatar.Image
                  size={20}
                  source={require("../assets/user.png")}
                />
              )}
              <View>
                <Text style={styles.AvatarText}>{userInfo.name}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.productDesc}>{truncatedDesc}</Text>
        </View>

        <View style={styles.bottomContent}>
          <View style={styles.locationContainer}>
            <Icon
              name="location"
              size={20}
              color={COLORS.GRAY}
            />
            <Text style={{ color: COLORS.GRAY, fontFamily: "InterRegular" }}>
              {product.region}
            </Text>
          </View>
          <Text style={styles.productPrice}>GHC{product.price}</Text>
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 250,
    marginRight: 10,
    marginBottom: 20,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    objectFit: "cover",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  topContent: {
    flex: 1,
  },
  bottomContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: COLORS.TERTIARY,
    paddingTop: 10,
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 14,
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
});
