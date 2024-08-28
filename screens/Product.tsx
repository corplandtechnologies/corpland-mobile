import { useState, useEffect, useContext } from "react";
import {
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import { Avatar, Snackbar } from "react-native-paper";
import { COLORS } from "../utils/color";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Section from "../components/Section";
import ProductCard from "../components/ProductCard";
import { Button } from "react-native-elements";
import PrimaryButton from "../components/ui/PrimaryButton";
import Icon from "react-native-vector-icons/Ionicons";
import { useSearchResults } from "../context/SearchResultsContext";
import {
  deleteProduct,
  dialProduct,
  getProductById,
  getUserById,
  searchProducts,
} from "../api/api";
import ProductItem from "../components/ProductItem";
import { useProduct } from "../context/ProductContext";
import { useUser } from "../context/UserContext";
import ConfirmationModal from "../components/ConfirmationModal";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApp } from "../context/AppContext";
import CartContext from "../context/CartContext";

const Product = ({ route }) => {
  const { user: currentUser } = useApp();
  const navigation: any = useNavigation();
  const { setProductId } = useProduct();
  const { searchResults } = useSearchResults();
  const productId = route.params.productId;
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const productImages = product?.images || product?.image;
  const { addProductToCart }: any = useContext(CartContext);
  const handleBuyNow = () => {
    const productDetails = {
      _id: product._id,
      title: product.title,
      image: product.images[0],
      category: product.category,
      price: product.price,
      quantity: 1,
      sellerId: product.userId,
    };
    addProductToCart(productDetails);
    navigation.navigate("Cart");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setProductId(productId);
  }, [productId]);

  useEffect(() => {
    const getProductInfo = async () => {
      setIsLoading(true);
      try {
        const response = await getProductById(productId);
        setProduct(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };
    getProductInfo();
  }, [productId]);

  useEffect(() => {
    const getuserInfo = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const response = await getUserById(product?.userId);
        setUser(response?.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };
    getuserInfo();
  }, [product?.userId]);

  useEffect(() => {
    const getRelatedProducts = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const response = await searchProducts(product?.category);
        // Filter out the current product based on its ID
        const filteredProducts = response?.data.filter(
          (item) => item._id !== productId
        );
        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };
    getRelatedProducts();
  }, [product]);

  const resetProductState = () => {
    setProduct(null);
    setUser(null);
    setRelatedProducts([]);
  };

  const shareProduct = async () => {
    const productId = route.params.productId;
    const productTitle = product?.title || "this product";
    let shareMessage;

    // Generate a dynamic share link based on the environment
    const baseUrl =
      Platform.OS === "web"
        ? window.location.origin
        : "https://corpland.corplandtechnologies.com";
    const fullShareLink = `${baseUrl}/product/${productId}`;

    // Construct the share message including the first image URL if available
    shareMessage = `Check out ${productTitle}: ${fullShareLink}`;

    if (Platform.OS === "web") {
      // For web, just copy the link to clipboard
      navigator.clipboard.writeText(fullShareLink);
      alert("Link copied to clipboard!");
    } else {
      // For mobile, use the Share API
      Share.share({
        message: shareMessage,
        title: `Check out my ${productTitle}`,
        url: fullShareLink,
      });
    }
  };

  const handleCallNow = async () => {
    const phoneNumber = user?.phoneNumber || ""; // Ensure there's a valid phone number
    // const productTitle = product?.title || "this product";
    // const message = `Hello, I am trying to inquire about your ${productTitle}.`;

    // // Check if WhatsApp is installed
    // const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
    //   message
    // )}`;
    // const canOpen = await Linking.openURL(url);

    // if (canOpen) {
    //   // Open WhatsApp
    //   Linking.openURL(url);
    // } else {
    //   // Fallback to dialer
    //   Linking.openURL(`tel:${phoneNumber}`);
    // }
    Linking.openURL(`tel:${phoneNumber}`);

    try {
      await dialProduct(productId, currentUser?._id);
      setSnackbarMessage("Contact Successful");
      setSnackbarVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteProduct(productId);
      navigation.navigate("MyProducts");
      setSnackbarMessage("Product deleted successfully");
      setSnackbarVisible(true);
    } catch (error) {
      console.log(error);
      setSnackbarMessage(error.response.data);
      setSnackbarVisible(true);
    }
  };

  const renderProductImages = () => {
    const images = product?.images || [];
    return images.map((image: string, index: number) => (
      <View key={index} style={{ width: Dimensions.get("window").width }}>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>
    ));
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ backgroundColor: COLORS.SECONDARY }}>
        <View style={{ height: "100%" }}>
          <View style={{ height: "100%" }}>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  ...styles.backgroundImage,
                }}
              >
                <ActivityIndicator size={50} color={COLORS.PRIMARY} />
              </View>
            ) : (
              <View>
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(
                      event.nativeEvent.contentOffset.x /
                        Dimensions.get("window").width
                    );
                    setCurrentImageIndex(newIndex);
                  }}
                  scrollEventThrottle={16}
                >
                  {renderProductImages()}
                </ScrollView>
                <View style={styles.dotsContainer}>
                  {(productImages || []).map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        currentImageIndex === index ? styles.activeDot : {},
                      ]}
                    />
                  ))}
                </View>
              </View>
            )}
            <View style={styles.slideUp}>
              <View style={{ padding: 10, gap: 10 }}>
                <View style={styles.bar}></View>

                {isLoading ? (
                  <ActivityIndicator size={20} color={COLORS.PRIMARY} />
                ) : (
                  <>
                    <View style={styles.titleView}>
                      <View style={{ flex: 4 }}>
                        <Text style={styles.titleText}>{product?.title}</Text>
                      </View>
                      <View style={styles.actionView}>
                        <TouchableOpacity>
                          <Icon
                            name="share-social"
                            size={30}
                            color={COLORS.PRIMARY}
                            onPress={shareProduct}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Icon
                            name="call"
                            size={30}
                            color={COLORS.PRIMARY}
                            onPress={handleCallNow}
                          />
                        </TouchableOpacity>
                      </View>
                      {product?.userId === currentUser?._id && (
                        <TouchableOpacity onPress={showModal}>
                          <Icon name="trash" size={30} color={"red"} />
                        </TouchableOpacity>
                      )}
                    </View>
                    <View>
                      <Text style={styles.descTitle}>Product Details</Text>
                      <Text style={styles.desc}>{product?.description}</Text>
                    </View>
                    <View>
                      <View style={styles.avatarContainer}>
                        {user?.profilePicture ? (
                          <Avatar.Image
                            size={50}
                            source={{ uri: user.profilePicture }}
                          />
                        ) : (
                          <Avatar.Image
                            size={50}
                            source={require("../assets/user.png")}
                          />
                        )}
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            maxWidth: "90%",
                            gap: 5,
                          }}
                        >
                          <Text style={styles.AvatarText}>{user?.name}</Text>
                          {user?.verified && (
                            <Icon
                              name="checkmark-circle"
                              size={18}
                              color={COLORS.PRIMARY}
                            />
                          )}
                        </View>
                      </View>
                    </View>
                    {relatedProducts.length > 0 && (
                      <View style={styles.bottomContainer}>
                        <View style={styles.priceView}>
                          <Text style={styles.priceText}>
                            GH₵{product?.price}
                          </Text>
                        </View>
                        <View style={styles.CTAView}>
                          {currentUser?._id === product?.userId ? (
                            <>
                              <PrimaryButton
                                value="Edit Product"
                                icon={
                                  <Icon
                                    name="create"
                                    size={24}
                                    color={COLORS.SECONDARY}
                                  />
                                }
                                onPress={() =>
                                  navigation.navigate("EditProduct", {
                                    product: product,
                                  })
                                }
                                isIcon
                              />
                            </>
                          ) : (
                            <>
                              <PrimaryButton
                                value="Buy Now"
                                icon={
                                  <Icon
                                    name="bag"
                                    size={24}
                                    color={COLORS.SECONDARY}
                                  />
                                }
                                onPress={handleBuyNow}
                                isIcon
                              />
                            </>
                          )}
                        </View>
                      </View>
                    )}
                  </>
                )}
                <View>
                  {relatedProducts.length > 0 && (
                    <Section limited headerText="Related Products">
                      <ScrollView showsHorizontalScrollIndicator={false}>
                        {isLoading ? (
                          <ActivityIndicator color={COLORS.PRIMARY} />
                        ) : (
                          <>
                            {relatedProducts?.map((result) => (
                              <ProductItem
                                key={result._id}
                                image={result.images[0]}
                                title={result.title}
                                price={result.price}
                                region={result.region}
                                description={result.description}
                                userDetails={result.userDetails}
                                _id={result._id}
                                onReset={resetProductState}
                              />
                            ))}
                          </>
                        )}
                      </ScrollView>
                    </Section>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <>
        {relatedProducts.length === 0 && (
          <View style={styles.bottomContainer}>
            <View style={styles.priceView}>
              <Text style={styles.priceText}>GH₵{product?.price}</Text>
            </View>
            <View style={styles.CTAView}>
              {currentUser?._id === product?.userId ? (
                <>
                  <PrimaryButton
                    value="Edit Product"
                    icon={
                      <Icon name="create" size={24} color={COLORS.SECONDARY} />
                    }
                    onPress={() =>
                      navigation.navigate("EditProduct", {
                        product: product,
                      })
                    }
                    isIcon
                  />
                </>
              ) : (
                <>
                  <PrimaryButton
                    value="Buy Now"
                    icon={
                      <Icon name="bag" size={24} color={COLORS.SECONDARY} />
                    }
                    onPress={handleBuyNow}
                    isIcon
                  />
                </>
              )}
            </View>
          </View>
        )}
        <ConfirmationModal
          isVisible={isModalVisible}
          onClose={hideModal}
          onConfirm={handleDelete}
          modalTitle="Are you sure you want to delete your product?"
          ConfirmButtonText="Delete"
        />
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          {snackbarMessage}
        </Snackbar>
      </>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    backgroundColor: COLORS.SECONDARY,
  },
  backgroundImage: {
    height: 350,
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  slideUp: {
    backgroundColor: COLORS.SECONDARY,
    borderTopLeftRadius: 30,
    height: "100%",
  },
  bar: {
    height: 5,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 9999,
    width: "20%",
    alignSelf: "center",
  },
  titleText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
    flex: 3,
  },
  descTitle: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
  },
  desc: {
    fontFamily: "PoppinsRegular",
    color: COLORS.GRAY,
  },
  AvatarText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
  },

  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
    width: "100%",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY,
  },

  priceText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
    color: COLORS.PRIMARY,
  },

  priceView: {
    flex: 1,
  },
  CTAView: {
    flex: 2,
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconsView: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },
  productImage: {
    width: "100%",
    height: 350,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.GRAY_LIGHT,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.SECONDARY,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 10, // Adjust this value as needed
    width: "100%",
  },
  actionView: {
    flexDirection: "row",
    gap: 10,
  },
});

export default Product;
