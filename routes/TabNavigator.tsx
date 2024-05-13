import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../utils/color";
import Home from "../screens/Home";
import CreateRequest from "../screens/buyer/CreateRequest";
import CreateAd from "../screens/seller/CreateAd";
import Profile from "../screens/Profile";
import { Switch } from "react-native-paper";
import { View } from "react-native";
import BackButton from "../components/ui/BackButton";
import {
  SellerModeProvider,
  useSellerMode,
} from "../context/SellerModeContext";
import CreateProduct from "../screens/seller/CreateProduct";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [isRequest, setIsRequest] = useState(false);
  const { isSellerMode, toggleSellerMode } = useSellerMode();

  const onToggleSwitch = () => setIsRequest(!isRequest);

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
          headerTitle: "CORPLAND",
          headerTitleStyle: {
            fontFamily: "InterExtraBold",
            // borderWidth:8
          },
        }}
      />
      <Tab.Screen
        name="Add"
        component={isSellerMode ? CreateProduct : CreateRequest}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="add-circle"
              color={color}
              size={size}
            />
          ),
          headerTitle: isSellerMode ? "Post a Product" : "Make a Request",
          headerTitleStyle: {
            fontFamily: "InterMedium",
          },
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              {/* <Switch
                value={is}
                onValueChange={toggleSellerMode}
                color={COLORS.PRIMARY}
              /> */}
            </View>
          ),
          headerLeft: () => <BackButton />,
          headerTitleAlign: "center",
        })}
      />

      <Tab.Screen
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
          headerTitle: "Profile",
          headerLeft: () => <BackButton />,
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
}
