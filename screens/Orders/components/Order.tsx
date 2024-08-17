import { StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import { COLORS } from "../../../utils/color";
import RowView from "../../../components/elements/Views/RowView";
import PrimaryText from "../../../components/elements/Texts/TextElement";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useApp } from "../../../context/AppContext";
import { handleError } from "../../../utils";
import { getProductById, updateOrderStatus } from "../../../api/api";
import Hr from "../../../components/elements/HR/Hr";
import { useCart } from "../../../context/CartContext";

interface orderProps {
  orders: {
    transactionId: string;
    createdAt: string;
    total: number;
    badgeColor: string;
    status: number;
    sellerId: string;
    buyerId: string;
    productId: string;
    _id: string;
  };
  getOrders: () => void;
}
const Order: FC<orderProps> = ({ orders, getOrders }) => {
  const navigation: any = useNavigation();
  const [orderStatus, setOrderStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [declineLoading, setDeclineLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [reOrderLoading, setReOrderLoading] = useState(false);
  const { addProductToCart }: any = useCart();
  const [reviseLoading, setReviseLoading] = useState<boolean>(false);
  // const [product, setProduct] = useState<object>({});
  const {
    user,
    loading,
    setLoading,
    setSnackbarMessage,
    snackbarMessage,
    setSnackbarVisible,
    snackbarVisible,
    eventLoading,
    setEventLoading,
  } = useApp();

  useEffect(() => {
    if (orders.status === 0) {
      setOrderStatus("Order Placed");
      setStatusColor(COLORS.ORDERPLACEDBADGE);
    } else if (orders.status === 1) {
      setOrderStatus("In Progress");
      setStatusColor(COLORS.INPROGRESSBADGE);
    } else if (orders.status === 2) {
      setOrderStatus("Delivered");
      setStatusColor(COLORS.DELIVEREDBADGE);
    } else if (orders.status === 3) {
      setOrderStatus("Completed");
      setStatusColor(COLORS.COMPLETEDBADGE);
    } else {
      setOrderStatus("Cancelled");
      setStatusColor(COLORS.CANCELLEDBADGE);
    }
  }, [orders.status]);

  const handleOrderStatus = async (
    status: number,
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoadingState(true);
    try {
      await updateOrderStatus(
        orders?._id,
        status,
        orders?.sellerId,
        orders?.buyerId
      );
      setSnackbarMessage("Order Status updated successfully!");
      setSnackbarVisible(true);
      setLoadingState(false);
      if (getOrders) {
        getOrders();
      }
    } catch (error: any) {
      console.log(error);
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
      setLoadingState(false);
    } finally {
      setLoadingState(false);
    }
  };

  const handleReOrder = async (
    productId: string,
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoadingState(true);
    try {
      const { data: product } = await getProductById(productId);
      // setProduct(response?.data);
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

  return (
    <Card style={styles.main}>
      <View>
        <Badge isOrder bgColor={statusColor} text={orderStatus} />
      </View>
      <RowView style={styles.transactionInfo}>
        <View>
          <PrimaryText color={COLORS.GRAY} fontFamily="InterBold">
            Transaction ID
          </PrimaryText>
          <PrimaryText>#{orders.transactionId}</PrimaryText>
        </View>
        <View>
          <PrimaryText
            color={COLORS.GRAY}
            fontFamily="InterBold"
            textAlign="center"
          >
            Order Date
          </PrimaryText>
          <PrimaryText textAlign="center">
            {moment(orders.createdAt).format("DD MMM, YYYY")}
          </PrimaryText>
        </View>
        <View>
          <PrimaryText color={COLORS.GRAY} fontFamily="InterBold">
            Total Payment
          </PrimaryText>
          <PrimaryText textAlign="center">
            GH₵{orders.total.toFixed(2)}
          </PrimaryText>
        </View>
      </RowView>
      <Hr />
      {orders.status === 3 || orders.status === 4 ? (
        <>
          {orders.sellerId === user?._id ? (
            <></>
          ) : (
            <>
              <PrimaryButton
                style={styles.actionButton}
                value={"Re-Order"}
                onPress={() => {
                  handleReOrder(orders.productId, setReOrderLoading);
                }}
                loading={reOrderLoading}
              />
            </>
          )}
        </>
      ) : (
        <>
          {orders.status === 0 && orders?.sellerId === user?._id ? (
            <RowView style={styles.actionView}>
              <View style={{ flex: 1 }}>
                <PrimaryButton
                  style={styles.actionButton}
                  secondary
                  value={"Decline"}
                  onPress={() => handleOrderStatus(4, setDeclineLoading)}
                  loading={declineLoading}
                />
              </View>
              <View style={{ flex: 1 }}>
                <PrimaryButton
                  style={styles.actionButton}
                  value={"Accept"}
                  onPress={() => handleOrderStatus(1, setAcceptLoading)}
                  loading={acceptLoading}
                />
              </View>
            </RowView>
          ) : (
            <>
              {orders.status === 2 && orders.buyerId === user?._id ? (
                <>
                  <RowView style={styles.actionView}>
                    <View style={{ flex: 1 }}>
                      <PrimaryButton
                        style={styles.actionButton}
                        secondary
                        value={"Revise"}
                        onPress={() => handleOrderStatus(1, setReviseLoading)}
                        loading={reviseLoading}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <PrimaryButton
                        style={styles.actionButton}
                        value={"Accept"}
                        onPress={() => handleOrderStatus(3, setAcceptLoading)}
                        loading={acceptLoading}
                      />
                    </View>
                  </RowView>
                </>
              ) : (
                <>
                  <RowView style={styles.actionView}>
                    <View style={{ flex: 1 }}>
                      <PrimaryButton
                        style={styles.actionButton}
                        secondary
                        value={"Cancel"}
                        onPress={() => handleOrderStatus(4, setCancelLoading)}
                        loading={cancelLoading}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <PrimaryButton
                        style={styles.actionButton}
                        value={"Track Order"}
                        onPress={() =>
                          navigation.navigate("TrackOrder", { order: orders })
                        }
                      />
                    </View>
                  </RowView>
                </>
              )}
            </>
          )}
        </>
      )}
    </Card>
  );
};

export default Order;

const styles = StyleSheet.create({
  transactionInfo: {
    justifyContent: "space-between",
    gap: 10,
  },
  main: {
    margin: 10,
    padding: 20,
    gap: 20,
  },
  actionView: {
    gap: 10,
  },
  actionButton: {
    width: "100%",
  },
});
