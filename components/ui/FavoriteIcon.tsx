// components/FavoriteIcon.tsx
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../utils/color";
import { useUser } from "../../context/UserContext";
import { getUserById, toggleFavorites } from "../../api/api";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoriteIconProps {
  style?: Object;
  productId: any;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({ style, productId }) => {
  const [user, setUser] = useState();
  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.includes(productId)
  );

  useFocusEffect(
    useCallback(() => {
      const getUserInfo = async () => {
        try {
          const parsedUserInfo = JSON.parse(
            (await AsyncStorage.getItem("user")) || "{}"
          );
          const res = await getUserById(parsedUserInfo?._id);
          setUser(res?.data.user);
        } catch (error) {
          console.log(error);
        }
      };
      getUserInfo();
    }, [])
  );
  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const res = await getUserById(user?._id);
        setIsFavorite(res.data.user?.favorites.includes(productId));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserById();
  }, [user, productId]);
  const handleToggleFavorites = async () => {
    try {
      const res = await toggleFavorites(user?._id, productId);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[{ flex: 1 }, style]}>
      <TouchableOpacity onPress={handleToggleFavorites}>
        <Icon
          name={isFavorite ? "heart" : "heart-outline"}
          size={30}
          color={"red"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteIcon;
