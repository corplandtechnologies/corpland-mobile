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

  if (searchResults?.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>Oops! No Products found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <ScrollView>
        {searchResults?.map((result) => (
          <SearchResult
            key={result._id}
            image={result.images[0]}
            title={result.title}
            price={result.price}
            region={result.region}
            description={result.description}
            userDetails={result?.userDetails}
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
    gap: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY,
  },
  emptyStateText: {
    fontSize: 18,
    color: COLORS.PRIMARY,
    fontFamily: "InterBold",
  },
});
