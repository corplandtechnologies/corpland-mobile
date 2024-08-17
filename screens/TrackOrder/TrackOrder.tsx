import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import MainView from "../../components/elements/Views/MainView";
import TextElement from "../../components/elements/Texts/TextElement";
import StepIndicator from "react-native-step-indicator";
import { COLORS } from "../../utils/color";
import Icon from "react-native-vector-icons/Ionicons";
import Card from "../../components/ui/Card";
import BottomActionCard from "../../components/BottomActionCard";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { handleError } from "../../utils";
import { useApp } from "../../context/AppContext";
import { getProductById, updateOrderStatus } from "../../api/api";
import { ActivityIndicator } from "react-native";
import AnimatedView from "../../components/animated/AnimatedView";
import moment from "moment";
import SnackBar from "../../components/ui/SnackBar";

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: COLORS.COMPLIMENTARY,
  separatorFinishedColor: COLORS.COMPLIMENTARY,
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: COLORS.COMPLIMENTARY,
  stepIndicatorUnFinishedColor: "#aaaaaa",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: "#000000",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
  labelColor: "#666666",
  labelSize: 15,
  currentStepLabelColor: "#fe7013",
};

const TrackOrder = () => {
  const navigation: any = useNavigation();
  const { params }: any = useRoute();
  const currentOrder = params?.order;

  const {
    user,
    loading,
    setLoading,
    setSnackbarMessage,
    snackbarMessage,
    setSnackbarVisible,
    snackbarVisible,
  } = useApp();

  const [orderStatus, setOrderStatus] = useState("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [product, setProduct] = useState<any>({});
  const [productLoading, setProductLoading] = useState<boolean>(false);
  const [deliveredLoading, setDeliveredLoading] = useState<boolean>(false);

  const formatTimestamp = (timestamp: any) => {
    return moment(timestamp).format("DD MMM, YYYY, h:mm A");
  };

  const stepTitles = {
    data: [
      {
        title: "Order Placed",
        time: formatTimestamp(currentOrder?.statusTimestamps?.orderPlaced),
      },
      {
        title: "In Progress",
        time: formatTimestamp(currentOrder?.statusTimestamps?.inProgress),
      },
      {
        title: "Delivered",
        time: formatTimestamp(currentOrder?.statusTimestamps?.delivered),
      },
      {
        title: "Completed",
        time: formatTimestamp(currentOrder?.statusTtimestamps?.completed),
      },
    ],
  };

  const fetchProduct = async (
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoadingState(true);
    try {
      const { data } = await getProductById(currentOrder?.productId);
      console.log(data);
      setProduct(data);

      setLoadingState(false);
    } catch (error: any) {
      console.log(error);
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
      setLoadingState(false);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetchProduct(setProductLoading);
  }, [currentOrder?.productId]);

  useEffect(() => {
    if (currentOrder?.status === 0) {
      setOrderStatus("Order Placed");
      setCurrentStep(1);
    } else if (currentOrder?.status === 1) {
      setOrderStatus("In Progress");
      setCurrentStep(2);
    } else if (currentOrder?.status === 2) {
      setOrderStatus("Delivered");
      setCurrentStep(3);
    } else if (currentOrder?.status === 3) {
      setOrderStatus("Completed");
      setCurrentStep(4);
    }
  }, [currentOrder?.status]);

  const handleOrderStatus = async (
    status: number,
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoadingState(true);
    try {
      const res = await updateOrderStatus(currentOrder?._id, status);
      setSnackbarMessage("Order accepted successfully!");
      setSnackbarVisible(true);
      setLoadingState(false);
      navigation.navigate("Active");
    } catch (error: any) {
      console.log(error);
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
      setLoadingState(false);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <MainView padding={10} style={{ justifyContent: "space-between" }}>
      <ScrollView>
        <View style={styles.orderInfo}>
          <TextElement fontSize={16}>
            Order #{currentOrder?.transactionId}
          </TextElement>
        </View>

        <View style={styles.container}>
          <View style={styles.stepIndicator}>
            <StepIndicator
              customStyles={stepIndicatorStyles}
              stepCount={stepTitles.data.length}
              direction="vertical"
              currentPosition={currentStep}
              labels={stepTitles.data.map((item) => (
                <View>
                  <TextElement>{item.title}</TextElement>
                  <TextElement color={COLORS.GRAY} fontFamily="InterMedium">
                    {item.time}
                  </TextElement>
                </View>
              ))}
            />
          </View>
          <View>
            <View style={styles.stepIconsView}>
              <Icon
                name={currentStep === 1 ? "clipboard" : "clipboard-outline"}
                size={24}
                color={COLORS.COMPLIMENTARY}
              />
            </View>
            <View style={styles.stepIconsView}>
              <Icon
                name={currentStep === 2 ? "cube" : "cube-outline"}
                size={24}
                color={COLORS.COMPLIMENTARY}
              />
            </View>
            <View style={styles.stepIconsView}>
              <Icon
                name={currentStep === 3 ? "cart" : "cart-outline"}
                size={24}
                color={COLORS.COMPLIMENTARY}
              />
            </View>
            <View style={styles.stepIconsView}>
              <Icon
                name={currentStep === 4 ? "checkbox" : "checkbox-outline"}
                size={24}
                color={COLORS.COMPLIMENTARY}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            gap: 10,
          }}
        >
          <View>
            <TextElement fontSize={18}>Product</TextElement>
          </View>
          <View>
            {productLoading ? (
              <ActivityIndicator color={COLORS.PRIMARY} size={30} />
            ) : (
              <AnimatedView>
                <Card style={styles.wrapper}>
                  <View style={{ flex: 1 }}>
                    <Image
                      source={{ uri: product?.images?.[0] ?? "" }}
                      style={styles.productImage}
                    />
                  </View>
                  <View style={styles.detailsView}>
                    <Text style={styles.title}>{product?.title}</Text>
                    <Text style={styles.cat}>
                      {product?.category} | Qty: 0{currentOrder?.quantity} pcs
                    </Text>
                    <Text style={styles.price}>
                      GH₵{product?.price?.toFixed(2)}
                    </Text>
                  </View>
                </Card>
              </AnimatedView>
            )}
          </View>
        </View>
      </ScrollView>
      {currentOrder?.sellerId === user?._id ? (
        <View>
          <BottomActionCard>
            <PrimaryButton
              value={
                currentOrder?.status === 2 ? "Delivered" : "Mark as delivered"
              }
              onPress={() => handleOrderStatus(2, setDeliveredLoading)}
              loading={deliveredLoading}
              disabled={currentOrder?.status === 2}
            />
          </BottomActionCard>
        </View>
      ) : (
        <View>
          <BottomActionCard>
            <PrimaryButton
              value="Go Home"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          </BottomActionCard>
        </View>
      )}
      <SnackBar
        setSnackbarVisible={setSnackbarVisible}
        snackbarVisible={snackbarVisible}
        snackbarMessage={snackbarMessage}
      />
    </MainView>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
  orderInfo: {},
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepIndicator: {
    // marginVertical: 50,
    // paddingHorizontal: 20,
  },
  stepLabelView: {},
  stepIconsView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  wrapper: {
    flexDirection: "row",
    backgroundColor: COLORS.SECONDARY,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    objectFit: "cover",
  },
  detailsView: {
    justifyContent: "center",
    flex: 2,
    gap: 20,
  },
  priceQView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontFamily: "InterBold",
    fontSize: 16,
  },
  cat: {
    color: COLORS.GRAY,
  },
  price: {
    fontFamily: "InterExtraBold",
    color: COLORS.COMPLIMENTARY,
  },
});
