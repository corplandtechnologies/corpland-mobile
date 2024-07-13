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
import { categories, regionsByCountry } from "../../data/dummyData";
import { getUserCountry, getUserLocation } from "../../utils/modules";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createProduct, deleteProduct, updateProduct } from "../../api/api";
import FormInput from "../../components/ui/FormInput";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useUser } from "../../context/UserContext";
import ConfirmationModal from "../../components/ConfirmationModal";
import { createObjectURL } from "../../utils";

const EditProduct = ({ route }) => {
  const { user } = useUser();
  const product = route.params.product;
  console.log(product);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(product.image);
  const [newImages, setNewImages] = useState(product.images);
  const [images, setImages] = useState([...product?.images]);
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
  const [loading, setLoading] = useState(false);
  console.log("product Images", images);

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
        console.log(location);
        console.log(country);

        if (country && country in regionsByCountry) {
          // If it is, set locationOptions to the array of regions for that country
          setLocationOptions(
            regionsByCountry[country as keyof typeof regionsByCountry]
          );
          console.log(locationOptions);
        } else {
          // Default to global locations if user is not in a specific region
          console.log(regionsByCountry);
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

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (typeof image === "object") {
          URL.revokeObjectURL(createObjectURL(image));
        }
      });
    };
  }, [images]);

  const handleCountrySelect = (selectedOption: string) => {
    setSelectedCountry(selectedOption);
    // Update region options based on the selected country
    setRegionOptions(regionsByCountry[selectedOption]);
  };

  const handleRegionSelect = (selectedOption: string) => {
    setSelectedRegion(selectedOption);
    // Handle the selected region
  };

  // Inside EditProduct.tsx
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      let newImages: any[] = [];

      // Directly iterate over event.target.files which is a FileList
      Array.from(event.target.files).forEach((file) => {
        newImages.push(file);
      });

      const mergedImages = [...images, ...newImages];
      const maxImages = 20;
      const finalImages = mergedImages.slice(0, maxImages);

      setImages(finalImages);
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
      const maxImages = 5; // Adjusted to match CreateProduct.tsx
      const finalImages = mergedImages.slice(0, maxImages);

      setImages(finalImages);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      setSnackbarMessage("You need at least one photo!");
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    try {
      const newProduct = {
        title: title || product.title,
        description: desc || product.description,
        images: images,
        country: selectedCountry || product.country,
        region: selectedRegion || product.region,
        category: selectedCategory || product.category,
        price: price || product.price,
        userId: user._id || product.userId,
      };

      console.log("New Product data",newProduct);

      const response = await updateProduct(newProduct, product._id);
      console.log(response.data);
      navigation.navigate("MyProducts");
      setSnackbarMessage("Product created successfully");
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
            onSelect={(selectedOption) => setSelectedCategory(selectedOption)}
            initialValue={product.category}
          />
          <Text style={{ fontFamily: "InterRegular" }}>Add a photo</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              {images.map((image, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image
                    source={{
                      uri:
                        typeof image === "object"
                          ? createObjectURL(image)
                          : image || image.uri,
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
                      <Text
                        style={{ fontSize: 20, color: COLORS.COMPLIMENTARY }}
                      >
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
                  <Text style={{ fontSize: 20, color: COLORS.COMPLIMENTARY }}>
                    +
                  </Text>
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
            initialValue={product.country}
          />
          {selectedCountry && (
            <Select
              touchableText={selectedRegion || "Region*"} // Display the selected category or the placeholder text
              title="Region"
              options={regionOptions}
              onSelect={handleRegionSelect}
              initialValue={product.region}
            />
          )}
          <FormInput
            placeholder="Title*"
            onChangeText={setTitle}
            icon="header"
            defaultValue={product.title}
          />
          <FormInput
            placeholder="Description*"
            onChangeText={setDesc}
            icon="align-justify"
            style={styles.textInputDesc}
            multiline={true}
            defaultValue={product.description}
          />
          <FormInput
            placeholder="Price(GH₵)*"
            onChangeText={handlePriceChange}
            icon="money"
            style={styles.textInputDesc}
            multiline={true}
            keyboardType="numeric"
            defaultValue={product.price.toString()}
          />
          <TouchableOpacity>
            <PrimaryButton
              value="Post"
              loading={loading}
              onPress={handleSubmit}
            />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>
            By clicking on Product, you accept the Terms of Use , confirm that
            you will abide by the Safety Tips, and declare that this posting
            does not include any Prohibited Products.
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
    fontFamily: "InterRegular",
  },
});

export default EditProduct;
