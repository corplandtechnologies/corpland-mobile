import { getUnreadNotificationsCount } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const parsedPrice = parseFloat(price);
  return isNaN(parsedPrice) ? "0.00" : parsedPrice.toFixed(2);
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

export default fetchUnreadNotificationCount;
