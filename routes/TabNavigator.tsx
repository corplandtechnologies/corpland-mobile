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

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [isRequest, setIsRequest] = useState(false);

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
            fontFamily: "RalewayExtraBold",
            // borderWidth:8
          },
        }}
      />
      <Tab.Screen
        name="Add"
        component={isRequest ? CreateRequest : CreateAd}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="add-circle"
              color={color}
              size={size}
            />
          ),
          headerTitle: isRequest ? "Make a Request" : "Post an Ad",
          headerTitleStyle: {
            fontFamily: "RalewayRegular",
          },
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Switch
                value={isRequest}
                onValueChange={onToggleSwitch}
              />
            </View>
          ),
        })}
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
