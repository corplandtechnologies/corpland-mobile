import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { COLORS } from "../utils/color";

interface UserHeaderProps {
  title: string;
  description: string;
}
const UserHeader: FC<UserHeaderProps> = ({ title, description }) => {
  return (
    <View>
      <Text style={styles.pageTitle}>{title}</Text>
      <Text style={styles.descriptiveText}>{description}</Text>
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "InterBold",
  },
  descriptiveText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.GRAY,
  },
});
