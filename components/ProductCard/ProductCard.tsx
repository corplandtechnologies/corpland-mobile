import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Image } from "expo-image";
import TextElement from "../elements/Texts/TextElement";
import { Icon } from "react-native-elements";
import { COLORS } from "../../utils/color";
import { blurhash, formatPrice, textTruncate } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import FavoriteIcon from "../ui/FavoriteIcon";

interface productCardProps {
  product: {
    _id: string;
    thumbnail?: string;
    images: string;
    title: string;
    price: string;
  };
  onReset?: () => void;
}
const ProductCard: FC<productCardProps> = ({ product, onReset }) => {
  const navigation: any = useNavigation();
  const productNavigate = () => {
    if (onReset) {
      onReset();
    }
    navigation.navigate("Product", { productId: product._id });
  };
  return (
    <TouchableOpacity style={styles.main} onPress={productNavigate}>
      <View
        style={{
          flex: 2,
          padding: product.thumbnail ? 10 : 0,
          backgroundColor: COLORS.GRAY_LIGHT,
          borderRadius: 10,
        }}
      >
        {product.thumbnail ? (
          <>
            <View style={styles.heartView}>
              <FavoriteIcon productId={product._id} size={25} />
            </View>
            <View style={styles.productPreviewImageView}>
              <Image
                source={product.thumbnail}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                placeholder={blurhash}
              />
            </View>
          </>
        ) : (
          <View style={styles.productImageView}>
            <Image
              source={product.images[0]}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
              }}
              placeholder={blurhash}
            />
          </View>
        )}
      </View>
      <View style={styles.detailsView}>
        <TextElement fontFamily="PoppinsMedium">
          {textTruncate(product.title)}
        </TextElement>
        <TextElement>GH₵ {formatPrice(product.price)}.00</TextElement>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  main: {
    // borderWidth: 1,
    width: "45%",
  },
  imageView: {
    flex: 2,
    // padding: 10,
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 10,
  },
  heartView: {
    alignItems: "flex-end",
    flex: 1,
  },
  productPreviewImageView: {
    flex: 3,
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
  },
  productImageView: {
    flex: 3,
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  detailsView: {
    flex: 1,
  },
});
