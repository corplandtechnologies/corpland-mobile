import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import ScreenContextWrapper from "../components/ScreenContextWrapper";
import { Avatar } from "react-native-paper";
import { COLORS } from "../utils/color";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/Ionicons";
import Card from "../components/ui/Card";
import ProfileMenuItem from "../components/ProfileMenuItem";

const Profile = () => {
  const [fontsLoaded] = useFonts({
    PoppinsExtraBold: require("../fonts/Poppins/Poppins-ExtraBold.ttf"),
    PoppinsRegular: require("../fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsLight: require("../fonts/Poppins/Poppins-Light.ttf"),
    PoppinsBold: require("../fonts/Poppins/Poppins-Bold.ttf"),
    RalewayBold: require("../fonts/Raleway/static/Raleway-ExtraBold.ttf"),
    RalewayRegular: require("../fonts/Raleway/static/Raleway-Bold.ttf"),
  });
  return (
    <ScreenContextWrapper>
      <View style={styles.headerView}>
        <View style={styles.headerWrapper}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={50}
              source={require("../assets/Designer.jpeg")}
            />
            <Text style={styles.AvatarText}>Sylvester Asante</Text>
          </View>
          <TouchableOpacity>
            <Icon
              name="settings-outline"
              color={COLORS.SECONDARY}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.profileTitle}>My Corpland</Text>
        <ProfileMenuItem
          title="My Requests"
          iconName="newspaper-outline"
        />
        <ProfileMenuItem
          title="Logout"
          iconName="log-out-outline"
          destructive={true}
        />
      </View>
    </ScreenContextWrapper>
  );
};

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: COLORS.PRIMARY,
    height: 200,
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-end",
  },
  AvatarText: {
    color: COLORS.SECONDARY,
    fontSize: 16,
    marginLeft: 8,
    fontFamily: "RalewayBold",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  profileTitle: {
    textAlign: "left",
    fontSize: 24,
    fontFamily: "RalewayBold",
    padding: 10,
  },
  profileMenuView: {
    backgroundColor: COLORS.SECONDARY,
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

export default Profile;
