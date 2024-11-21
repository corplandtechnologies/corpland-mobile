import "react-native-url-polyfill/auto";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";
import Onboarding from "./screens/Onboarding";
import * as Font from "expo-font";
import { useEffect, useRef, useState } from "react";
import Verify from "./screens/auth/Verify";
import BackButton from "./components/ui/BackButton";
import CompleteProfile from "./screens/auth/CompleteProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SellerModeProvider } from "./context/SellerModeContext";
import { UserProvider } from "./context/UserContext";
import Search from "./screens/Search";
import { SearchResultsProvider } from "./context/SearchResultsContext";
import Product from "./screens/Product";
import { COLORS } from "./utils/color";
import {
  Button,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FavoriteIcon from "./components/ui/FavoriteIcon";
import { ProductProvider, useProduct } from "./context/ProductContext";
import Categories from "./screens/Categories";
import EditProfile from "./screens/auth/EditProfile";
import MyProducts from "./screens/seller/MyProducts";
import EditProduct from "./screens/seller/EditProduct";
import ProductDisplay from "./screens/ProductDisplay";
import ProductGrids from "./screens/ProductGrids";
import NetInfo from "@react-native-community/netinfo";
import TabNavigator from "./routes/TabNavigator";
import * as Updates from "expo-updates";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import { Platform } from "react-native";
import Wallet from "./screens/Wallet";
import Deposit from "./screens/Deposit";
import MyCoupons from "./screens/Bonus/MyCoupons";
import Redeem from "./screens/Redeem";
import CompleteDeposit from "./screens/CompleteDeposit";
import Cart from "./screens/buyer/Cart";
import { CartProvider } from "./context/CartContext";
import OrderSuccess from "./screens/OrderSuccess";
import TrackOrder from "./screens/TrackOrder/TrackOrder";
import { AppProvider, useApp } from "./context/AppContext";
import { storeExpoNotificationsPushToken } from "./api/api";
import Withdraw from "./screens/Payments/Withdraw";
import ConfirmWithdraw from "./screens/Payments/ConfirmWithdrawal";
import Settings from "./screens/Settings";
import Request from "./screens/Request";
import MyRequests from "./screens/buyer/MyRequests";
import EditRequest from "./screens/buyer/EditRequest";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import NotificationScreen from "./screens/NotificationScreen";
import PrimaryButton from "./components/ui/PrimaryButton";
import TextElement from "./components/elements/Texts/TextElement";
import ForgotPassword from "./screens/auth/ForgotPassword";
import VerifyEmailPasswordReset from "./screens/auth/VerifyEmailPasswordReset";
import ResetPassword from "./screens/auth/ResetPassword";
import ConfirmBonusWithdrawal from "./screens/Bonus/ConfirmBonusWithdrawal";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import WalkthroughTour from "./screens/Intro/WalkthroughTour";
import React from "react";
import messaging from "@react-native-firebase/messaging";
import firebase from "@react-native-firebase/app";
import { getUserById, saveDevice } from "./api";
import { ThemeProvider } from "./context/ThemeContext";
import { authService } from "./services/auth.service";
import LoadingScreen from "./screens/LoadingScreen";

const firebaseConfig = {
  apiKey: "AIzaSyAQAZsd74WSYymehytX8oGpZabbERSBNoU",
  authDomain: "corpland-app.firebaseapp.com",
  projectId: "corpland-app",
  storageBucket: "corpland-app.firebasestorage.app",
  messagingSenderId: "840107202767",
  appId: "1:840107202767:web:17e7fa44a19e1f65947fba",
  measurementId: "G-3H9MXLW133",
};

const prefix = Linking.createURL("/");

const isDevelopment = Constants.appOwnership === "expo";

const linking = {
  prefixes: [
    prefix,
    "https://corpland.corplandtechnologies.com",
    "corpland://",
  ],
  config: {
    screens: {
      Product: "product/:productId",
      // other screens...
    },
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const showLocalNotification = async (remoteMessage: any) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      data: remoteMessage.data,
    },
    trigger: null, // Show immediately
  });
};

const Stack = createStackNavigator();

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isFontLoaded, setFontLoaded] = useState<boolean>(false);
  const { user, setUser } = useApp();
  const [initialRoute, setInitialRoute] = useState<string>("TabNavigator");

  const [loggedInUser, setLoggedInUser] = useState<object>({});

  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const [showTour, setShowTour] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user");
      const parsedUserInfo = JSON.parse(userInfo);
      setLoggedInUser(parsedUserInfo);
      const res: any = await getUserById(parsedUserInfo?._id);
      setUser(res.data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUser();
  }, [user?._id]);

  const requestUserPermissions = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    }
  };

  useEffect(() => {
    if (isDevelopment) {
      // You're in development mode, do not initialize Firebase
    } else {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      if (requestUserPermissions()) {
        messaging()
          .getToken()
          .then((token) => {
            token && storeExpoNotificationsPushToken(loggedInUser?._id, token);
            token && saveDevice(token, Platform.OS);
          });
      } else {
      }
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage?.notification
          );
        });
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          "Notification caused the app to open from the background state.",
          remoteMessage.notification
        );
      });
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        await showLocalNotification(remoteMessage);
      });

      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        await showLocalNotification(remoteMessage);
      });

      return unsubscribe;
    }
  }, [loggedInUser?._id]);

  // useEffect(() => {
  //   registerForPushNotificationsAsync(loggedInUser?._id)
  //     .then((token) => {
  //       if (loggedInUser && loggedInUser._id) {
  //         registerForPushNotificationsAsync(loggedInUser?._id);
  //       }
  //       token && setExpoPushToken(token);
  //     })
  //     .catch((err) => );

  //   if (Platform.OS === "android") {
  //     Notifications.getNotificationChannelsAsync().then((value) =>
  //       setChannels(value ?? [])
  //     );
  //   }
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //
  //     });

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current
  //       );
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, [loggedInUser?._id]);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        PoppinsExtraBold: require("./fonts/Poppins/Poppins-ExtraBold.ttf"),
        PoppinsBold: require("./fonts/Poppins/Poppins-Bold.ttf"),
        PoppinsSemiBold: require("./fonts/Poppins/Poppins-SemiBold.ttf"),
        PoppinsMedium: require("./fonts/Poppins/Poppins-Medium.ttf"),
        PoppinsRegular: require("./fonts/Poppins/Poppins-Regular.ttf"),
        PoppinsLight: require("./fonts/Poppins/Poppins-Light.ttf"),
        PoppinsThin: require("./fonts/Poppins/Poppins-Thin.ttf"),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  const reactToUpdates = () => {
    Updates.addUpdatesStateChangeListener((event: any) => {
      if (event.type === Updates.UpdateEventType?.UPDATE_AVAILABLE) {
        alert(
          "We are restarting the app in a few seconds in order to allow the latest update take effect"
        );
        setTimeout(() => {
          Updates.reloadAsync();
        }, 10000);
      }
    });
  };

  useEffect(() => {
    reactToUpdates();
  }, []);

  useEffect(() => {
    const unsubscribe: any = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected && state.isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      const isFirstTime = await AsyncStorage.getItem("isFirstTimeUser");
      if (isFirstTime === null) {
        setShowTour(true);
        await AsyncStorage.setItem("isFirstTimeUser", "false");
      }
    };
    checkFirstTimeUser();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuthenticated = await authService.isAuthenticated();
      const currentUser = await authService.getCurrentUser();

      setUser(currentUser);
      setInitialRoute("TabNavigator");
    } catch (error) {
      setInitialRoute("Login");
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);

        const isUserProfileAvailable = await authService.isUserProfileAvailable(
          setIsLoading
        );

        if (!isUserProfileAvailable) {
          return setInitialRoute("CompleteProfile");
        } else {
          const isAuthenticated = await authService.isAuthenticated();

          if (isAuthenticated) {
            const currentUser = await authService.getCurrentUser();
            if (currentUser) {
              await setUser(currentUser);
            }
          }
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);
  if (!isFontLoaded) {
    return null;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} />
        <Image source={require("./assets/no-wifi.png")} />
        <Text style={styles.mainError}>Ooops...</Text>
        <Text style={styles.message}>No Internet Connection Found.</Text>
        <Text style={styles.message}>Check your connection.</Text>
      </View>
    );
  }

  // if (showTour) {
  //   return <WalkthroughTour />;
  // }

  return (
    <>
      <StatusBar translucent={true} />
      <AppProvider>
        <ThemeProvider>
          <UserProvider>
            <CartProvider>
              <SellerModeProvider>
                <SearchResultsProvider>
                  <ProductProvider>
                    <NavigationContainer linking={linking}>
                      <Stack.Navigator initialRouteName={initialRoute}>
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
                              fontFamily: "PoppinsSemiBold",
                            },
                          }}
                          component={Login}
                        />
                        <Stack.Screen
                          name="ForgotPassword"
                          options={{ headerShown: false }}
                          component={ForgotPassword}
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
                          name="ResetPassword"
                          options={{
                            headerTitle: "",
                            headerLeft: () => <BackButton />,
                          }}
                          component={ResetPassword}
                        />
                        <Stack.Screen
                          name="VerifyEmailPasswordReset"
                          options={{
                            headerTitle: "",
                            headerLeft: () => <BackButton />,
                          }}
                          component={VerifyEmailPasswordReset}
                        />
                        <Stack.Screen
                          name="CompleteProfile"
                          options={{
                            headerTitle: "",
                            headerLeft: () => <BackButton />,
                          }}
                          component={CompleteProfile}
                        />
                        <Stack.Screen
                          name="ProductDisplay"
                          component={ProductDisplay}
                          options={({ route }: { route: any }) => ({
                            headerTitle: route.params?.category || "Products",
                            headerLeft: () => <BackButton />,
                            headerTitleAlign: "center",
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                            },
                          })}
                        />
                        <Stack.Screen
                          name="ProductGrids"
                          options={{
                            headerTitle: "Products",
                            headerLeft: () => <BackButton />,
                            headerTitleAlign: "center",
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                            },
                          }}
                          component={ProductGrids}
                        />
                        <Stack.Screen
                          name="Search"
                          options={{
                            headerTitle: "Results",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={Search}
                        />
                        <Stack.Screen
                          name="Product"
                          options={{
                            headerTitle: Platform.OS === "web" ? "Details" : "",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton details={true} />,
                            headerRight: () => {
                              const { productId } = useProduct();

                              return (
                                <FavoriteIcon
                                  productId={productId} // Use the local state instead of the context
                                  style={{
                                    padding: 15,
                                    // marginRight: 10,
                                  }}
                                />
                              );
                            },
                            headerTransparent:
                              Platform.OS === "web" ? false : true,
                          }}
                          component={Product}
                        />

                        <Stack.Screen
                          name="Request"
                          options={{
                            headerTitle: Platform.OS === "web" ? "Details" : "",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton details={true} />,
                            // headerRight: () => {
                            //   const { productId } = useProduct();

                            //   return (
                            //     <FavoriteIcon
                            //       productId={productId} // Use the local state instead of the context
                            //       style={{
                            //         padding: 15,
                            //         // marginRight: 10,
                            //       }}
                            //     />
                            //   );
                            // },
                            headerTransparent:
                              Platform.OS === "web" ? false : true,
                          }}
                          component={Request}
                        />

                        <Stack.Screen
                          name="Categories"
                          options={{
                            headerTitle: "Categories",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={Categories}
                        />
                        <Stack.Screen
                          name="EditProfile"
                          options={{
                            headerTitle: "",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                          }}
                          component={EditProfile}
                        />
                        <Stack.Screen
                          name="EditProduct"
                          options={{
                            headerTitle: "Edit Your Product",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                            },
                          }}
                          component={EditProduct}
                        />
                        <Stack.Screen
                          name="EditRequest"
                          options={{
                            headerTitle: "Edit Your Request",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                            },
                          }}
                          component={EditRequest}
                        />
                        <Stack.Screen
                          name="MyProducts"
                          options={{
                            headerTitle: "My Products",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={MyProducts}
                        />
                        <Stack.Screen
                          name="MyRequests"
                          options={{
                            headerTitle: "My Requests",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={MyRequests}
                        />
                        <Stack.Screen
                          name="Wallet"
                          options={{
                            headerTitle: "Wallet",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={Wallet}
                        />
                        <Stack.Screen
                          name="Deposit"
                          options={{
                            headerTitle: "Deposit",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={Deposit}
                        />
                        <Stack.Screen
                          name="CompleteDeposit"
                          options={{
                            headerTitle: "Complete Deposit",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={CompleteDeposit}
                        />
                        <Stack.Screen
                          name="MyCoupons"
                          options={{
                            headerTitle: "My Coupons",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={MyCoupons}
                        />
                        <Stack.Screen
                          name="Redeem"
                          options={{
                            headerTitle: "Redeem",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={Redeem}
                        />
                        <Stack.Screen
                          name="Cart"
                          options={{
                            headerTitle: "Confirm Order",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={Cart}
                        />
                        <Stack.Screen
                          name="OrderSuccess"
                          options={{
                            headerTitle: "",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={OrderSuccess}
                        />
                        <Stack.Screen
                          name="TrackOrder"
                          options={{
                            headerTitle: "Track Order",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={TrackOrder}
                        />
                        <Stack.Screen
                          name="Withdraw"
                          options={{
                            headerTitle: "Withdraw",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={Withdraw}
                        />
                        <Stack.Screen
                          name="ConfirmWithdraw"
                          options={{
                            headerTitle: "Confirm Withdraw",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={ConfirmWithdraw}
                        />
                        <Stack.Screen
                          name="ConfirmBonusWithdrawal"
                          options={{
                            headerTitle: "Withdraw Bonus",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={ConfirmBonusWithdrawal}
                        />
                        <Stack.Screen
                          name="Settings"
                          options={{
                            headerTitle: "Settings",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={Settings}
                        />
                        <Stack.Screen
                          name="PrivacyPolicy"
                          options={{
                            headerTitle: "Privacy Policy",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                          }}
                          component={PrivacyPolicy}
                        />
                        <Stack.Screen
                          name="Notifications"
                          options={{
                            headerTitle: "Notifications",
                            headerTitleAlign: "center",
                            headerLeft: () => <BackButton />,
                            headerTitleStyle: {
                              fontFamily: "PoppinsSemiBold",
                              // borderWidth:8
                            },
                            // headerRight: () => (
                            //   <TouchableOpacity
                            //     style={{
                            //       backgroundColor: COLORS.PRIMARY,
                            //       paddingHorizontal: 15,
                            //       paddingVertical: 10,
                            //       borderRadius: 10,
                            //       marginRight: 5,
                            //       alignItems: "center",
                            //       justifyContent: "center",
                            //     }}
                            //   >
                            //     <TextElement color={COLORS.SECONDARY} textAlign="center">
                            //       2 New
                            //     </TextElement>
                            //   </TouchableOpacity>
                            // ),
                          }}
                          component={NotificationScreen}
                        />
                      </Stack.Navigator>
                    </NavigationContainer>
                  </ProductProvider>
                </SearchResultsProvider>
              </SellerModeProvider>
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
      </AppProvider>
    </>
  );
}

// async function registerForPushNotificationsAsync(userId: string) {
//

//   let token: string;
//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//     });
//   }

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   if (finalStatus !== "granted") {
//     alert("Failed to get push token!");
//     return;
//   }

//   // Get Expo push token
//   token = (await Notifications.getExpoPushTokenAsync()).data;
//

//   // Send token to backend
//   await storeExpoNotificationsPushToken(userId, token);
// }

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here", test: { test1: "more data" } },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync(userId: string) {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;

      await storeExpoNotificationsPushToken(userId, token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontFamily: "PoppinsExtraBold",
  },
  mainError: {
    fontFamily: "PoppinsExtraBold",
    fontSize: 36,
  },
});

export default function WrappedApp() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}
