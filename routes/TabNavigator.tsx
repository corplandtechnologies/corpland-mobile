import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../utils/color";
import Home from "../screens/Home";
import CreateRequest from "../screens/buyer/CreateRequest";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: COLORS.PRIMARY }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="home"
              color={color}
              size={size}
            />
          ),
          headerTitle: "Corpland",
          headerTitleStyle: {
            fontFamily: "RalewayBold",
            // borderWidth:8
          },
        }}
      />
      <Tab.Screen
        name="Request"
        component={CreateRequest}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="add-circle"
              color={color}
              size={size}
            />
          ),
          headerTitle: "Make a Request",
          headerTitleStyle: {
            fontFamily: "RalewayRegular",
          },
        }}
      />

       {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="person"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />  */}
    </Tab.Navigator>
  );
}
