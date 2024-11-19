import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

export const APIv2 = axios.create({
  baseURL: "http://192.168.94.158:5007/api/v1",
  withCredentials: true,
});

// export const APIv2 = axios.create({
//   baseURL: "https://corpland-backend-v2.onrender.com/api/v1",
//   withCredentials: true,
// });

APIv2.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const saveDevice = (token: string, platform: string) =>
  APIv2.post("/devices", {
    token,
    platform,
  });

export const completeProfile = async (userData: any) => {
  const formData: any = new FormData();
  formData.append("name", userData.name);
  formData.append("phoneNumber", userData.phoneNumber);
  formData.append(
    "profilePicture",
    Platform.OS === "web"
      ? userData.profilePicture
      : {
          uri: userData.profilePicture,
          type: "image/jpeg",
          name: `profilePicture.jpg`,
        }
  );

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return APIv2.post("/users", formData, config);
};

export const getUserById = (userId: string) => APIv2.get(`/users/${userId}`);
export const getUserByUserId = (userId: string) =>
  APIv2.get(`/users/${userId}`);
