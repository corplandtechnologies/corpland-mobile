import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../../utils/color";
import UserHeader from "../../components/UserHeader";
import ProductItem from "../../components/ProductItem";
import { getUserById, getUserProductsById } from "../../api/api";
import { useUser } from "../../context/UserContext";
import { useFocusEffect } from "@react-navigation/native";

const MyProducts = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const { user } = useUser();
  console.log("products", userProducts);
  useFocusEffect(
    useCallback(() => {
      const getUserProducts = async () => {
        setIsLoading(true); // Set loading to true before fetching data
        try {
          const response = await getUserProductsById(user?._id);
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
        <ActivityIndicator
          size={50}
          color={COLORS.PRIMARY}
        />
      ) : (
        <ScrollView>
          {userProducts?.map((result) => (
            <ProductItem
              key={result._id}
              image={result.image}
              title={result.title}
              price={result.price}
              region={result.region}
              description={result.description}
              userDetails={result.userDetails}
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
    height: "100%",
    backgroundColor: COLORS.SECONDARY,
  },
});
