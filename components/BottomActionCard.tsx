import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AnimatedView from "./animated/AnimatedView";
import Card from "./ui/Card";

interface BottomActionCardProps {
  children: React.ReactNode;
}
const BottomActionCard: React.FC<BottomActionCardProps> = ({ children }) => {
  return (
    <AnimatedView style={styles.actionView}>
      <Card>{children}</Card>
    </AnimatedView>
  );
};

export default BottomActionCard;

const styles = StyleSheet.create({
  actionView: {
    width: "100%",
    justifyContent: "center",
  },
});
