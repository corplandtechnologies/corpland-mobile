import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
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
import { categories, regionsByCountry } from "../../data/default";
import { getUserCountry, getUserLocation } from "../../utils/modules";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createRequest, deleteRequest, updateRequest } from "../../api/api";
import FormInput from "../../components/ui/FormInput";
import PrimaryButton from "../../components/ui/PrimaryButton";
import ConfirmationModal from "../../components/ConfirmationModal";
import { createObjectURL } from "../../utils";
import { useApp } from "../../context/AppContext";
import TextElement from "../../components/elements/Texts/TextElement";

const EditRequest = ({ route }) => {
  const { user } = useApp();
  const request = route.params.request;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(request.image);
  const [newImages, setNewImages] = useState(request.images);
  const [images, setImages] = useState([
    ...(request?.images || []).filter(Boolean),
  ]);
  const [selectedFiles, setSelectedFiles] = useState(
    Platform.OS === "web" ? [...(request?.images || []).filter(Boolean)] : []
  );
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
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation: any = useNavigation();

  const handleMinPriceChange = (text: string) => {
    const newPrice = text.replace(/[^0-9]/g, "");
    setMinPrice(newPrice);
  };

  const handleMaxPriceChange = (text: string) => {
    const newPrice = text.replace(/[^0-9]/g, "");
    setMaxPrice(newPrice);
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

  if (Platform.OS === "web") {
    useEffect(() => {
      return () => {
        selectedFiles.forEach((image) => {
          if (typeof image === "object") {
            URL.revokeObjectURL(createObjectURL(image));
          }
        });
      };
    }, [selectedFiles]);
  }

  const handleCountrySelect = (selectedOption: string) => {
    setSelectedCountry(selectedOption);
    // Update region options based on the selected country
    setRegionOptions(regionsByCountry[selectedOption]);
  };

  const handleRegionSelect = (selectedOption: string) => {
    setSelectedRegion(selectedOption);
    // Handle the selected region
  };

  // Inside EditRequest.tsx
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    });

    if (!result.cancelled) {
      let newImages = [];

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
      const maxImages = 20;
      const finalImages = mergedImages.slice(0, maxImages);

      setImages(finalImages);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const removeFile = (index: number) => {
    const newImages = [...selectedFiles];
    newImages.splice(index, 1); // Remove the image at the specified index
    setSelectedFiles(newImages);
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      setSnackbarMessage("You need at least one photo!");
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    try {
      const newRequest = {
        title: title || request.title,
        description: desc || request.description,
        images: images,
        country: selectedCountry || request.country,
        region: selectedRegion || request.region,
        category: selectedCategory || request.category,
        price: price || request.price,
        userId: user._id || request.userId,
      };

      const newWebRequest = {
        title: title || request.title,
        description: desc || request.description,
        images: selectedFiles,
        country: selectedCountry || request.country,
        region: selectedRegion || request.region,
        category: selectedCategory || request.category,
        price: price || request.price,
        userId: user._id || request.userId,
      };

      const response = await updateRequest(
        Platform.OS === "web" ? newWebRequest : newRequest,
        request._id
      );
      navigation.navigate("MyRequests");
      setSnackbarMessage("Request created successfully");
      setSnackbarVisible(true);
      setTitle("");
      setDesc("");
      setImage("");
      setSelectedCountry("");
      setSelectedRegion("");
      setPrice("");
    } catch (error) {
      let errorMessage = "An unexpected error occurred.";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.message || error.response.statusText;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response received from the server.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }
      setSnackbarMessage(errorMessage);
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
            onSelect={(selectedOption) => setSelectedCategory(selectedOption)}
            initialValue={request.category}
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
                          uri:
                            typeof image === "object"
                              ? createObjectURL(image)
                              : image,
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
                          uri: image?.uri || image,
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
                    id="requestImageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Hide the default file input
                  />
                  <label htmlFor="requestImageUpload">
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
            initialValue={request.country}
          />
          {selectedCountry && (
            <Select
              touchableText={selectedRegion || "Region*"} // Display the selected category or the placeholder text
              title="Region"
              options={regionOptions}
              onSelect={handleRegionSelect}
              initialValue={request.region}
            />
          )}
          <FormInput
            placeholder="Title*"
            onChangeText={setTitle}
            icon="header"
            defaultValue={request.title}
          />
          <FormInput
            placeholder="Description*"
            onChangeText={setDesc}
            icon="align-justify"
            style={styles.textInputDesc}
            multiline={true}
            defaultValue={request.description}
          />
          <View style={styles.priceRangeView}>
            <View style={{ flex: 1 }}>
              <FormInput
                placeholder="Price(GH₵)*"
                onChangeText={handleMinPriceChange}
                icon="money"
                style={styles.textInputDesc}
                multiline={true}
                keyboardType="numeric"
                defaultValue={request?.minPrice.toString()}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextElement>to</TextElement>
            </View>
            <View style={{ flex: 1 }}>
              <FormInput
                placeholder="Price(GH₵)*"
                onChangeText={handleMaxPriceChange}
                icon="money"
                style={styles.textInputDesc}
                multiline={true}
                keyboardType="numeric"
                value={request?.maxPrice.toString()}
              />
            </View>
          </View>
          <TouchableOpacity>
            <PrimaryButton
              value="Post"
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
    fontFamily: "PoppinsRegular",
  },
  priceRangeView: {
    flexDirection: "row",
    gap: 10,
  },
});

export default EditRequest;
