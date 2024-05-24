import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../utils/color";
import Banner from "../components/Banner";
import FormInput from "../components/ui/FormInput";
import Section from "../components/Section";
import Category from "../components/Category";
import { storeCatergories } from "../data/dummyData";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { searchProducts } from "../api/api";
import { Snackbar } from "react-native-paper";
import { useSearchResults } from "../context/SearchResultsContext";

const Home = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false); // New state for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { setSearchResults } = useSearchResults();

  const navigation = useNavigation();

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (!search) {
        setSnackbarMessage("All fields are required");
        setSnackbarVisible(true);
        return;
      }
      const res = await searchProducts(search);
      setSearchResults(res.data)
      setSnackbarVisible(true);
      setSnackbarMessage("Search Completed!");
      setSearch("")
      navigation.navigate("Search");
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
        {/* <UserInfo navigation={navigation} /> */}
        <FormInput
          icon="search"
          placeholder="What are you looking for?..."
          isButtoned={true}
          isButtonedIcon="options"
          onChangeText={setSearch}
          loading={loading}
          onPress={handleSearch}
        />
        <Banner />
        <View style={styles.sectionView}>
          <Section headerText="Categories">
            <View style={styles.catView}>
              {storeCatergories.map((category, index) => (
                <TouchableOpacity key={index}>
                  <Category
                    iconImagePath={category.iconImagePath}
                    category={category.categoryName}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </Section>
          <Section headerText="Featured">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </ScrollView>
          </Section>
          <Section headerText="Trending">
            <ScrollView horizontal={true}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </ScrollView>
          </Section>
        </View>
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Close",
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.SECONDARY,
    height: "100%",
  },
  infoView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationText: {
    color: COLORS.PRIMARY,
    fontWeight: "900",
    fontSize: 20,
  },
  greetView: {},
  greetText: {
    fontWeight: "900",
    fontSize: 36,
  },

  SectionHeader: {
    fontWeight: "700",
    fontSize: 24,
  },
  sectionView: {
    marginTop: 20,
    gap: 20,
  },
  catView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productView: {},
});

export default Home;
