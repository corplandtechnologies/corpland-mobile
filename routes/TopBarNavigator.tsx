import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Active from "../screens/Orders/Active";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Active"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "powderblue" },
      }}
    >
      <Tab.Screen
        name="Active"
        component={Active}
        options={{ tabBarLabel: "Active" }}
      />
    </Tab.Navigator>
  );
}
