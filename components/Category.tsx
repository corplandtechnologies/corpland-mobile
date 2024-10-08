import { Image, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { COLORS } from "../utils/color";

interface CategoryProps {
  category: string;
  iconImagePath: string;
}
const Category: FC<CategoryProps> = ({ category, iconImagePath }) => {
  return (
    <View style={styles.main}>
      <View style={styles.wrapper}>
        <Image source={{ uri: iconImagePath }} style={styles.catImage} />
      </View>
      <Text style={{ fontFamily: "PoppinsMedium", textAlign: "center" }}>
        {category}
      </Text>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  main: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    backgroundColor: COLORS.GRAY_VERY_LIGHT,
    padding: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
  },
  catImage: {
    width: 30,
    height: 30,
  },
});
