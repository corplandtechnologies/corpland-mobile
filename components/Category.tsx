import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { COLORS } from "../utils/color";
import { Icon } from "react-native-elements";

interface CategoryProps {
  category: string;
  icon: string;
}
const Category: FC<CategoryProps> = ({ category, icon }) => {
  return (
    <View style={styles.main}>
      <View style={styles.wrapper}>
        <Icon name={icon} color={COLORS.PRIMARY} size={24} type="ionicon" />
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
