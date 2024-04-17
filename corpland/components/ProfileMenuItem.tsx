// components/ProfileMenuItem.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../utils/color";

interface ProfileMenuItemProps {
  title: string;
  iconName: string;
  destructive?: boolean;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  title,
  iconName,
  destructive,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.profileMenuView,
        backgroundColor: destructive ? COLORS.DESTRUCTIVE : COLORS.SECONDARY,
      }}>
      <View style={styles.preferenceSelect}>
        <Icon
          name={iconName}
          color={destructive ? COLORS.SECONDARY : COLORS.COMPLIMENTARY}
          size={24}
        />
        <Text
          style={{
            ...styles.preferenceSelectText,
            color: destructive ? COLORS.SECONDARY : COLORS.PRIMARY,
          }}>
          {title}
        </Text>
      </View>
      <Icon
        name="chevron-forward-outline"
        color={destructive ? COLORS.SECONDARY : COLORS.COMPLIMENTARY}
        size={24}
      />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  profileMenuView: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  preferenceSelect: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  preferenceSelectText: {
    fontFamily: "RalewayBold",
  },
});

export default ProfileMenuItem;
