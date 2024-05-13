import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={user ? "TabNavigator" : "OnBoarding"}>
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
          </Stack.Navigator>
        </NavigationContainer>
      </SellerModeProvider>
    </UserProvider>
  );
}
