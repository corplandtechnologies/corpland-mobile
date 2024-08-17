import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Active from "./Active";
import Completed from "./Completed";
import { COLORS } from "../../utils/color";
import Cancelled from "./Cancelled";

const Tab = createMaterialTopTabNavigator();

export default function Orders() {
  return (
    <Tab.Navigator
      initialRouteName="Active"
      screenOptions={{
        tabBarActiveTintColor: COLORS.COMPLIMENTARY,
        tabBarLabelStyle: { fontFamily: "InterBold" },
        tabBarInactiveTintColor: COLORS.TERTIARY,
      }}
    >
      <Tab.Screen
        name="Active"
        component={Active}
        options={{ tabBarLabel: "Active" }}
      />
      <Tab.Screen
        name="Completed"
        component={Completed}
        options={{ tabBarLabel: "Completed" }}
      />
      <Tab.Screen
        name="Cancelled"
        component={Cancelled}
        options={{ tabBarLabel: "Cancelled" }}
      />
    </Tab.Navigator>
  );
}
