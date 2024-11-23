import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../config/types";
import TabNavigator from "./tabs/TabNavigator";
import Favorite from "../screens/Favorite";
import Orders from "../screens/Orders/Orders";
import Profile from "../screens/Profile";
import CreateRequest from "../screens/buyer/CreateRequest";
import CreateProduct from "../screens/seller/CreateProduct";
import Product from "../screens/Product";
import Request from "../screens/Request";
import Header from "../components/features/Header";
import { Platform } from "react-native";
import Wallet from "../screens/Wallet";
import Deposit from "../screens/Deposit";
import MyCoupons from "../screens/Bonus/MyCoupons";
import Redeem from "../screens/Redeem";
import CompleteDeposit from "../screens/CompleteDeposit";
import Cart from "../screens/buyer/Cart";
import { CartProvider } from "../context/CartContext";
import OrderSuccess from "../screens/OrderSuccess";
import TrackOrder from "../screens/TrackOrder/TrackOrder";
import { AppProvider, useApp } from "../context/AppContext";
import { storeExpoNotificationsPushToken } from "../api/api";
import Withdraw from "../screens/Payments/Withdraw";
import ConfirmWithdraw from "../screens/Payments/ConfirmWithdrawal";
import Settings from "../screens/Settings";
import MyRequests from "../screens/buyer/MyRequests";
import EditRequest from "../screens/buyer/EditRequest";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import NotificationScreen from "../screens/NotificationScreen";
import PrimaryButton from "../components/common/Button/PrimaryButton";
import TextElement from "../components/elements/Texts/TextElement";
import ForgotPassword from "../screens/auth/ForgotPassword";
import VerifyEmailPasswordReset from "../screens/auth/VerifyEmailPasswordReset";
import ResetPassword from "../screens/auth/ResetPassword";
import ConfirmBonusWithdrawal from "../screens/Bonus/ConfirmBonusWithdrawal";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import WalkthroughTour from "../screens/Intro/WalkthroughTour";
import messaging from "@react-native-firebase/messaging";
import firebase from "@react-native-firebase/app";
import { getUserById, saveDevice } from "../api";
import { ThemeProvider } from "../context/ThemeContext";
import { authService } from "../services/auth.service";
import LoadingScreen from "../screens/LoadingScreen";
import WithdrawalChannel from "../screens/Payments/WithdrawalChannel";
import ConfirmWithdrawal from "../screens/Payments/ConfirmWithdrawal";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator({
  initialRoute,
}: {
  initialRoute: string;
}) {
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="CreateProduct" component={CreateProduct} />
      <Stack.Screen name="CreateRequest" component={CreateRequest} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="Request" component={Request} />
      <Stack.Screen name="MyRequests" component={MyRequests} />
      <Stack.Screen name="EditRequest" component={EditRequest} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="WalkthroughTour" component={WalkthroughTour} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="WithdrawalChannel" component={WithdrawalChannel} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen
        name="VerifyEmailPasswordReset"
        component={VerifyEmailPasswordReset}
      />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="CompleteDeposit" component={CompleteDeposit} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
      <Stack.Screen name="ConfirmWithdrawal" component={ConfirmWithdrawal} />
      <Stack.Screen name="MyCoupons" component={MyCoupons} />
      <Stack.Screen name="Redeem" component={Redeem} />
      <Stack.Screen name="CompleteWithdrawal" component={CompleteWithdrawal} />
      <Stack.Screen name="Deposit" component={Deposit} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Bonus" component={Bonus} />
      <Stack.Screen
        name="ConfirmBonusWithdrawal"
        component={ConfirmBonusWithdrawal}
      />
    </Stack.Navigator>
  );
}
