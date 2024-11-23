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
import Section from "../components/features/Section";
import RequestCard from "../components/features/RequestCard";
import { Button } from "react-native-elements";
import PrimaryButton from "../components/common/Button/PrimaryButton";
import Icon from "react-native-vector-icons/Ionicons";
import { useSearchResults } from "../context/SearchResultsContext";
import {
  deleteRequest,
  dialRequest,
  getRequestById,
  getUserById,
  searchRequests,
} from "../api/api";
import ConfirmationModal from "../components/features/ConfirmationModal";
import { Platform } from "react-native";
import { useApp } from "../context/AppContext";
import CartContext from "../context/CartContext";
import AuthModal from "../components/auth/AuthModal";
import MainView from "../components/elements/Views/MainView";
import { formatPrice } from "../utils";

const Request = ({ route }) => {
  const { user: currentUser, setRequestId } = useApp();
  const navigation: any = useNavigation();
  const { searchResults } = useSearchResults();
  const requestId = route.params.requestId;
  const [request, setRequest] = useState(null);
  const [user, setUser] = useState(null);
  const [relatedRequests, setRelatedRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const requestImages = request?.images || request?.image;
  const [modalVisible, setModalVisible] = useState(false);

  const handleBuyNow = () => {
    const requestDetails = {
      _id: request._id,
      title: request.title,
      image: request.images[0],
      category: request.category,
      price: request.price,
      quantity: 1,
      sellerId: request.userId,
    };
    addRequestToCart(requestDetails);
    navigation.navigate("Cart");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setRequestId(requestId);
  }, [requestId]);

  useEffect(() => {
    const getRequestInfo = async () => {
      setIsLoading(true);
      try {
        const response = await getRequestById(requestId);
        setRequest(response?.data);
      } catch (error) {
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };
    getRequestInfo();
  }, [requestId]);

  useEffect(() => {
    const getuserInfo = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const response = await getUserById(request?.userId);
        setUser(response?.data.user);
      } catch (error) {
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };
    getuserInfo();
  }, [request?.userId]);

  useEffect(() => {
    const getRelatedRequests = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const response = await searchRequests(request?.category);
        // Filter out the current request based on its ID
        const filteredRequests = response?.data.filter(
          (item) => item._id !== requestId
        );
        setRelatedRequests(filteredRequests);
      } catch (error) {
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };
    getRelatedRequests();
  }, [request]);

  const resetRequestState = () => {
    setRequest(null);
    setUser(null);
    setRelatedRequests([]);
  };

  const shareRequest = async () => {
    const requestId = route.params.requestId;
    const requestTitle = request?.title || "this request";
    let shareMessage;

    // Generate a dynamic share link based on the environment
    const baseUrl =
      Platform.OS === "web"
        ? window.location.origin
        : "https://corpland.corplandtechnologies.com";
    const fullShareLink = `${baseUrl}/request/${requestId}`;

    // Construct the share message including the first image URL if available
    shareMessage = `Check out ${requestTitle}: ${fullShareLink}`;

    if (Platform.OS === "web") {
      // For web, just copy the link to clipboard
      navigator.clipboard.writeText(fullShareLink);
      alert("Link copied to clipboard!");
    } else {
      // For mobile, use the Share API
      Share.share({
        message: shareMessage,
        title: `Check out my ${requestTitle}`,
        url: fullShareLink,
      });
    }
  };

  const handleCallNow = async () => {
    const phoneNumber = user?.phoneNumber || ""; // Ensure there's a valid phone number
    // const requestTitle = request?.title || "this request";
    // const message = `Hello, I am trying to inquire about your ${requestTitle}.`;

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
      await dialRequest(requestId, currentUser?._id);
      setSnackbarMessage("Contact Successful");
      setSnackbarVisible(true);
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      const response = await deleteRequest(requestId);
      navigation.navigate("MyRequests");
      setSnackbarMessage("Request deleted successfully");
      setSnackbarVisible(true);
    } catch (error) {
      setSnackbarMessage(error.response.data);
      setSnackbarVisible(true);
    }
  };

  const renderRequestImages = () => {
    const images = request?.images || [];
    return images.map((image: string, index: number) => (
      <View key={index} style={{ width: Dimensions.get("window").width }}>
        <Image source={{ uri: image }} style={styles.requestImage} />
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
                  {renderRequestImages()}
                </ScrollView>
                <View style={styles.dotsContainer}>
                  {(requestImages || []).map((_, index) => (
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
                        <Text style={styles.titleText}>{request?.title}</Text>
                      </View>
                      <View style={styles.actionView}>
                        <TouchableOpacity>
                          <Icon
                            name="share-outline"
                            size={24}
                            color={COLORS.GRAY}
                            onPress={shareRequest}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Icon
                            name="call-outline"
                            size={24}
                            color={COLORS.GRAY}
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
                      {request?.userId === currentUser?._id && (
                        <TouchableOpacity onPress={showModal}>
                          <Icon name="trash" size={24} color={"red"} />
                        </TouchableOpacity>
                      )}
                    </View>
                    <View>
                      <Text style={styles.descTitle}>Request Details</Text>
                      <Text style={styles.desc}>{request?.description}</Text>
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
                            source={{
                              uri: "https://ik.imagekit.io/4hxqb9ldw/user.png?updatedAt=1725434780558",
                            }}
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
                    <View style={styles.bottomContainer}>
                      <View style={styles.priceView}>
                        <Text style={styles.priceText}>
                          GH₵{formatPrice(request?.minPrice)} - GH₵
                          {formatPrice(request?.maxPrice)}
                        </Text>
                      </View>
                      <View style={styles.CTAView}>
                        {currentUser?._id === request?.userId ? (
                          <>
                            <PrimaryButton
                              value="Edit"
                              icon={
                                <Icon
                                  name="create-outline"
                                  size={24}
                                  color={COLORS.SECONDARY}
                                />
                              }
                              onPress={() =>
                                navigation.navigate("EditRequest", {
                                  request: request,
                                })
                              }
                              isIcon
                            />
                          </>
                        ) : (
                          <>
                            <>
                              <PrimaryButton
                                value="Call"
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
                            </>
                          </>
                        )}
                      </View>
                    </View>
                  </>
                )}
                <View>
                  {relatedRequests.length > 0 && (
                    <Section limited headerText="Related Requests">
                      <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 10 }}
                      >
                        {isLoading ? (
                          <ActivityIndicator color={COLORS.PRIMARY} />
                        ) : (
                          <>
                            {relatedRequests?.map((result) => (
                              <RequestCard
                                key={result._id}
                                request={result}
                                onReset={resetRequestState}
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
          modalTitle="Are you sure you want to delete your request?"
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
    flex: 2,
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
  requestImage: {
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

export default Request;
