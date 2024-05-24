import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../utils/color";
import Category from "../components/Category"; // Assuming you have a Category component
import { storeCatergories } from "../data/dummyData"; // Assuming you have dummy data
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  const numColumns = 4;
  const size = Dimensions.get("window").width / numColumns;
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ width: size, height: size, marginTop: 30 }}
      onPress={() =>
        navigation.navigate("ProductDisplay", { category: item.category })
      }>
      <Category
        category={item.category}
        iconImagePath={item.iconImagePath}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.main}>
      <FlatList
        data={storeCatergories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY,
    gap: 20,
    height: "100%",
  },
});
