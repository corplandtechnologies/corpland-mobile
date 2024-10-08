import {
  getUnreadNotificationsCount,
  storeExpoNotificationsPushToken,
} from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const getStorageItem = async (item: string) => {
  try {
    const result = await AsyncStorage.getItem(item);
    const parsedResult = JSON.parse(result || "");
    return parsedResult;
  } catch (error) {
    console.log(error);
  }
};

export const createObjectURL = (file: any) => {
  return URL.createObjectURL(file);
};

export const handleError = (error: any) => {
  let errorMessage = "An unexpected error occurred.";
  if (error.response) {
    errorMessage =
      error.response.data.message ||
      error.response.data ||
      error.response.statusText;
  } else if (error.request) {
    errorMessage = "No response received from the server.";
  } else {
    errorMessage = error.message;
  }
  return errorMessage;
};

export const formatPrice = (price: string) => {
  return parseFloat(price).toLocaleString();
};

const fetchUnreadNotificationCount = async (userId: string) => {
  try {
    const { data } = await getUnreadNotificationsCount(userId);
    return data.data;
  } catch (error) {
    console.error("Error fetching unread notification count:", error);
    return 0;
  }
};

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  token = await Notifications.getExpoPushTokenAsync().data;
  console.log(token);

  // Send the token to your backend to save
  await storeExpoNotificationsPushToken(userId, token);

  return token;
};

export default fetchUnreadNotificationCount;
