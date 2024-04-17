import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import ScreenContextWrapper from "../../components/ScreenContextWrapper";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { useFonts } from "expo-font";
import { Button, TextInput } from "react-native-paper";
import Select from "../../components/ui/Select";
import * as ImagePicker from "expo-image-picker";
import { categories, regionsByCountry } from "../../data/dummyData";
import { getUserCountry, getUserLocation } from "../../utils/modules";

const CreateRequest = () => {
  const [fontsLoaded] = useFonts({
    PoppinsExtraBold: require("../../fonts/Poppins/Poppins-ExtraBold.ttf"),
    RalewayRegular: require("../../fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsLight: require("../../fonts/Poppins/Poppins-Light.ttf"),
  });
  const [image, setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  useEffect(() => {
    const fetchLocationOptions = async () => {
      const location = await getUserLocation();
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
    };

    fetchLocationOptions();
  }, []);

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
    }
  };

  const removeImage = () => {
    setImage("");
  };
  return (
    <ScreenContextWrapper>
      <Card>
        <Text style={{ fontFamily: "RalewayRegular" }}>Add a photo</Text>
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
            <Text style={{ fontSize: 20, color: COLORS.COMPLIMENTARY }}>+</Text>
          </TouchableOpacity>
        </View>
      </Card>
      <Card>
        <TextInput
          mode="outlined"
          placeholder="What do you need?"
          label={"Title"}
          outlineColor={COLORS.COMPLIMENTARY}
          activeOutlineColor={COLORS.PRIMARY}
          style={styles.textInput}
        />
        <TextInput
          mode="outlined"
          placeholder="Some more details to take note of?"
          label={"Description"}
          activeOutlineColor={COLORS.PRIMARY}
          multiline={true}
          style={styles.textInput}
        />
        <TextInput
          mode="outlined"
          placeholder="Contact this number if available"
          label={"Phone Number"}
          keyboardType="numeric"
          activeOutlineColor={COLORS.PRIMARY}
          multiline={true}
          style={styles.textInput}
        />
        <Select
          touchableText={selectedCategory || "Category*"} // Display the selected category or the placeholder text
          title="Categories"
          options={categories}
          onSelect={(selectedOption) => setSelectedCategory(selectedOption)} // Update the selected category state
        />
        <Select
          touchableText={selectedLocation || "Location*"}
          title="Location"
          options={locationOptions}
          onSelect={(selectedOption) => setSelectedLocation(selectedOption)}
        />
      </Card>
      <Card>
        <TouchableOpacity>
          <Button
            icon="post"
            mode="contained"
            onPress={() => console.log("Pressed")}
            style={styles.createRequest}>
            Request
          </Button>
        </TouchableOpacity>

        <Text style={{ textAlign: "center" }}>
          By clicking on Request, you accept the Terms of Use , confirm that you
          will abide by the Safety Tips, and declare that this posting does not
          include any Prohibited Requests.
        </Text>
      </Card>
    </ScreenContextWrapper>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontFamily: "RalewayRegular",
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
    fontFamily: "RalewayRegular",
    height: "100%",
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
    fontFamily: "RalewayRegular",
  },
});

export default CreateRequest;
