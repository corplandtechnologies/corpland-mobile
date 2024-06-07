import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../utils/color";
import SearchResult from "../components/SearchResult";
import { useSearchResults } from "../context/SearchResultsContext";

const Search = () => {
  const { searchResults } = useSearchResults();
  console.log(searchResults?.map((item) => item.userDetails));

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={{ height: "100%", gap: 10 }}>
        {searchResults?.map((result) => (
          <SearchResult
            key={result._id}
            image={result.image}
            title={result.title}
            price={result.price}
            region={result.region}
            description={result.description}
            userDetails={result.userDetails}
            _id={result._id}
            dials={result.dials}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
    padding: 10,
    gap: 10,
  },
});
