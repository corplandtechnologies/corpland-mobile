// ProductDisplay.tsx

import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import ProductGrid from "../components/ProductGrid";
import { searchProducts } from "../api/api";
import { Dimensions } from "react-native";

const ProductDisplay = ({ route }) => {
  const numColumns = 2;
  const size = Dimensions.get("window").width / numColumns;
  const category = route.params.category;
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await searchProducts(category); // Implement this function in your API
        console.log(fetchedProducts.data);

        setProducts(fetchedProducts.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [category]);

  const renderItem = ({ item }) => (
    // Render each product item here. You might want to create a separate component for this.
    <TouchableOpacity style={{ width: size, height: size, gap: 10 }}>
      <ProductGrid
        key={item._id}
        image={item.image}
        title={item.title}
        price={item.price}
        region={item.region}
        description={item.description}
        userDetails={item.userDetails}
        _id={item._id}
        // onReset={resetProductState}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Make sure to replace 'id' with the actual unique identifier of your product items
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
});

export default ProductDisplay;
