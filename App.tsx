import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./routes/TabNavigator";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";
import Onboarding from "./screens/Onboarding";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import Verify from "./screens/auth/Verify";
import BackButton from "./components/ui/BackButton";
import CompleteProfile from "./screens/auth/CompleteProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SellerModeProvider } from "./context/SellerModeContext";
import { UserProvider } from "./context/UserContext";
import Search from "./screens/Search";
import { SearchResultsProvider } from "./context/SearchResultsContext";
import Product from "./screens/Product";
import { COLORS } from "./utils/color";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FavoriteIcon from "./components/ui/FavoriteIcon";
import { ProductProvider, useProduct } from "./context/ProductContext";
import Categories from "./screens/Categories";
import EditProfile from "./screens/auth/EditProfile";
import MyProducts from "./screens/seller/MyProducts";
import EditProduct from "./screens/seller/EditProduct";
import ProductDisplay from "./screens/ProductDisplay";

const Stack = createStackNavigator();

export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        InterExtraBold: require("./fonts/Inter/static/Inter-ExtraBold.ttf"),
        InterBold: require("./fonts/Inter/static/Inter-Bold.ttf"),
        InterMedium: require("./fonts/Inter/static/Inter-Medium.ttf"),
        InterRegular: require("./fonts/Inter/static/Inter-Regular.ttf"),
        InterLight: require("./fonts/Inter/static/Inter-light.ttf"),
        InterThin: require("./fonts/Inter/static/Inter-Thin.ttf"),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("user");
        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          setUser(parsedUserInfo._id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  if (!isFontLoaded) {
    return null; // or a loading indicator
  }
  return (
    <UserProvider>
      <SellerModeProvider>
        <SearchResultsProvider>
          <ProductProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={
                  user === null ? "OnBoarding" : "TabNavigator"
                }>
                <Stack.Screen
                  name="TabNavigator"
                  options={{ headerShown: false }}
                  component={TabNavigator}
                />
                <Stack.Screen
                  name="Register"
                  options={{ headerShown: false }}
                  component={Register}
                />
                <Stack.Screen
                  name="Login"
                  options={{
                    headerShown: false,
                    headerTitle: "Sign In",
                    headerTitleStyle: {
                      fontFamily: "InterBold",
                      // borderWidth:8
                    },
                  }}
                  component={Login}
                />
                <Stack.Screen
                  name="OnBoarding"
                  options={{ headerShown: false }}
                  component={Onboarding}
                />
                <Stack.Screen
                  name="Verify"
                  options={{
                    headerTitle: "",
                    headerLeft: () => <BackButton />,
                  }}
                  component={Verify}
                />
                <Stack.Screen
                  name="CompleteProfile"
                  options={{
                    headerTitle: "",
                    headerLeft: () => <BackButton />,
                  }}
                  component={CompleteProfile}
                />
                <Stack.Screen
                  name="ProductDisplay"
                  options={{
                    headerTitle: "Products",
                    headerLeft: () => <BackButton />,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                      fontFamily: "InterBold",
                    },
                  }}
                  component={ProductDisplay}
                />
                <Stack.Screen
                  name="Search"
                  options={{
                    headerTitle: "Results",
                    headerTitleAlign: "center",
                    headerLeft: () => <BackButton />,
                    headerTitleStyle: {
                      fontFamily: "InterBold",
                      // borderWidth:8
                    },
                  }}
                  component={Search}
                />
                <Stack.Screen
                  name="Product"
                  options={{
                    headerTitle: "",
                    headerTitleAlign: "center",
                    headerLeft: () => <BackButton details />,
                    headerRight: () => {
                      const { productId } = useProduct();

                      return (
                        <FavoriteIcon
                          productId={productId} // Use the local state instead of the context
                          style={{
                            padding: 15,
                            marginRight: 10,
                          }}
                        />
                      );
                    },
                    headerTransparent: true,
                  }}
                  component={Product}
                />

                <Stack.Screen
                  name="Categories"
                  options={{
                    headerTitle: "Categories",
                    headerTitleAlign: "center",
                    headerLeft: () => <BackButton />,
                    headerTitleStyle: {
                      fontFamily: "InterBold",
                      // borderWidth:8
                    },
                  }}
                  component={Categories}
                />
                <Stack.Screen
                  name="EditProfile"
                  options={{
                    headerTitle: "",
                    headerTitleAlign: "center",
                    headerLeft: () => <BackButton />,
                  }}
                  component={EditProfile}
                />
                <Stack.Screen
                  name="EditProduct"
                  options={{
                    headerTitle: "Edit Your Product",
                    headerTitleAlign: "center",
                    headerLeft: () => <BackButton />,
                    headerTitleStyle: {
                      fontFamily: "InterBold",
                    },
                  }}
                  component={EditProduct}
                />
                <Stack.Screen
                  name="MyProducts"
                  options={{
                    headerTitle: "My Products",
                    headerTitleAlign: "center",
                    headerLeft: () => <BackButton />,
                    headerTitleStyle: {
                      fontFamily: "InterBold",
                      // borderWidth:8
                    },
                  }}
                  component={MyProducts}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ProductProvider>
        </SearchResultsProvider>
      </SellerModeProvider>
    </UserProvider>
  );
}
