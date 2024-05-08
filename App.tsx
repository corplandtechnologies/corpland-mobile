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
        InterExtraBold: require("./fonts/Inter/static/Inter-ExtraBold.ttf"),
        InterBold: require("./fonts/Inter/static/Inter-Bold.ttf"),
        InterRegular: require("./fonts/Inter/static/Inter-Regular.ttf"),
        InterLight: require("./fonts/Inter/static/Inter-light.ttf"),
        InterThin: require("./fonts/Inter/static/Inter-Thin.ttf"),
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
      <Stack.Navigator initialRouteName="OnBoarding">
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
            headerShown: false ,
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
