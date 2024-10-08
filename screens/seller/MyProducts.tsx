import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../../utils/color";
import UserHeader from "../../components/UserHeader";
import ProductItem from "../../components/ProductItem";
import { getUserById, getUserProductsById } from "../../api/api";
import { useUser } from "../../context/UserContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatPrice } from "../../utils";

const MyProducts = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const navigation = useNavigation(); // Initialize navigation

  useFocusEffect(
    useCallback(() => {
      const getUserProducts = async () => {
        setIsLoading(true); // Set loading to true before fetching data
        try {
          const userInfo = await AsyncStorage.getItem("user");
          const parsedUserInfo = JSON.parse(userInfo || "{}");
          const response = await getUserProductsById(parsedUserInfo?._id);
          setUserProducts(response?.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false); // Set loading to false after fetching data
        }
      };

      getUserProducts();
    }, [])
  );

  return (
    <View style={styles.main}>
      {isLoading ? (
        <ActivityIndicator size={50} color={COLORS.PRIMARY} />
      ) : userProducts.length === 0 ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.noProductsText}>
            You don't have any listed Products,
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TabNavigator", { screen: "Add" })
            }
          >
            <Text style={styles.tapHereText}>Tap Here to Make one</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ gap: 10 }}>
          {userProducts?.map((result, index) => (
            <ProductItem
              key={result._id}
              image={result?.images[0]}
              title={result.title}
              price={formatPrice(result.price)}
              region={result.region}
              description={result.description}
              userDetails={result.userDetails}
              images={result.images}
              _id={result._id}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default MyProducts;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.SECONDARY,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noProductsText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  tapHereText: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    textDecorationLine: "underline",
  },
});
