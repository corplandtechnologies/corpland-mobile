import React, { useCallback, useEffect, useState } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { signUp } from "../../api/auth.api";
import { Snackbar } from "react-native-paper"; // Ensure this is imported
import PrimaryButton from "../../components/ui/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserHeader from "../../components/UserHeader";
import EditAvatar from "../../components/ui/EditAvatar";
import PhoneInput from "react-native-phone-input";
import * as ImagePicker from "expo-image-picker";
import FormInput from "../../components/ui/FormInput";
import { useUser } from "../../context/UserContext";
import Select from "../../components/ui/Select";
import { regionsByCountry } from "../../data/default";
import { Platform } from "react-native";
import { getUserById, updateUser } from "../../api";
import { authService } from "../../services/auth.service";
import { useApp } from "../../context/AppContext";
import { handleError } from "../../utils";

const EditProfile = () => {
  const { user } = useApp();
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [name, setName] = useState(user?.name);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null | any>(null);
  const [userId, setUserId] = useState(user?._id);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [selectedCountry, setSelectedCountry] = useState(user?.country);
  const [selectedRegion, setSelectedRegion] = useState(user?.region);
  const [regionOptions, setRegionOptions] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [phoneRef, setPhoneRef] = useState<any>(null);

  const navigation = useNavigation<any>();

  useEffect(() => {
    if (phoneRef && user?.phoneNumber) {
      phoneRef.setValue(user.phoneNumber);
    }
  }, [phoneRef, user?.phoneNumber]);

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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      let data = {
        name: name || user?.name,
        phoneNumber: phoneNumber || user?.phoneNumber,
        profilePicture:
          Platform.OS === "web"
            ? selectedFile || user?.profilePicture
            : selectedImage || user?.profilePicture,
        country: selectedCountry ? selectedCountry : user?.country,
        region: selectedRegion ? selectedRegion : user?.region,
      };

      const res = await updateUser(data, user?._id || "");
      setSnackbarVisible(true);
      setSnackbarMessage(res.data.message);
      navigation.navigate("TabNavigator", { screen: "Home" });
    } catch (error) {
      const err = error as Error;

      setSnackbarMessage(handleError(err));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCountrySelect = (selectedOption: string) => {
    setSelectedCountry(selectedOption);
    // Update region options based on the selected country
    setRegionOptions(regionsByCountry[selectedOption]);
  };

  const handleRegionSelect = (selectedOption: string) => {
    setSelectedRegion(selectedOption);
    // Handle the selected region
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <UserHeader
          title="Edit Your Profile"
          description="Don't worry, Only you can see your personal data. No one else would be able to see it."
        />
        <View style={styles.avatarView}>
          {selectedImage || user?.profilePicture || previewImage ? (
            <>
              <Image
                source={{
                  uri: selectedImage || previewImage || user?.profilePicture,
                }}
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
                onPress={() => document.getElementById("fileUpload")?.click()}
              />
            </label>
          )}
        </View>
        <FormInput
          icon="user"
          placeholder="Name"
          onChangeText={setName}
          value={name}
          style={styles.input}
          defaultValue={user?.name}
        />
        <View style={styles.inputContainer}>
          <Icon name="phone" type="font-awesome" color={COLORS.GRAY} />
          <PhoneInput
            ref={(ref) => setPhoneRef(ref)}
            initialCountry={"gh"}
            textProps={{
              placeholder: "Enter a phone number...",
              defaultValue: user?.phoneNumber,
            }}
            pickerBackgroundColor={COLORS.TERTIARY}
            onChangePhoneNumber={(text) => {
              setPhoneNumber(text);
            }}
            autoFormat={true}
            value={user?.phoneNumber}
          />
        </View>
        <Select
          touchableText={selectedCountry ? selectedCountry : "Country*"}
          title="Country"
          options={Object.keys(regionsByCountry)}
          onSelect={handleCountrySelect}
          initialValue={selectedCountry}
        />

        {selectedCountry && (
          <Select
            touchableText={selectedRegion ? selectedRegion : "Region*"}
            title="Region"
            options={regionOptions}
            onSelect={handleRegionSelect}
            initialValue={selectedRegion}
          />
        )}

        <PrimaryButton
          value="Save Changes"
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
          }}
        >
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
    marginBottom: 10,
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
    backgroundColor: COLORS.PRIMARY,
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
  input: {
    marginBottom: 10,
  },
});

export default EditProfile;
