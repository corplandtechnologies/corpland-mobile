import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { FC } from "react";
import TextElement from "../elements/Texts/TextElement";
import { Icon } from "react-native-elements";
import { COLORS } from "../../utils/color";
import { formatPrice, textTruncate } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import FavoriteIcon from "../ui/FavoriteIcon";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
  const [loading, setLoading] = React.useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

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
              {loading && (
                <SkeletonPlaceholder>
                  <View
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                </SkeletonPlaceholder>
              )}
              <Image
                src={product.thumbnail}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                onLoad={handleImageLoad}
              />
            </View>
          </>
        ) : (
          <View style={styles.productImageView}>
            {loading && (
              <SkeletonPlaceholder>
                <View
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                />
              </SkeletonPlaceholder>
            )}
            <Image
              src={product.images[0]}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
              }}
              onLoad={handleImageLoad}
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
