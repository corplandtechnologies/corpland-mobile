import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { FlatList } from "react-native";
import ProductGrid from "../components/ProductGrid";
import { getFavoriteProducts, getProducts } from "../api/api";
import { COLORS } from "../utils/color";
import { useUser } from "../context/UserContext";
import { useApp } from "../context/AppContext";
import { formatPrice } from "../utils";

const Favorite = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useApp();

  useFocusEffect(
    useCallback(() => {
      const fetchProducts = async () => {
        setIsLoading(true); // Start loading
        try {
          const fetchedProducts = await getFavoriteProducts(user?._id);
          setProducts(fetchedProducts.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false); // End loading regardless of success or failure
        }
      };

      fetchProducts();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ width: "50%", alignSelf: "center" }}>
      <ProductGrid
        key={item._id}
        image={item.images[0]}
        title={item.title}
        price={formatPrice(item.price)}
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
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={{  }}
      />
    </View>
  );
};

export default Favorite;

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
