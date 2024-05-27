import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Input, Button, Icon, CheckBox } from "react-native-elements";
import { COLORS } from "../../utils/color";
import { useNavigation } from "@react-navigation/native";
import { signUp } from "../../api/auth.api";
import { Snackbar } from "react-native-paper"; // Ensure this is imported
import PrimaryButton from "../../components/ui/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserHeader from "../../components/UserHeader";
import EditAvatar from "../../components/ui/EditAvatar";
import PhoneInput from "react-native-phone-input";
import * as ImagePicker from "expo-image-picker";
import { completeProfile } from "../../api/api";

const CompleteProfile = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [name, setName] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("user");
        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          setUserId(parsedUserInfo._id);
          setUser(parsedUserInfo);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const handleProfileUpdate = async () => {
    if (!name || !phoneNumber) {
      setSnackbarMessage("All Fields are required!");
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    try {
      const data = {
        name: name || user?.name,
        phoneNumber: phoneNumber,
        profilePicture: selectedImage,
        userId: userId,
      };
      console.log(data);

      const res = await completeProfile(data);
      setSnackbarVisible(true);
      setSnackbarMessage(res.message);
      navigation.navigate("TabNavigator", { screen: "Home" });
    } catch (error) {
      console.log(error);
      const err = error as Error;
      setSnackbarMessage(err.message);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <UserHeader
          title="Complete Your Profile"
          description="Don't worry, Only you can see your personal data. No one else would be able to see it."
        />
        <View style={styles.avatarView}>
          {selectedImage ? (
            <>
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
              />
            </>
          ) : (
            <View style={styles.circleBackground}>
              <Icon
                name="user"
                type="font-awesome"
                size={30}
                color="#fff"
              />
            </View>
          )}
          <Button
            title="Change"
            buttonStyle={styles.editButton}
            onPress={handlePickImage}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="user"
            type="font-awesome"
            color={COLORS.GRAY}
          />
          <TextInput
            placeholder="Name"
            style={styles.input}
            placeholderTextColor={COLORS.TERTIARY}
            onChangeText={setName}
            defaultValue={user?.name}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="phone"
            type="font-awesome"
            color={COLORS.GRAY}
          />
          <PhoneInput
            initialCountry={"gh"}
            textProps={{
              placeholder: "Enter a phone number...",
            }}
            style={styles.input}
            pickerBackgroundColor={COLORS.TERTIARY}
            onChangePhoneNumber={(text) => {
              setPhoneNumber(text);
            }}
            autoFormat={true}
            // You can customize the country list and other props as needed
          />
        </View>

        <PrimaryButton
          value="Complete Profile"
          onPress={handleProfileUpdate}
          loading={loading}
          disabled={loading}
        />

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          action={{
            label: "Close",
            onPress: () => {
              setSnackbarVisible(false);
            },
          }}>
          {snackbarMessage}
        </Snackbar>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: COLORS.SECONDARY,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.TERTIARY,
  },
  avatarView: {
    alignSelf: "center",
    marginBottom: 25,
  },
  circleBackground: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    backgroundColor: COLORS.TERTIARY,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  editButton: {
    marginTop: 15,
    backgroundColor: COLORS.GRAY,
    borderRadius: 5,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    backgroundColor: COLORS.TERTIARY,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});

export default CompleteProfile;
