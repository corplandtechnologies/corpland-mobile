import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";
import { Withdrawal } from "../interfaces";

// export const APIv2 = axios.create({
//   baseURL: "http://192.168.52.158:5007/api/v1",
//   withCredentials: true,
// });

export const APIv2 = axios.create({
  baseURL: "https://corpland-backend-v2-backup.onrender.com/api/v1",
  withCredentials: true,
});

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

export const signUp = (userData: {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
}) => APIv2.post("/auth/signup", userData);

export const saveDevice = (token: string, platform: string) =>
  APIv2.post("/devices", {
    token,
    platform,
  });

export const completeProfile = async (userData: any, userId: string) => {
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

  return APIv2.put(`/users/${userId}`, formData, config);
};

export const getUserById = (id: string) => APIv2.get(`/users/${id}`);

export const updateUser = (userData: any, userId: string) => {
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
          name: `profilePicture${Date.now()}.jpg`,
        }
  );

  formData.append("country", userData.country);
  formData.append("region", userData.region);

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return APIv2.put(`/users/${userId}`, formData, config);
};
export const getUserByUserId = (userId: string) =>
  APIv2.get(`/users/user/${userId}`);

export const createWithdrawal = (data: Withdrawal) =>
  APIv2.post("/withdrawals", data);

export const getWithdrawals = (userId: string) =>
  APIv2.get(`/withdrawals?userId=${userId}`);
