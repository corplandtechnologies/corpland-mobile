// Request.tsx
import { View, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const Request = () => {
  const [fontsLoaded] = useFonts({
    RalewayExtraBold: require("../fonts/Raleway-ExtraBold.ttf"),
    RalewayBold: require("../fonts/Raleway-Bold.ttf"),
    RalewayRegular: require("../fonts/Raleway-Regular.ttf"),
    RalewaySemiBold: require("../fonts/Raleway-SemiBold.ttf"),
    RalewayLight: require("../fonts/Raleway-Light.ttf"),
  });

  const [showFullDescription, setShowFullDescription] = useState(false);

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

          <View className="flex flex-row items-center ">
            <Icon
              name="heart-outline"
              size={20}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Icon
              name="share-outline"
              size={20}
              color="black"
            />
          </View>
        </View>
        <View>
          <Text
            numberOfLines={showFullDescription ? undefined : 3}
            ellipsizeMode="tail"
            className="my-1" 
            >
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
