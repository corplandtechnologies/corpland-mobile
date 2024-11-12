import { useState, useEffect, useContext } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import { Image } from "expo-image";
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
import AuthModal from "../components/auth/AuthModal";
import MainView from "../components/elements/Views/MainView";
import { blurhash, formatPrice, textTruncate } from "../utils";
import PopUpCard from "../components/PopUpCard";
import TextElement from "../components/elements/Texts/TextElement";

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
  const [isProceedModalVisible, setIsProceedModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const productImages = product?.images || product?.image;
  const { addProductToCart }: any = useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

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
        : "https://corplandbackend.onrender.com/api/v1";
    const fullShareLink = `${baseUrl}/products/product/${productId}`;

    // Construct the share message including the first image URL if available
    shareMessage = `Don't get scammed. Use Corpland to securely get our ${productTitle} for just GH₵${formatPrice(
      product?.price
    )} today! : ${fullShareLink}`;

    if (Platform.OS === "web") {
      // For web, just copy the link to clipboard
      navigator.clipboard.writeText(fullShareLink);
      alert("Link copied to clipboard!");
    } else {
      // For mobile, use the Share API
      Share.share({
        message: shareMessage,
        title: `Don't get scammed. Use Corpland to securely get our ${productTitle} for just GH₵${formatPrice(
          product?.price
        )} today! `,
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
        <Image
          source={image}
          placeholder={{ blurhash }}
          transition={1000}
          style={styles.productImage}
        />
      </View>
    ));
  };

  return (
    <MainView>
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
                <ActivityIndicator size={24} color={COLORS.PRIMARY} />
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
              <View style={{ gap: 10 }}>
                {/* <View style={styles.bar}></View> */}

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
                            name="share-outline"
                            size={24}
                            color={COLORS.GRAY}
                            onPress={shareProduct}
                          />
                        </TouchableOpacity>
                      </View>

                      {product?.userId === currentUser?._id && (
                        <TouchableOpacity onPress={showModal}>
                          <Icon name="trash" size={24} color={"red"} />
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View>
                        <View style={{ marginBottom: -10 }}>
                          <TextElement fontSize={14}>Seller</TextElement>
                        </View>
                        <View>
                          <View style={styles.avatarContainer}>
                            <Avatar.Image
                              size={50}
                              source={{
                                uri:
                                  user?.profilePicture ||
                                  "https://ik.imagekit.io/4hxqb9ldw/user.png?updatedAt=1725434780558",
                              }}
                            />

                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                maxWidth: "90%",
                                gap: 5,
                              }}
                            >
                              <View>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    gap: 10,
                                  }}
                                >
                                  <Text style={styles.AvatarText}>
                                    {user?.name}
                                  </Text>
                                  {user?.verified && (
                                    <Icon
                                      name="checkmark-circle"
                                      size={18}
                                      color={COLORS.PRIMARY}
                                    />
                                  )}
                                </View>
                                <TextElement
                                  fontFamily="PoppinsMedium"
                                  color={COLORS.GRAY}
                                  fontSize={14}
                                >
                                  Manager
                                </TextElement>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,

                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <TouchableOpacity style={styles.actionButtonView}>
                          <Icon
                            name="call"
                            size={20}
                            color={COLORS.PRIMARY}
                            onPress={() => {
                              if (!currentUser) {
                                setModalVisible(true);
                              } else {
                                handleCallNow();
                              }
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ gap: 10 }}>
                      <Text style={styles.descTitle}>Product Details</Text>
                      <Text style={styles.desc}>
                        {showFullDescription
                          ? product?.description
                          : product?.description.slice(0, 100)}
                        {/* Display first 100 characters */}
                        {product?.description.length > 100 && (
                          <Text
                            onPress={toggleDescription}
                            style={styles.readMoreText}
                          >
                            {showFullDescription
                              ? " Show less"
                              : " ...Read more"}
                          </Text>
                        )}
                      </Text>
                    </View>

                    <View style={styles.bottomContainer}>
                      <View style={styles.priceView}>
                        <Text style={styles.priceText}>
                          GH₵{formatPrice(product?.price)}
                        </Text>
                      </View>
                      <View style={styles.CTAView}>
                        {currentUser?._id === product?.userId ? (
                          <>
                            <PrimaryButton
                              value="Edit Product"
                              icon={
                                <Icon
                                  name="create-outline"
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
                              value="Proceed"
                              icon={
                                <Icon
                                  name="chevron-down-circle-outline"
                                  size={20}
                                  color={COLORS.SECONDARY}
                                />
                              }
                              onPress={() => {
                                if (!currentUser) {
                                  setModalVisible(true);
                                } else {
                                  handleBuyNow();
                                }
                              }}
                              isIcon
                            />
                          </>
                        )}
                      </View>
                    </View>
                  </>
                )}
                <View>
                  {relatedProducts.length > 0 && (
                    <Section limited headerText="Related Products">
                      <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 10 }}
                      >
                        {isLoading ? (
                          <ActivityIndicator color={COLORS.PRIMARY} />
                        ) : (
                          <>
                            {relatedProducts?.map((result) => (
                              <ProductItem
                                key={result._id}
                                image={result.images[0]}
                                title={textTruncate(result.title)}
                                price={formatPrice(result.price)}
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
        <AuthModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
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
    </MainView>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    flex: 3,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY,
    gap: 5,
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
    flex: 1,
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
  readMoreText: {
    textDecorationLine: "underline",
    color: COLORS.PRIMARY,
    fontFamily: "PoppinsSemiBold",
  },
  actionButtonView: {
    backgroundColor: COLORS.GRAY_LIGHT,
    padding: 10,
    borderRadius: 999,
  },
});

export default Product;
