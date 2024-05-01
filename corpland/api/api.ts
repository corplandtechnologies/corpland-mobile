import axios from "axios";
import { v4 as uuid } from "uuid";

export const API = axios.create({
  baseURL: "http://192.168.125.158:3000/api/v1", //I would seperate the repos so that I can give you the production api
  withCredentials: true,
});

export const getRequests = () => API.get("/requests");
export const createRequest = async (newRequest: any) => {
  const formData: any = new FormData();
  formData.append("title", newRequest.title);
  formData.append("description", newRequest.description);
  formData.append("phoneNumber", newRequest.phoneNumber);
  formData.append("location", newRequest.location);
  formData.append("category", newRequest.category);
  formData.append("image", {
    uri: newRequest.image,
    type: "image/jpeg", // or 'image/png' if the image is a PNG
    name: `requestImage.jpg`, // or '.png'
  });

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return API.post("/requests", formData, config);
};
