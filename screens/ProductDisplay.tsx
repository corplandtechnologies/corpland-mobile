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

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ width: "50%", alignSelf: "center" }}>
      <ProductGrid
        key={item._id}
        image={item.images[0]}
        title={item.title}
        price={item.price}
        region={item.region}
        description={item.description}
        _id={item._id}
        userId={item.userId}
        dials={item.dials}
      />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={COLORS.PRIMARY}
        />
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
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={{ height: "100%" }}
      />
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
});

export default ProductDisplay;
