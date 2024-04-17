import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";

interface RequestProps {
  post: {
    title: string;
    description: string;
    image: string;
    postedTime: string;
  };
}

const Request: React.FC<RequestProps> = ({ post }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [fontsLoaded] = useFonts({
    PoppinsExtraBold: require("../fonts/Poppins/Poppins-ExtraBold.ttf"),
    PoppinsRegular: require("../fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsLight: require("../fonts/Poppins/Poppins-Light.ttf"),
  });

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.postedTime}>{post.postedTime}</Text>
      <View style={styles.content}>
        <View>
          <Image
            source={post.image}
            style={styles.image}
          />
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{post.title}</Text>
          </View>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={toggleLike}>
              <Icon
                name={isLiked ? "heart" : "heart-outline"}
                size={20}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="call-outline"
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
            style={styles.description}>
            {post.description}
          </Text>
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.toggleDescription}>
              {showFullDescription ? "show less" : "more"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  postedTime: {
    fontFamily: "PoppinsLight",
    marginBottom: 10,
  },
  content: {
    flexDirection: "column",
    gap: 5,
  },
  image: {
    width: "100%",
    height: 250,
    // resizeMode: "cover",
    objectFit: "cover",
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flex: 0.9,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  titleText: {
    fontFamily: "PoppinsBold",
    fontSize: 20,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  description: {
    fontFamily: "PoppinsRegular",
  },
  toggleDescription: {
    textDecorationLine: "underline",
  },
});

export default Request;
