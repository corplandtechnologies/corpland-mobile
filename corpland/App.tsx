import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./routes/TabNavigator";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";
import Onboarding from "./screens/Onboarding";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
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
