import { View, Text, StyleSheet, Linking, ScrollView } from "react-native";
import React, { useState } from "react";
import { Avatar, Switch } from "react-native-paper";
import { COLORS } from "../utils/color";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileMenuItem from "../components/ProfileMenuItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useSellerMode } from "../context/SellerModeContext";
import ConfirmationModal from "../components/ConfirmationModal";
import { useApp } from "../context/AppContext";

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isSellerMode, toggleSellerMode } = useSellerMode();
  const { user } = useApp();

  const navigation: any = useNavigation();

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
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmail = (subject: string, body: string) => {
    const emailUrl = `mailto:corpland.gh@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    Linking.openURL(emailUrl);
  };

  return (
    <View style={styles.headerView}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: COLORS.SECONDARY,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarContainer}>
          <Avatar.Image size={100} source={{ uri: user?.profilePicture }} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              maxWidth: "90%",
              flexWrap: "wrap",
              gap: 5,
            }}
          >
            <Text style={styles.AvatarText}>{user?.name}</Text>
            {user?.verified && (
              <Icon name="checkmark-circle" size={18} color={COLORS.PRIMARY} />
            )}
          </View>
        </View>
        <View style={styles.modeView}>
          <Text style={styles.modeText}>Seller Mode</Text>
          <Switch
            value={isSellerMode}
            onValueChange={toggleSellerMode}
            color={COLORS.PRIMARY}
            thumbColor={COLORS.PRIMARY}
            // trackColor={COLORS.PRIMARY}
          />
        </View>
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
          <ProfileMenuItem
            title="My Requests"
            iconName="paper-plane-outline"
            onPress={() => navigation.navigate("MyRequests")}
          />
          <ProfileMenuItem
            title="Wallet"
            iconName="wallet-outline"
            onPress={() => navigation.navigate("Wallet")}
          />
          <ProfileMenuItem
            title="Withdraw"
            iconName="card-outline"
            onPress={() => navigation.navigate("Withdraw")}
          />

          {/* <ProfileMenuItem
            title="My Coupons"
            iconName="ticket-outline"
            onPress={() => navigation.navigate("MyCoupons")}
          /> */}
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
            title="Settings"
            iconName="settings-outline"
            onPress={() => navigation.navigate("Settings")}
          />
          {/* <ProfileMenuItem
          title="Help Center"
          iconName="help-circle-outline"
          onPress={() => handleEmail("Help Center", "")}
        /> */}

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
      </ScrollView>
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
    fontFamily: "PoppinsSemiBold",
    marginTop: 30,
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
    backgroundColor: COLORS.GRAY_LIGHTER,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    height: 100,
  },
  modeText: {
    fontFamily: "PoppinsSemiBold",
    color: COLORS.PRIMARY,
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
    fontFamily: "PoppinsBold",
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
    fontFamily: "PoppinsBold",
  },
  modalButtonTextLogout: {
    color: COLORS.SECONDARY,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
});

export default Profile;
