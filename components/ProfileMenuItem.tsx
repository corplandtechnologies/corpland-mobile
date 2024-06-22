// components/ProfileMenuItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../utils/color";

interface ProfileMenuItemProps {
  title: string;
  iconName: string;
  onPress: () => void;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  title,
  iconName,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.TERTIARY,
        padding: 20,
        paddingTop: 20,
        paddingBottom: 20,
      }}>
      <Icon
        name={iconName}
        size={24}
        color={COLORS.COMPLIMENTARY}
      />
      <Text style={{ marginLeft: 10, flex: 1, fontFamily: "InterRegular" }}>
        {title}
      </Text>
      <Icon
        name="chevron-forward"
        size={24}
        color={COLORS.COMPLIMENTARY}
      />
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;
