import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainView from "../components/elements/Views/MainView";
import { Image } from "react-native";
import TextElement from "../components/elements/Texts/TextElement";
import { COLORS } from "../utils/color";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import AnimatedView from "../components/animated/AnimatedView";
import { useNavigation } from "@react-navigation/native";
import BottomActionCard from "../components/BottomActionCard";
import Icon from "react-native-vector-icons/Ionicons";

const OrderSuccess = () => {
  const navigation: any = useNavigation();

  const handleOrderView = () => {
    navigation.navigate("Orders");
  };
  return (
    <MainView style={styles.main}>
      <View style={styles.topView}>
        {/* <Image
          source={require("../assets/check.png")}
          style={{ width: 100, height: 100 }}
        /> */}
        <Icon name="checkmark-circle" color={COLORS.PRIMARY} size={150} />
        <TextElement textAlign="center" fontSize={24}>
          Your order has been made successfully!
        </TextElement>
        <TextElement
          textAlign="center"
          color={COLORS.GRAY}
          fontFamily="poppinsMedium"
        >
          You can track your delivery in the "Orders" section.
        </TextElement>
      </View>

      <BottomActionCard>
        <PrimaryButton value="View Order" onPress={handleOrderView} />
      </BottomActionCard>
    </MainView>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  main: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  topView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
    marginTop: "50%",
  },
});
