// components/FavoriteIcon.tsx
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../utils/color";
import { useUser } from "../../context/UserContext";
import { getUserById, toggleFavorites } from "../../api/api";

interface FavoriteIconProps {
  toggleIsLiked: () => void;
  style?: Object;
  productId: any;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({
  toggleIsLiked,
  style,
  productId,
}) => {
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(
    user?.favorites.includes(productId)
  );
  console.log(isFavorite);

  console.log("ProdId", productId);
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
      console.log(user?._id, productId);
      const res = await toggleFavorites(user?._id, productId);
      setIsFavorite(!isFavorite);
      console.log(res.data.user);
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
