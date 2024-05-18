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

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <UserInfo navigation={navigation} /> */}
        <FormInput
          icon="search"
          placeholder="What are you looking for?..."
          isButtoned={true}
          isButtonedIcon="options"
          onChangeText={setSearch}
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
          <Section headerText="Trending">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
          </Section>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
