import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../utils/color";
import Banner from "../components/Banner";
import FormInput from "../components/ui/FormInput";
import Section from "../components/Section";
import Category from "../components/Category";
import { storeCatergories } from "../data/default";
import ProductCard from "../components/ProductCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  getProducts,
  getTrendingProducts,
  getUserById,
  searchProducts,
} from "../api/api";
import { Snackbar } from "react-native-paper";
import { useSearchResults } from "../context/SearchResultsContext";
import { getStorageItem, handleError } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApp } from "../context/AppContext";

const Home = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false); // New state for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { setSearchResults } = useSearchResults();
  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation: any = useNavigation();
  const { user, setUser } = useApp();
  const [searchLoading, setSearchLoading] = useState(false);

  // useEffect(() => {
  //   const getLoggedInUser = async () => {
  //     const user = await getStorageItem("user");
  //     if (!user) {
  //       alert("Please Login to continue using Corpland. Thank you!");
  //       navigation.navigate("Login");
  //       return;
  //     }
  //   };
  //   getLoggedInUser();
  // }, []);

  const handleSearch = async (
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoadingState(true);
    if (!search) {
      setSnackbarMessage("All fields are required");
      setSnackbarVisible(true);
      return;
    }
    try {
      const res = await searchProducts(search);
      setSearchResults(res.data);
      setLoadingState(false);
      setSnackbarVisible(true);
      setSnackbarMessage("Search Completed!");
      navigation.navigate("Search");
    } catch (error) {
      console.log(error);
      setSnackbarMessage(handleError(error));
      setSnackbarVisible(true);
      setLoadingState(false);
    } finally {
      setLoadingState(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      const res = await getTrendingProducts();
      setProducts(response.data);
      setTrendingProducts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchUser = async () => {
    try {
      const userInfo: any = await AsyncStorage.getItem("user");
      const parsedUserInfo = JSON.parse(userInfo);
      const res: any = await getUserById(parsedUserInfo?._id);
      setUser(res?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSeeAll = (routeName: string, title: string) => {
    navigation.navigate(routeName, { title });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              try {
                fetchProducts();
                fetchUser();
                setRefreshing(false);
              } catch (error) {
                setRefreshing(false);
              }
            }}
          />
        }
      >
        {/* <UserInfo navigation={navigation} /> */}

        <FormInput
          icon="search"
          placeholder="What are you looking for?..."
          isButtoned={true}
          isButtonedIcon="options"
          onChangeText={setSearch}
          loading={searchLoading}
          onPress={() => handleSearch(setSearchLoading)}
        />
        <Banner />
        <View style={styles.sectionView}>
          <Section
            headerText="Categories"
            onPress={() => {
              navigation.navigate("Categories");
            }}
          >
            <View style={styles.catView}>
              {storeCatergories.slice(0, 4).map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("ProductDisplay", {
                      category: category.category,
                    })
                  }
                >
                  <Category
                    iconImagePath={category.iconImagePath}
                    category={category.category}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </Section>
          <Section
            headerText="Discover"
            onPress={(routeName) => handleSeeAll(routeName, "Discover")}
            routeName="ProductGrids"
          >
            {loading ? (
              <ActivityIndicator color={COLORS.PRIMARY} />
            ) : (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {products?.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </ScrollView>
            )}
          </Section>
          {trendingProducts?.length > 0 && (
            <Section
              headerText="Trending"
              onPress={(routeName) => handleSeeAll(routeName, "Trending")}
              routeName="ProductGrids"
            >
              {loading ? (
                <ActivityIndicator color={COLORS.PRIMARY} />
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {trendingProducts?.map((product, index) => (
                    <ProductCard key={index} product={product.product} />
                  ))}
                </ScrollView>
              )}
            </Section>
          )}
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
        }}
      >
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
  productView: {
    gap: 20,
  },
});

export default Home;
