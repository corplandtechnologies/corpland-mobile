import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { COLORS } from "../../utils/color";
import Icon from "react-native-vector-icons/Ionicons";

interface ProductStatsProps {
  icon: String;
  value: number | string;
  name: string;
  card: boolean;
}
const ProductStats: FC<ProductStatsProps> = ({ icon, value, name, card }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        marginTop: 5,
        alignItems: "center",
      }}
    >
      <Icon name={icon} size={card ? 10 : 20} color={COLORS.GRAY} />
      <Text
        style={{
          color: COLORS.GRAY,
          fontFamily: "PoppinsRegular",
          fontSize: card ? 10 : 16,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          color: COLORS.GRAY,
          fontFamily: "PoppinsRegular",
          fontSize: card ? 10 : 16,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default ProductStats;

const styles = StyleSheet.create({});
