import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import ScreenContextWrapper from "../../components/ScreenContextWrapper";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { Button, TextInput } from "react-native-paper";
import Select from "../../components/ui/Select";
import * as ImagePicker from "expo-image-picker";
import { categories, regionsByCountry } from "../../data/dummyData";
import { getUserCountry, getUserLocation } from "../../utils/modules";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createRequest } from "../../api/api";
import FormInput from "../../components/ui/FormInput";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useUser } from "../../context/UserContext";

const CreateRequest = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  const [imageObject, setImageObject] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [locationRefused, setLocationRefused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [countryOptions, setCountryOptions] = useState<string[]>([]);
  const [regionOptions, setRegionOptions] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handlePriceChange = (text) => {
    const newPrice = text.replace(/[^0-9]/g, "");
    setPrice(newPrice);
  };

  useEffect(() => {
    const fetchLocationOptions = async () => {
      const location = await getUserLocation();
      if (location) {
        // Location granted, proceed as usual
        const country = await getUserCountry(location);

        if (country && country in regionsByCountry) {
          // If it is, set locationOptions to the array of regions for that country
          setLocationOptions(
            regionsByCountry[country as keyof typeof regionsByCountry]
          );
        } else {
          // Default to global locations if user is not in a specific region
        }
      } else {
        // Location refused, set locationRefused to true
        setLocationRefused(true);
        // Set country options based on regionsByCountry
        setCountryOptions(Object.keys(regionsByCountry));
      }
    };

    fetchLocationOptions();
  }, []);

  const handleCountrySelect = (selectedOption: string) => {
    setSelectedCountry(selectedOption);
    // Update region options based on the selected country
    setRegionOptions(regionsByCountry[selectedOption]);
  };

  const handleRegionSelect = (selectedOption: string) => {
    setSelectedRegion(selectedOption);
    // Handle the selected region
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageObject(result.assets[0]);
    }
  };

  const removeImage = () => {
    setImage("");
  };

  // CreateRequest.tsx

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!title || !desc || !selectedCountry || !selectedCategory) {
        setSnackbarMessage("All fields are required");
        setSnackbarVisible(true);
        return;
      }
      const newRequest = {
        title: title,
        description: desc,
        image: image,
        country: selectedCountry,
        region: selectedRegion,
        category: selectedCategory,
        price: price,
        userId: user._id,
      };
      const response = await createRequest(newRequest);
      navigation.navigate("Home");
      setSnackbarMessage("Request created successfully");
      setSnackbarVisible(true);
      setTitle("");
      setDesc("");
      setImage("");
      setSelectedCountry("");
      setSelectedRegion("");
      setPrice("");
    } catch (error) {
      console.log(error);
      setSnackbarMessage(error.response.data);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <Select
            touchableText={selectedCategory || "Category*"} // Display the selected category or the placeholder text
            title="Categories"
            options={categories}
            onSelect={(selectedOption) => setSelectedCategory(selectedOption)} // Update the selected category state
          />
          <Text style={{ fontFamily: "InterRegular" }}>Add a photo</Text>
          <View style={styles.imageContainer}>
            {image && (
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={removeImage}>
                  <Text style={styles.removeImageText}>x</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              style={styles.addImageBox}
              onPress={pickImage}>
              <Text style={{ fontSize: 20, color: COLORS.COMPLIMENTARY }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <Select
            touchableText={selectedCountry || "Country*"} // Display the selected category or the placeholder text
            title="Country"
            options={Object.keys(regionsByCountry)}
            onSelect={handleCountrySelect}
            locationRefused={locationRefused}
          />
          {selectedCountry && (
            <Select
              touchableText={selectedRegion || "Region*"} // Display the selected category or the placeholder text
              title="Region"
              options={regionOptions}
              onSelect={handleRegionSelect}
            />
          )}
          <FormInput
            placeholder="Title*"
            onChangeText={setTitle}
            icon="header"
          />
          <FormInput
            placeholder="Description*"
            onChangeText={setDesc}
            icon="align-justify"
            style={styles.textInputDesc}
            multiline={true}
          />
          <FormInput
            placeholder="Price(GH₵)*"
            onChangeText={handlePriceChange}
            icon="money"
            style={styles.textInputDesc}
            multiline={true}
            keyboardType="numeric"
          />
          <TouchableOpacity>
            <PrimaryButton
              value="Request"
              loading={loading}
              onPress={handleSubmit}
            />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>
            By clicking on Request, you accept the Terms of Use , confirm that
            you will abide by the Safety Tips, and declare that this posting
            does not include any Prohibited Requests.
          </Text>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={Snackbar.DURATION_SHORT}>
            {snackbarMessage}
          </Snackbar>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
  },
  wrapper: {
    gap: 15,
    padding: 20,
  },
  textInput: {
    fontFamily: "InterRegular",
    backgroundColor: COLORS.SECONDARY,
  },
  addImageBox: {
    backgroundColor: COLORS.TERTIARY,
    height: 100,
    width: 100,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputDesc: {
    paddingLeft: 10,
    fontFamily: "InterRegular",
  },
  createRequest: {
    backgroundColor: COLORS.PRIMARY,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  imageWrapper: {
    position: "relative",
    width: 100,
    height: 100,
  },
  removeImageButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: COLORS.TRANSPARENT,
    borderRadius: 9999,
    height: 25,
    width: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  removeImageText: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    fontFamily: "InterRegular",
  },
});

export default CreateRequest;
