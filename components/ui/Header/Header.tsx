import React from "react";
import { View, StyleSheet } from "react-native";
import ViewElement from "../../common/View/ViewElement";
import { HeaderProps } from "./header.interfaces";

const Header: React.FC<HeaderProps> = ({ leftElement, rightElement }) => {
  return (
    <ViewElement style={styles.headerContainer}>
      <ViewElement style={styles.leftContainer}>{leftElement}</ViewElement>
      <ViewElement style={styles.rightContainer}>{rightElement}</ViewElement>
    </ViewElement>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
});
