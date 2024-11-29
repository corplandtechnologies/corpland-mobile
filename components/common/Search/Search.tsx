import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { COLORS } from "../../../utils/color";

interface SearchProps {
  onChangeText: (text: string) => void;
  value: string;
}

const Search: React.FC<SearchProps> = ({ onChangeText, value }) => {
  return (
    <Searchbar
      value={value}
      onChangeText={onChangeText}
      placeholder="Search for your location..."
      style={styles.search}
      placeholderTextColor={COLORS.GRAY}
      cursorColor={COLORS.PRIMARY}
    />
  );
};

export default Search;

const styles = StyleSheet.create({
  search: {
    borderRadius: 10,
    backgroundColor: COLORS.SECONDARY,
    marginVertical: 10,
    elevation: 5,
    shadowColor: COLORS.GRAY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHTER,
  },
});
