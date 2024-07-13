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
