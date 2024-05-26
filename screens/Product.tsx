import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
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

const Product = ({ route }) => {
  const navigation = useNavigation();
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
  const { user: currentUser } = useUser();

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
        setRelatedProducts(response?.data);
      } catch (error) {
        console.log(error);
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

  const handleCallNow = async () => {
    const phoneNumber = user?.phoneNumber || ""; // Ensure there's a valid phone number
    if (!phoneNumber) {
      console.error("Phone number not found");
      setSnackbarMessage("Phone number not found");
      setSnackbarVisible(true);
      return;
    }
   
    Linking.canOpenURL(`tel:${phoneNumber}`)
      .then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${phoneNumber}`);
          setSnackbarMessage(`Can't handle url: ${phoneNumber}`);
          setSnackbarVisible(true);
        } else {
          return Linking.openURL(`tel:${phoneNumber}`);
        }
      })
      .catch((err) => console.error("An error occurred", err));
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
      console.log(response.data);
      navigation.navigate("MyProducts");
      setSnackbarMessage("Product deleted successfully");
      setSnackbarVisible(true);
    } catch (error) {
      console.log(error);
      setSnackbarMessage(error.response.data);
      setSnackbarVisible(true);
    }
  };
  return (
    <>
      <ScrollView>
        <View style={{ height: "100%" }}>
          <View style={{ height: "100%" }}>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  ...styles.backgroundImage,
                }}>
                <ActivityIndicator
                  size={50}
                  color={COLORS.PRIMARY}
                />
              </View>
            ) : (
              <Image
                source={{ uri: product?.image }} // Replace with your image path
                style={styles.backgroundImage}
              />
            )}

            <View style={styles.slideUp}>
              <View style={{ padding: 10, gap: 10 }}>
                <View style={styles.bar}></View>

                {isLoading ? (
                  <ActivityIndicator
                    size={20}
                    color={COLORS.PRIMARY}
                  />
                ) : (
                  <>
                    <View style={styles.titleView}>
                      <View>
                        <Text style={styles.titleText}>{product?.title}</Text>
                      </View>
                      {product?.userId === currentUser?._id && (
                        <View style={styles.iconsView}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("EditProduct", {
                                product: product,
                              })
                            }>
                            <Icon
                              name="create-outline"
                              size={30}
                              color={COLORS.COMPLIMENTARY}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={showModal}>
                            <Icon
                              name="trash"
                              size={30}
                              color={"red"}
                            />
                          </TouchableOpacity>
                        </View>
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
                        <View>
                          <Text style={styles.AvatarText}>{user?.name}</Text>
                        </View>
                      </View>
                    </View>
                  </>
                )}
                <View>
                  <Section headerText="Related Products">
                    <ScrollView showsHorizontalScrollIndicator={false}>
                      {isLoading ? (
                        <ActivityIndicator
                          size={50}
                          color={COLORS.PRIMARY}
                        />
                      ) : (
                        <>
                          {relatedProducts?.map((result) => (
                            <ProductItem
                              key={result._id}
                              image={result.image}
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
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.priceView}>
          <Text style={styles.priceText}>GHC{product?.price}</Text>
        </View>
        <View style={styles.CTAView}>
          <PrimaryButton
            value="Call Now"
            icon={
              <Icon
                name="call-outline"
                size={24}
                color={COLORS.SECONDARY}
              />
            }
            onPress={handleCallNow}
            isIcon
          />
        </View>
      </View>
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
        duration={Snackbar.DURATION_SHORT}>
        {snackbarMessage}
      </Snackbar>
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
    fontFamily: "InterBold",
    fontSize: 18,
  },
  descTitle: {
    fontFamily: "InterBold",
    fontSize: 18,
  },
  desc: {
    fontFamily: "InterRegular",
    color: COLORS.GRAY,
  },
  AvatarText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontFamily: "InterBold",
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
    fontFamily: "InterBold",
    fontSize: 18,
    color: COLORS.COMPLIMENTARY,
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
  },
});

export default Product;
