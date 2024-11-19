import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import ProductGrid from "../components/ProductGrid";
import { getProducts } from "../api/api";
import { COLORS } from "../utils/color";
import { ScrollView } from "react-native-gesture-handler";
import { formatPrice } from "../utils";

const ProductGrids = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const header = route.params?.title;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: header || "Default Title",
    });
  }, [navigation]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Start loading
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts.data);
      } catch (error) {
      } finally {
        setIsLoading(false); // End loading regardless of success or failure
      }
    };

    fetchProducts();
  }, [header]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ width: "50%", alignSelf: "center" }}>
      <ProductGrid
        key={item._id}
        image={item.images[0]} // Pass the entire images array
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
        <ActivityIndicator color={COLORS.PRIMARY} />
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
              price={formatPrice(product?.price)}
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

export default ProductGrids;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
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
