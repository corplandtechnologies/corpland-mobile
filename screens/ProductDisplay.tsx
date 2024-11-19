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
import ProductCard from "../components/ProductCard/ProductCard";
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
      } finally {
        setIsLoading(false); // End loading regardless of success or failure
      }
    };

    fetchProducts();
  }, [category]);

  const renderItem = ({ item }) => <ProductCard product={item} />;

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
          <ProductCard product={product} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: "100%",
    justifyContent: "center",
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
});

export default ProductDisplay;
