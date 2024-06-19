import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const API = axios.create({
  baseURL: "https://corplandbackend.onrender.com/api/v1",
  withCredentials: true,
});

const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

API.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
    type: "image/jpeg",
    name: `requestImage.jpg`,
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
    type: "image/jpeg",
    name: `adImage.jpg`,
  });

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return API.post("/ads", formData, config);
};

export const updateUser = async (userData: any) => {
  const formData: any = new FormData();
  formData.append("name", userData.name);
  formData.append("phoneNumber", userData.phoneNumber);
  formData.append("profilePicture", {
    uri: userData.profilePicture,
    type: "image/jpeg",
    name: `profilePicture.jpg`,
  });
  formData.append("country", userData.country);
  formData.append("region", userData.region);
  formData.append("userId", userData.userId);

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return API.put("/users", formData, config);
};

export const completeProfile = async (userData: any) => {
  const formData: any = new FormData();
  formData.append("name", userData.name);
  formData.append("phoneNumber", userData.phoneNumber);
  formData.append("profilePicture", {
    uri: userData.profilePicture,
    type: "image/jpeg",
    name: `profilePicture.jpg`,
  });
  formData.append("userId", userData.userId);

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return API.put("/users", formData, config);
};

export const getUserById = (userId: string) => API.get(`/users/${userId}`);

export const createProduct = async (newProduct: any) => {
  const formData: any = new FormData();
  formData.append("title", newProduct.title);
  formData.append("description", newProduct.description);
  formData.append("category", newProduct.category);
  formData.append("country", newProduct.country);
  formData.append("region", newProduct.region);
  formData.append("price", newProduct.price);
  formData.append("userId", newProduct.userId);
  newProduct.images.map((image: any) => {
    formData.append("images", {
      uri: image.uri,
      type: "image/jpeg",
      name: "productImage.jpg",
    });
  });

  const token = await AsyncStorage.getItem("token");

  console.log("Formdata", formData);

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    Authorization: `Bearer ${token}`,
  };

  return API.post("/products", formData, config);
};

export const updateProduct = async (newProduct: any, id: any) => {
  const formData: any = new FormData();
  formData.append("title", newProduct.title);
  formData.append("description", newProduct.description);
  formData.append("category", newProduct.category);
  formData.append("country", newProduct.country);
  formData.append("region", newProduct.region);
  formData.append("price", newProduct.price);
  formData.append("userId", newProduct.userId);
  newProduct.images.map((image: any) => {
    formData.append("images", {
      uri: image.uri ? image.uri : image,
      type: "image/jpeg",
      name: "productImage.jpg",
    });
  });

  const token = await AsyncStorage.getItem("token");

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    Authorization: `Bearer ${token}`,
  };

  console.log("update Product", formData);
  return API.put(`/products/${id}`, formData, config);
};

export const searchProducts = (query: string) =>
  API.post(`/products/search?q=${query}`);
export const getProductById = (id: string) => API.get(`/products/${id}`);

export const deleteProduct = (id: string) => API.delete(`/products/${id}`);

export const toggleFavorites = async (userId: string, productId: string) => {
  const status = await API.post(`/users/toggle-favorite/${productId}`, {
    userId: userId,
  });
  return status;
};

export const getUserProductsById = (userId: string) =>
  API.get(`/products/user/${userId}`);

export const getProducts = () => API.get("/products");
export const getTrendingProducts = () => API.get("/products/trending");

export const dialProduct = async (productId: string, userId: string) => {
  try {
    const data: object = {
      userId: userId,
    };
    const response = await API.post(`/products/dial/${productId}`, data);
    return response.data; // Assuming the API returns the user data upon successful sign up
  } catch (error) {
    console.log("Error getting favorite Products:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
export const getFavoriteProducts = (userId: string) =>
  API.get(`/products/favorites/${userId}`);
