import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import TextElement from "../../../components/elements/Texts/TextElement";
import { COLORS } from "../../../utils/color";
import { Avatar } from "react-native-elements";

const ChatPreview = () => {
  return (
    <View style={styles.main}>
      <View style={styles.leftView}>
        <Avatar
          source={require("../../../assets/banner.jpg")}
          avatarStyle={styles.profilePicture}
          rounded
        />
        {/* Online badge */}
        <View style={styles.onlineBadge} />
      </View>
      <View style={styles.rightView}>
        <View style={styles.messageInfoView}>
          <TextElement>ReStock Enterprise</TextElement>
          <TextElement color={COLORS.GRAY} fontFamily="PoppinsMedium">
            Perfect I'll check it
          </TextElement>
        </View>
      </View>
      <View style={styles.farRightView}>
        <TextElement color={COLORS.GRAY} fontFamily="PoppinsMedium">
          09:34 PM
        </TextElement>
      </View>
    </View>
  );
};

export default ChatPreview;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    padding: 5,
    borderRadius: 10,
    // gap: 5,
  },
  leftView: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Ensure positioning context for the badge
  },
  rightView: {
    flex: 4,
  },
  profilePicture: {},
  messageInfoView: {
    justifyContent: "center",
    padding: 5,
    gap: 0.5,
  },
  // Badge for online status
  onlineBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "green", // Green color for online status
    position: "absolute",
    bottom: 7,
    right: 5,
    borderWidth: 2, // To add a white border to make the badge stand out
    borderColor: "white",
  },
  farRightView: {
    flex: 2,
    alignItems:"flex-end"
  },
});
