import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../utils/color";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { getUserById } from "../api/api";
import TextElement from "./elements/Texts/TextElement";
import Card from "./ui/Card";
import Hr from "./elements/HR/Hr";
import { formatPrice } from "../utils";
// import RequestStats from "./RequestStats";

interface RequestCard {
  title: string;
  description: string;
  price: string;
  image: string;
  location: string;
}

interface RequestCardProps {
  request: RequestCard;
  onReset?: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onReset }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigation: any = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(request.userId);
        setUserInfo(res.data.user);
      } catch (error) {}
    };
    fetchUser();
  }, [request?.userId]);
  const truncatedDesc =
    request.description?.length > 20
      ? `${request.description.substring(0, 20)}...`
      : request.description;

  const productNavigate = () => {
    if (onReset) {
      onReset();
    }
    navigation.navigate("Request", { requestId: request._id });
  };

  return (
    <TouchableOpacity onPress={productNavigate}>
      <Card
        style={{
          width: "100%",
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View style={styles.topView}>
          <Image
            source={{ uri: request?.image || request?.images[0] }}
            // source={require("../assets/E-commerce.jpeg")}
            style={styles.productImage}
          />
        </View>
        <View style={styles.bottomView}>
          <View style={styles.bottomTopView}>
            <TextElement fontFamily="poppinsSemiBold" fontSize={18}>
              {request.title}
            </TextElement>
          </View>
          <View style={styles.bottomTopView}>
            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={14}
                source={{
                  uri:
                    userInfo.profilePicture ||
                    "https://res.cloudinary.com/ddhdyuktu/image/upload/v1717377760/corpland/user_yn44if.png",
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  maxWidth: "90%",
                  gap: 5,
                }}
              >
                <Text style={styles.AvatarText}>{userInfo.name}</Text>
                {userInfo.verified && (
                  <Icon
                    name="checkmark-circle"
                    // size={18}
                    color={COLORS.PRIMARY}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={styles.bottomBottomView}>
            <TextElement fontFamily="poppinsBold">
              GH₵{formatPrice(request.minPrice)}
            </TextElement>
            <TextElement fontFamily="poppinsBold"> - </TextElement>
            <TextElement fontFamily="poppinsBold">
              GH₵{formatPrice(request.maxPrice)}
            </TextElement>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    // padding: 10,
    gap: 10,
  },
  topContent: {
    gap: 5,
  },
  bottomContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderTopWidth: 1,
    borderColor: COLORS.TERTIARY,
    gap: 10,
    flex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  productTitle: {
    fontFamily: "poppinsSemiBold",
    // fontSize: 20,
    width: 200,
  },
  productPrice: {
    fontFamily: "poppinsBold",
    color: COLORS.PRIMARY,
    // fontSize: 18,
  },
  AvatarText: {
    color: COLORS.PRIMARY,
    fontSize: 11,
    fontFamily: "poppinsBold",
  },
  avatarContainer: {
    flexDirection: "row",
    gap: 5,
  },
  productDesc: {
    fontFamily: "poppinsRegular",
    // fontSize: 16,
  },
  userView: {
    flexDirection: "row",
    // width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  topView: {
    flex: 1,
    // borderWidth: 1,
  },
  bottomView: {
    flex: 2,
    // borderWidth: 1,
    gap: 10,
  },
  bottomTopView: {
    flex: 1,
  },
  bottomBottomView: {
    borderTopWidth: 1,
    borderColor: COLORS.GRAY,
    flex: 1,
    // width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
});
