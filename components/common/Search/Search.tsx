import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../../utils/color";
import { SearchProps } from "./search.interfaces";
import { useTheme } from "../../../context/ThemeContext";
import TextInputElement from "../TextInputElement/TextInputElement";

const Search: React.FC<SearchProps> = ({ onChangeText, placeholder }) => {
  const { theme } = useTheme();
  return (
    <TextInputElement
      onChangeText={onChangeText}
      placeholder={placeholder}
      isButtoned
      buttonIconName={"search"}
    />
  );
};

export default Search;

const styles = StyleSheet.create({});
