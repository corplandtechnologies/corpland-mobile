import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenContextWrapper from "../components/ScreenContextWrapper";
import { Avatar, Switch } from "react-native-paper";
import { COLORS } from "../utils/color";
import Icon from "react-native-vector-icons/Ionicons";
import Card from "../components/ui/Card";
import ProfileMenuItem from "../components/ProfileMenuItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getUserById } from "../api/api";
import noProfilePicture from "../assets/user.png";
import { useSellerMode } from "../context/SellerModeContext";
import { useUser } from "../context/UserContext";
import ProductCard from "../components/ProductCard";
import ConfirmationModal from "../components/ConfirmationModal";

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isSellerMode, toggleSellerMode } = useSellerMode();
  const [userInfo, setUserInfo] = useState({});
  const { user } = useUser();
  console.log(user);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const userInfo = await AsyncStorage.getItem("user");
          const parsedUserInfo = JSON.parse(userInfo || "{}");
          const res = await getUserById(parsedUserInfo?._id);
          setUserInfo(res.data?.user);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };

      fetchData();
    }, [])
  );

  const navigation = useNavigation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmail = (subject: string, body: string) => {
    const emailUrl = `mailto:corplandtechnologies@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    Linking.openURL(emailUrl);
  };

  return (
    <View style={styles.headerView}>
      <View style={styles.avatarContainer}>
        {userInfo?.profilePicture ? (
          <Avatar.Image
            size={100}
            source={{ uri: userInfo?.profilePicture }}
          />
        ) : (
          <Avatar.Image
            size={100}
            source={require("../assets/user.png")}
          />
        )}
        <Text style={styles.AvatarText}>{userInfo?.name}</Text>
      </View>
      {/* <View style={styles.modeView}>
        <Text style={styles.modeText}>Seller Mode</Text>
        <Switch
          value={isSellerMode}
          onValueChange={toggleSellerMode}
          color={COLORS.COMPLIMENTARY}
        />
      </View> */}
      <View style={{ marginTop: 20 }}>
        <ProfileMenuItem
          title="Edit Profile"
          iconName="person-outline"
          onPress={() => navigation.navigate("EditProfile")}
        />
        <ProfileMenuItem
          title="My Products"
          iconName="pricetags-outline"
          onPress={() => navigation.navigate("MyProducts")}
        />
        {/* <ProfileMenuItem
          title="Settings"
          iconName="settings-outline"
          onPress={() => console.log("Settings pressed")}
        /> */}
        <ProfileMenuItem
          title="Send Feedback"
          iconName="mail-outline"
          onPress={() => handleEmail("Feedback", "")}
        />

        <ProfileMenuItem
          title="Help Center"
          iconName="help-circle-outline"
          onPress={() => handleEmail("Help Center", "")}
        />

        {/*  <ProfileMenuItem
          title="Privacy Policy"
          iconName="information-circle-outline"
          onPress={() => console.log("Privacy Policy pressed")}
        /> */}
        <ProfileMenuItem
          title="Log Out"
          iconName="log-out-outline"
          onPress={showModal}
        />
      </View>
      <ConfirmationModal
        isVisible={isModalVisible}
        onClose={hideModal}
        onConfirm={handleLogout}
        modalTitle="Are you sure you want to log out?"
        ConfirmButtonText="Log Out"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
  },
  AvatarText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontFamily: "InterBold",
    marginTop: 5,
  },
  avatarContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  modeView: {
    width: "80%",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: COLORS.TERTIARY,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  modeText: {
    fontFamily: "InterBold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "50%",
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    margin: 24,
    color: COLORS.SECONDARY,
    fontFamily: "InterBold",
  },
  modalButtons: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "80%",
    gap: 20,
  },
  modalButton: {
    backgroundColor: COLORS.SECONDARY,
    padding: 20,
    borderRadius: 5,
  },
  modalButtonLogout: {
    backgroundColor: COLORS.DESTRUCTIVE,
    padding: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "InterBold",
  },
  modalButtonTextLogout: {
    color: COLORS.SECONDARY,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "InterBold",
  },
});

export default Profile;
