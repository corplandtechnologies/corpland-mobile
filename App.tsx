import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./routes/TabNavigator";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";
import Onboarding from "./screens/Onboarding";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();

export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        RalewayExtraBold: require("./fonts/Raleway/static/Raleway-ExtraBold.ttf"),
        RalewayBold: require("./fonts/Raleway/static/Raleway-Bold.ttf"),
        RalewayRegular: require("./fonts/Raleway/static/Raleway-Bold.ttf"),
        PoppinsExtraBold: require("./fonts/Poppins/Poppins-ExtraBold.ttf"),
        PoppinsBold: require("./fonts/Poppins/Poppins-Bold.ttf"),
        PoppinsRegular: require("./fonts/Poppins/Poppins-Regular.ttf"),
        PoppinsLight: require("./fonts/Poppins/Poppins-Light.ttf"),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!isFontLoaded) {
    return null; // or a loading indicator
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigator">
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
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="OnBoarding"
          options={{ headerShown: false }}
          component={Onboarding}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
