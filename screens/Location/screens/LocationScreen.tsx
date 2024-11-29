import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import MainView from "../../../components/elements/Views/MainView";
import Search from "../../../components/common/Search/Search";
import LocationSearchResults from "../components/LocationSearchResults";
import TextElement from "../../../components/elements/Texts/TextElement";
import { COLORS } from "../../../utils/color";
import { dummyPredictions } from "../../../data/default";

const LocationScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [predictions, setPredictions] = useState([]);

  const searchPlaces = (text: string) => {
    setSearchQuery(text);
  };
  const clearText = () => {
    setSearchQuery("");
  };

  return (
    <MainView style={styles.mainView}>
      <Search
        onChangeText={searchPlaces}
        value={searchQuery}
        clearText={clearText}
        style={styles.search}
      />
      <TouchableOpacity style={styles.currentLocationButton}>
        <Ionicons name="paper-plane" size={24} color={COLORS.PRIMARY} />
        <TextElement>Use my current location</TextElement>
      </TouchableOpacity>
      <TextElement color={COLORS.TERTIARY}>SEARCH RESULT</TextElement>

      <FlatList
        data={dummyPredictions}
        renderItem={({ item }) => (
          <LocationSearchResults predictions={item} onPress={() => {}} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
    </MainView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  currentLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  mainView: {
    paddingHorizontal: 10,
    gap: 10,
  },
});
