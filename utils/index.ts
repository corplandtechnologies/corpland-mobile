import { getUnreadNotificationsCount } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageItem = async (item: string) => {
  try {
    const result = await AsyncStorage.getItem(item);
    const parsedResult = JSON.parse(result || "");
    return parsedResult;
  } catch (error) {}
};

export const createObjectURL = (file: any) => {
  return URL.createObjectURL(file);
};

export const handleError = (error: any) => {
  console.log("errorMessage", error);
  let errorMessage = "An unexpected error occurred.";
  if (error.response) {
    if (error.response.data?.errors?.length > 0) {
      errorMessage = error.response.data.errors[0].message;
    } else {
      errorMessage =
        error.response.data.message ||
        error.response.data ||
        error.response.statusText;
    }
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

export const fetchUnreadNotificationCount = async (userId: string) => {
  try {
    const { data } = await getUnreadNotificationsCount(userId);
    return data.data;
  } catch (error) {
    return 0;
  }
};
export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const textTruncate = (text: string) => {
  return text.length > 15 ? `${text.substring(0, 15)}...` : text;
};
