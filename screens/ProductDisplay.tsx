// ProductDisplay.tsx

import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import ProductGrid from "../components/ProductGrid";
import { searchProducts } from "../api/api";
import { COLORS } from "../utils/color";
import UserHeader from "../components/UserHeader";
import { ScrollView } from "react-native";

const ProductDisplay = ({ route }) => {
  const category = route.params.category;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Start loading
      try {
        const fetchedProducts = await searchProducts(category);
        setProducts(fetchedProducts.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // End loading regardless of success or failure
      }
    };

    fetchProducts();
  }, [category]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          There are no products in this category yet
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {products.map((product) => (
          <TouchableOpacity
            key={product._id}
            style={{ width: "50%", alignSelf: "center" }}
          >
            <ProductGrid
              image={product.images[0]}
              title={product.title}
              price={product.price}
              region={product.region}
              description={product.description}
              _id={product._id}
              userId={product.userId}
              dials={product.dials}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

export default ProductDisplay;
