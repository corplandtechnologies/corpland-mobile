// Request.tsx
import { View, Text, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const Request = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const [fontsLoaded] = useFonts({
    RalewayExtraBold: require("../fonts/Raleway/static/Raleway-ExtraBold.ttf"),
    RalewayBold: require("../fonts/Raleway/static/Raleway-Bold.ttf"),
    RalewayRegular: require("../fonts/Raleway/static/Raleway-Regular.ttf"),
    RalewaySemiBold: require("../fonts/Raleway/static/Raleway-SemiBold.ttf"),
    RalewayLight: require("../fonts/Raleway/static/Raleway-Light.ttf"),
  });

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const animateHeart = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsLiked(!isLiked);
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <View className="bg-white rounded-lg p-2.5 shadow-xl my-2.5">
      <Text style={{ fontFamily: "RalewayLight" }}>Posted 3 minutes ago</Text>
      <View className="flex flex-col gap-2.5">
        <View className="flex flex-row items-center justify-between">
          <View
            className="flex flex-col items-start justify-start"
            style={{ width: "60%" }}>
            <Text
              className="text-lg"
              style={{ fontFamily: "RalewayExtraBold" }}>
              We are looking for 45 Freelancers
            </Text>
          </View>

          <View className="flex flex-row items-center gap-2.5">
            <TouchableOpacity onPress={toggleLike}>
              <Icon
                name={isLiked ? "heart" : "heart-outline"}
                size={20}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="share-outline"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            numberOfLines={showFullDescription ? undefined : 3}
            ellipsizeMode="tail"
            className="my-1">
            I will provide a detailed description of the project and what is
            needed from freelancers in this section More of the details can be
            found on our website www.website.com at the "Projects" tab.
          </Text>
          <TouchableOpacity onPress={toggleDescription}>
            <Text className="underline">
              {showFullDescription ? "show less" : "more"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Request;
