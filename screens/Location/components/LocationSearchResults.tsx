import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import TextElement from "../../../components/elements/Texts/TextElement";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../utils/color";
import Hr from "../../../components/elements/HR/Hr";

interface LocationSearchResultsProps {
  predictions: any;
  onPress: () => void;
}

const LocationSearchResults: FC<LocationSearchResultsProps> = ({
  predictions,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.searchResult}>
          <Ionicons name="paper-plane" size={24} color={COLORS.TERTIARY} />
          <TextElement>
            {predictions.structured_formatting.main_text}
          </TextElement>
        </View>
        <TextElement color={COLORS.TERTIARY} fontFamily="poppinsMedium">
          {predictions.structured_formatting.secondary_text}
        </TextElement>
      </TouchableOpacity>
    </View>
  );
};

export default LocationSearchResults;

const styles = StyleSheet.create({
  searchResult: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  container: {
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
    paddingVertical: 10,
  },
});
