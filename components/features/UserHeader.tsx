import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { useTheme } from "../../context/ThemeContext";

interface UserHeaderProps {
  title: string;
  description: string;
}
const UserHeader: FC<UserHeaderProps> = ({ title, description }) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text style={[styles.pageTitle, { color: theme.TEXT }]}>{title}</Text>
      <Text style={[styles.descriptiveText, { color: theme.GRAY }]}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "PoppinsSemiBold",
  },
  descriptiveText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default UserHeader;
