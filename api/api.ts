import axios from "axios";

export const API = axios.create({
  baseURL: "https://corpland-backend.onrender.com/api/v1", //I would seperate the repors so that I can give you the production api
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

export const getAds = () => API.get("/ads");
export const createAd = async (newAd: any) => {
  const formData: any = new FormData();
  formData.append("title", newAd.title);
  formData.append("description", newAd.description);
  formData.append("phoneNumber", newAd.phoneNumber);
  formData.append("location", newAd.location);
  formData.append("category", newAd.category);
  formData.append("image", {
    uri: newAd.image,
    type: "image/jpeg", // or 'image/png' if the image is a PNG
    name: `adImage.jpg`, // or '.png'
  });

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return API.post("/ads", formData, config);
};

export const completeProfile = async (userData: any) => {
  const formData: any = new FormData();
  formData.append("name", userData.description);
  formData.append("phoneNumber", userData.phoneNumber);
  formData.append("profilePicture", {
    uri: userData.profilePicture,
    type: "image/jpeg", // or 'image/png' if the image is a PNG
    name: `profilePicture.jpg`, // or '.png'
  });
  formData.append("userId", userData.userId);

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return API.put("/users", formData, config);
};
