// components/FavoriteIcon.tsx
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../utils/color";
import { useUser } from "../../context/UserContext";
import { getUserById, toggleFavorites } from "../../api/api";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApp } from "../../context/AppContext";
import AuthModal from "../auth/AuthModal";

interface FavoriteIconProps {
  style?: Object;
  productId: any;
  size?: number;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({
  style,
  productId,
  size,
}) => {
  const { user } = useApp();
  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.includes(productId)
  );
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const res = await getUserById(user?._id);
        setIsFavorite(res.data.user?.favorites.includes(productId));
      } catch (error) {}
    };
    fetchUserById();
  }, [user?._id, productId]);
  const handleToggleFavorites = async () => {
    setIsFavorite(!isFavorite);
    try {
      await toggleFavorites(user?._id, productId);
    } catch (error) {}
  };

  return (
    <View style={[{ flex: 1 }, style]}>
      <TouchableOpacity
        onPress={() => {
          if (!user) {
            setModalVisible(true);
          } else {
            handleToggleFavorites();
          }
        }}
      >
        <Icon
          name={isFavorite ? "heart" : "heart-outline"}
          size={size ? size : 30}
          color={"red"}
        />
      </TouchableOpacity>
      <AuthModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default FavoriteIcon;
