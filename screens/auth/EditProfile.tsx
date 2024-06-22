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
import { completeProfile, getUserById, updateUser } from "../../api/api";
import FormInput from "../../components/ui/FormInput";
import { useUser } from "../../context/UserContext";
import Select from "../../components/ui/Select";
import { regionsByCountry } from "../../data/dummyData";

const EditProfile = () => {
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [name, setName] = useState(userInfo?.name);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber);
  const [selectedCountry, setSelectedCountry] = useState(userInfo?.country);
  const [selectedRegion, setSelectedRegion] = useState(userInfo?.region);
  const [regionOptions, setRegionOptions] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigation = useNavigation();

  console.log(user);

  useFocusEffect(
    useCallback(() => {
      const getUserInfo = async () => {
        try {
          const parsedUserInfo = JSON.parse(await AsyncStorage.getItem("user"));
          const res = await getUserById(parsedUserInfo?._id);
          setUserInfo(res.data.user);
        } catch (error) {
          console.log(error);
        }
      };
      getUserInfo();
    }, [])
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          setUserId(parsedUserInfo._id);
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
    setLoading(true);
    try {
      let data = {
        name: name || userInfo?.name,
        phoneNumber: phoneNumber || userInfo?.phoneNumber,
        profilePicture: selectedImage || userInfo?.profilePicture,
        country: selectedCountry ? selectedCountry : userInfo?.country,
        region: selectedRegion ? selectedRegion : userInfo?.region,
        userId: userInfo._id,
      };

      const res = await updateUser(data);
      setSnackbarVisible(true);
      setSnackbarMessage(res.data.message);
      navigation.navigate("TabNavigator");
    } catch (error) {
      console.log(error);
      const err = error as Error;
      setSnackbarMessage(err.message);
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
          {selectedImage || userInfo?.profilePicture ? (
            <>
              <Image
                source={{ uri: selectedImage || userInfo?.profilePicture }}
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
        <FormInput
          icon="user"
          placeholder="Name"
          onChangeText={setName}
          defaultValue={userInfo?.name}
          style={styles.input}
        />
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
              defaultValue: userInfo?.phoneNumber,
            }}
            pickerBackgroundColor={COLORS.TERTIARY}
            onChangePhoneNumber={(text) => {
              setPhoneNumber(text);
            }}
            autoFormat={true}
          />
        </View>
        <Select
          touchableText={selectedCountry ? selectedCountry : "Country*"}
          title="Country"
          options={Object.keys(regionsByCountry)}
          onSelect={handleCountrySelect}
          initialValue={userInfo?.country} // Pass the user's current country as the initial value
        />

        {selectedCountry && (
          <Select
            touchableText={selectedRegion ? selectedRegion : "Region*"}
            title="Region"
            options={regionOptions}
            onSelect={handleRegionSelect}
            initialValue={userInfo?.region} // Pass the user's current region as the initial value
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
    backgroundColor: COLORS.COMPLIMENTARY,
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
