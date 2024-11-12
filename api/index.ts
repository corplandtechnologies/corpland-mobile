import axios from "axios";

export const APIv2 = axios.create({
  baseURL: "https://corpland-backend-v2.onrender.com/api/v1",
  withCredentials: true,
});

export const saveDevice = (token: string, platform: string) =>
  APIv2.post("/devices", {
    token,
    platform,
  });
