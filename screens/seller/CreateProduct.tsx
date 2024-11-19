import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import ScreenContextWrapper from "../../components/ScreenContextWrapper";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { Button, TextInput } from "react-native-paper";
import Select from "../../components/ui/Select";
import * as ImagePicker from "expo-image-picker";
import { categories, regionsByCountry } from "../../data/default";
import { getUserCountry, getUserLocation } from "../../utils/modules";
import { Snackbar } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { createProduct, getUserById } from "../../api/api";
import FormInput from "../../components/ui/FormInput";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useUser } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createObjectURL } from "../../utils";
import { Linking } from "react-native";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [imagePreview, setImagePreview] = useState([]);
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
  const [user, setUser] = useState<object>({});
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handlePriceChange = (text) => {
    const newPrice = text.replace(/[^0-9]/g, "");
    setPrice(newPrice);
  };

  useFocusEffect(
    useCallback(() => {
      const getUserInfo = async () => {
        try {
          const parsedUserInfo = JSON.parse(
            (await AsyncStorage.getItem("user")) || "{}"
          );
          const res = await getUserById(parsedUserInfo?._id);
          setUser(res?.data.user);
        } catch (error) {}
      };
      getUserInfo();
    }, [user?._id])
  );

  useEffect(() => {
    return () => {
      selectedFiles?.forEach((image) => {
        URL.revokeObjectURL(createObjectURL(image));
      });
    };
  }, [selectedFiles]);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      let newImages: any[] = [];

      // Directly iterate over event.target.files which is a FileList
      Array.from(event.target.files).forEach((file) => {
        newImages.push(file);
      });

      const mergedImages = [...selectedFiles, ...newImages];
      const maxImages = 20;
      const finalImages: any = mergedImages.slice(0, maxImages);

      setSelectedFiles(finalImages);
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      multiple: true,
    });

    if (!result.cancelled) {
      let newImages = [];

      // Check if assets array is available, otherwise fallback to single URI
      if (Array.isArray(result.assets)) {
        newImages = result.assets.map((asset) => ({
          uri: asset.uri,
          type: "image/jpeg",
          name: `${Date.now()}.jpg`,
        }));
      } else if (result.uri) {
        newImages.push({
          uri: result.uri,
          type: "image/jpeg",
          name: `${Date.now()}.jpg`,
        });
      }

      const mergedImages = [...images, ...newImages];
      const maxImages = 5;
      const finalImages = mergedImages.slice(0, maxImages);

      setImages(finalImages);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1); // Remove the image at the specified index
    setImages(newImages);
  };
  const removeFile = (index: number) => {
    const newImages = [...selectedFiles];
    newImages.splice(index, 1); // Remove the image at the specified index
    setSelectedFiles(newImages);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (
        !title ||
        !desc ||
        !selectedCountry ||
        !selectedCategory ||
        (!images.length && !selectedFiles.length)
      ) {
        setSnackbarMessage(
          "All fields are required and at least one image must be added"
        );
        setSnackbarVisible(true);
        return;
      }
      const newProduct = {
        title: title,
        description: desc,
        images: images,
        country: selectedCountry,
        region: selectedRegion,
        category: selectedCategory,
        price: price,
        userId: user._id,
      };
      const newWebProduct = {
        title: title,
        description: desc,
        images: selectedFiles,
        country: selectedCountry,
        region: selectedRegion,
        category: selectedCategory,
        price: price,
        userId: user._id,
      };

      const response = await createProduct(
        Platform.OS === "web" ? newWebProduct : newProduct
      );
      navigation.navigate("MyProducts");
      setSnackbarMessage("Product created successfully");
      setSnackbarVisible(true);
      setTitle("");
      setDesc("");
      setImages([]);
      setSelectedCountry("");
      setSelectedRegion("");
      setPrice("");
    } catch (error) {
      setSnackbarMessage(error);
      setSnackbarMessage(error.response.data);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          <Select
            touchableText={selectedCategory || "Category*"} // Display the selected category or the placeholder text
            title="Categories"
            options={categories}
            onSelect={(selectedOption) => setSelectedCategory(selectedOption)} // Update the selected category state
          />
          <Text style={{ fontFamily: "PoppinsRegular" }}>Add a photo</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              {Platform.OS === "web" ? (
                <>
                  {selectedFiles?.map((image, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image
                        source={{
                          uri: createObjectURL(image) || imagePreview,
                        }}
                        style={styles.image}
                      />
                      <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={() => removeFile(index)}
                      >
                        <Text style={styles.removeImageText}>x</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              ) : (
                <>
                  {images.map((image, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image
                        source={{
                          uri: image.uri || imagePreview,
                        }}
                        style={styles.image}
                      />
                      <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={() => removeImage(index)}
                      >
                        <Text style={styles.removeImageText}>x</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
              {Platform.OS === "web" ? (
                <>
                  <input
                    id="productImageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Hide the default file input
                  />
                  <label htmlFor="productImageUpload">
                    <TouchableOpacity style={styles.addImageBox}>
                      <Text style={{ fontSize: 20, color: COLORS.PRIMARY }}>
                        +
                      </Text>
                    </TouchableOpacity>
                  </label>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.addImageBox}
                  onPress={pickImage}
                >
                  <Text style={{ fontSize: 20, color: COLORS.PRIMARY }}>+</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
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
              value="Post"
              loading={loading}
              onPress={handleSubmit}
            />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>
            By clicking on Product, you accept the{" "}
            <Text
              style={{ textDecorationLine: "underline", color: COLORS.PRIMARY }}
              onPress={() =>
                Linking.openURL(
                  "https://www.termsfeed.com/live/ba293553-5fc9-4f66-be64-9613b78987e8"
                )
              }
            >
              Terms of Use
            </Text>
            , confirm that you will abide by the Safety Tips, and declare that
            this posting does not include any Prohibited Products.
          </Text>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={Snackbar.DURATION_SHORT}
          >
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
    fontFamily: "PoppinsRegular",
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
    fontFamily: "PoppinsRegular",
  },
  createProduct: {
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
    fontFamily: "PoppinsRegular",
  },
});

export default CreateProduct;
