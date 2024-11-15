import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Order from "./components/Order";
import MainView from "../../components/elements/Views/MainView";
import { COLORS } from "../../utils/color";
import { useCallback, useEffect, useState } from "react";
import { handleError } from "../../utils";
import { useApp } from "../../context/AppContext";
import SnackBar from "../../components/ui/SnackBar";
import { getUserOrders } from "../../api/api";
import { orders } from "../../data/default";
import TextElement from "../../components/elements/Texts/TextElement";
import { useFocusEffect } from "@react-navigation/native";

const Completed = () => {
  const {
    snackbarVisible,
    setSnackbarVisible,
    setSnackbarMessage,
    snackbarMessage,
    loading,
    setLoading,
    user,
    refreshing,
    setRefreshing,
  }: any = useApp();
  const [orders, setOrders] = useState([]);
  const filteredOrders = orders?.filter((order: any) => order.status === 3);

  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await getUserOrders(user?._id);
      setOrders(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, [])
  );
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            try {
              getOrders();
              setRefreshing(false);
            } catch (error) {
              setRefreshing(false);
            }
          }}
        />
      }
      contentContainerStyle={{
        marginBottom: 100,
        height: "100%",
      }}
    >
      <MainView>
        {loading ? (
          <MainView style={styles.loadingView}>
            <ActivityIndicator color={COLORS.PRIMARY} size={30} />
          </MainView>
        ) : (
          <>
            {filteredOrders?.length > 0 ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                {filteredOrders?.map((filteredOrder: any) => (
                  <Order
                    orders={filteredOrder}
                    key={filteredOrder?._id}
                    getOrders={getOrders}
                  />
                ))}
              </ScrollView>
            ) : (
              <MainView style={styles.loadingView}>
                <TextElement fontSize={20} textAlign="center">
                  Oh! Looks like you have no completed orders yet.
                </TextElement>
              </MainView>
            )}
          </>
        )}
      </MainView>
      <SnackBar
        setSnackbarVisible={setSnackbarVisible}
        snackbarVisible={snackbarVisible}
        snackbarMessage={snackbarMessage}
      />
    </ScrollView>
  );
};

export default Completed;

const styles = StyleSheet.create({
  loadingView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
