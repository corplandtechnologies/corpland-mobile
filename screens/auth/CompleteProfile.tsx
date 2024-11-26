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
import PrimaryButton from "../../components/common/Button/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserHeader from "../../components/features/UserHeader";
import EditAvatar from "../../components/ui/EditAvatar";
import PhoneInput from "react-native-phone-input";
import * as ImagePicker from "expo-image-picker";
import { completeProfile, getUserById, getUserByUserId } from "../../api/index";
import FormInput from "../../components/common/Input/FormInput";
import { Platform } from "react-native";
import { authService } from "../../services/auth.service";
import { handleError } from "../../utils";
import { useApp } from "../../context/AppContext";

const CompleteProfile = () => {
  const { setUser } = useApp();
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [user, setLocalUser] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [phoneRef, setPhoneRef] = useState<any>(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setLocalUser(currentUser);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      // Create a URL for the selected file and set it to the previewImage state
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const storedUser = await authService.getUser();
      const storedUserEmail = storedUser?.email;  
      const data = {
        name: name || user?.name,
        phoneNumber: phoneNumber,
        email: storedUserEmail,
        profilePicture:
          Platform.OS === "web"
            ? selectedFile || user?.profilePicture
            : selectedImage || user?.profilePicture,
      };

      const res = await completeProfile(data);
      const userData = res.data?.data;

      // Store complete user data and update context
      await authService.setUser(userData);
      setUser(userData); // Update AppContext

      // Get fresh user data from server
      const userResponse = await getUserByUserId(userData._id);
      const completeUserData = userResponse.data?.data;

      // Update storage and context with fresh data
      await authService.setUser(completeUserData);
      setUser(completeUserData);

      setSnackbarVisible(true);
      setSnackbarMessage("Profile completed successfully!");
      navigation.navigate("TabNavigator", { screen: "Home" });
    } catch (error) {
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
    } finally {
      navigation.navigate("TabNavigator", { screen: "Home" });
      setLoading(false);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <UserHeader
          title="Create Your Profile"
          description="Don't worry, Only you can see your personal data. No one else would be able to see it."
        />
        <View style={styles.avatarView}>
          {selectedImage || previewImage ? (
            <>
              <Image
                source={{ uri: selectedImage || previewImage }}
                style={styles.selectedImage}
              />
            </>
          ) : (
            <View style={styles.circleBackground}>
              <Icon name="user" type="font-awesome" size={30} color="#fff" />
            </View>
          )}
          {Platform.OS === "web" ? (
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }} // Hide the default file input
            />
          ) : (
            <Button
              title="Change"
              buttonStyle={styles.editButton}
              onPress={handlePickImage}
            />
          )}
          {/* Add a label for the hidden file input on web */}
          {Platform.OS === "web" && (
            <label htmlFor="fileUpload">
              <Button
                title="Change"
                buttonStyle={styles.editButton}
                onPress={() => document.getElementById("fileUpload").click()}
              />
            </label>
          )}
        </View>
        <FormInput
          icon={"user"}
          placeholder="Name"
          onChangeText={setName}
          defaultValue={user?.name}
          style={{
            marginBottom: 10,
          }}
        />
        <View style={styles.inputContainer}>
          <Icon name="phone" type="font-awesome" color={COLORS.GRAY} />
          <PhoneInput
            ref={(ref) => setPhoneRef(ref)}
            initialCountry={"gh"}
            textProps={{
              placeholder: "Enter a phone number...",
              cursorColor: COLORS.PRIMARY,
            }}
            style={styles.input}
            pickerBackgroundColor={COLORS.TERTIARY}
            onChangePhoneNumber={(text) => {
              setPhoneNumber(text.trim());
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
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Close",
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: COLORS.PRIMARY,
    marginTop: 15,
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
