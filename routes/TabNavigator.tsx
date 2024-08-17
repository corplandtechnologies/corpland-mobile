import React, { useCallback, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../utils/color";
import Home from "../screens/Home";
import CreateRequest from "../screens/buyer/CreateRequest";
import CreateAd from "../screens/seller/CreateAd";
import Profile from "../screens/Profile";
import { Switch } from "react-native-paper";
import { Text, TouchableOpacity, View } from "react-native";
import BackButton from "../components/ui/BackButton";
import {
  SellerModeProvider,
  useSellerMode,
} from "../context/SellerModeContext";
import CreateProduct from "../screens/seller/CreateProduct";
import { Icon as BadgeIcon, withBadge } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import { getUserById } from "../api/api";
import Favorite from "../screens/Favorite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletBox from "../components/WalletBox";
import Orders from "../screens/Orders/Orders";
import { useApp } from "../context/AppContext";

const Tab = createBottomTabNavigator();

const BadgedIcon = withBadge(0)(Icon);

export default function TabNavigator() {
  const { user, setUser } = useApp();
  const [isRequest, setIsRequest] = useState(false);
  const { isSellerMode, toggleSellerMode } = useSellerMode();
  // const [user, setUser] = useState(null);
  console.log(user);

  const onToggleSwitch = () => setIsRequest(!isRequest);

  const getUserInfo = async () => {
    try {
      const parsedUserInfo: any = JSON.parse(
        (await AsyncStorage.getItem("user")) || "{}"
      );
      const res = await getUserById(parsedUserInfo?._id);
      setUser(res?.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [])
  );
  // Custom header left component for Home screen
  const CustomHeaderLeft = () => {
    const navigation = useNavigation();

    return (
      <View style={{ paddingLeft: 10 }}>
        <Text style={{ color: COLORS.TERTIARY }}>Location</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Icon name="location" size={20} color={COLORS.COMPLIMENTARY} />
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            {user ? (
              <Text style={{ color: COLORS.PRIMARY, fontFamily: "InterBold" }}>
                {user?.region},{user?.country}
              </Text>
            ) : (
              <Text style={{ color: COLORS.PRIMARY, fontFamily: "InterBold" }}>
                Select Location
              </Text>
            )}
          </TouchableOpacity>
          <Icon name="chevron-down" size={20} color={COLORS.PRIMARY} />
        </View>
      </View>
    );
  };

  const CustomHeaderRight = () => (
    <View
      style={{
        paddingRight: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      {/* <WalletBox /> */}
      <BadgedIcon name="notifications" type="ionicon" size={25} />
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{ tabBarActiveTintColor: COLORS.COMPLIMENTARY }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerTitle: "",
          headerLeft: () => <CustomHeaderLeft />,
          headerRight: () => <CustomHeaderRight />,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        // component={isSellerMode ? CreateProduct : CreateRequest}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
          // headerTitle: isSellerMode ? "Post a Product" : "Make a Request",
          headerTitle: "Favorites",
          headerTitleStyle: {
            fontFamily: "InterBold",
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
        name="Add"
        component={CreateProduct}
        // component={isSellerMode ? CreateProduct : CreateRequest}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle" color={color} size={size} />
          ),
          // headerTitle: isSellerMode ? "Post a Product" : "Make a Request",
          headerTitle: "Post a Product",

          headerTitleStyle: {
            fontFamily: "InterBold",
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
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bag" color={color} size={size} />
          ),
          headerTitle: "My Orders",
          headerTitleStyle: {
            fontFamily: "InterBold",
          },
          headerLeft: () => <BackButton />,
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
          headerTitle: "Profile",
          headerTitleStyle: {
            fontFamily: "InterBold",
          },
          headerLeft: () => <BackButton />,
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
}
