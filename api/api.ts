import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

// export const API = axios.create({
//   baseURL: "http://localhost:3000/api/v1",
//   withCredentials: true,
// });

export const API = axios.create({
  baseURL: "http://192.168.67.158:3000/api/v1",
  withCredentials: true,
});

// export const API = axios.create({
//   baseURL: "https://corplandbackend.onrender.com/api/v1",
//   withCredentials: true,
// });

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
export const getRequestById = (id: string) => API.get(`/requests/${id}`);

export const createRequest = async (newRequest: any) => {
  const formData: any = new FormData();
  formData.append("title", newRequest.title);
  formData.append("description", newRequest.description);
  formData.append("category", newRequest.category);
  formData.append("country", newRequest.country);
  formData.append("region", newRequest.region);
  formData.append("minPrice", newRequest.minPrice);
  formData.append("maxPrice", newRequest.maxPrice);
  formData.append("userId", newRequest.userId);

  if (Platform.OS === "web") {
    newRequest.images.map((image: any) => {
      formData.append("images", image);
    });
  } else {
    newRequest.images.map((image: any) => {
      formData.append("images", {
        uri: image.uri,
        type: "image/jpeg",
        name: "productImage.jpg",
      });
    });
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return API.post("/requests", formData, config);
};

export const updateRequest = async (newProduct: any, id: any) => {
  const formData: any = new FormData();
  formData.append("title", newProduct.title);
  formData.append("description", newProduct.description);
  formData.append("category", newProduct.category);
  formData.append("country", newProduct.country);
  formData.append("region", newProduct.region);
  formData.append("price", newProduct.price);
  formData.append("userId", newProduct.userId);

  if (Platform.OS === "web") {
    newProduct.images.forEach((image: any) => {
      formData.append("images", image);
    });
  } else {
    newProduct.images.forEach((image: any) => {
      formData.append("images", {
        uri: image.uri || image,
        type: "image/jpeg",
        name: "productImage.jpg",
      });
    });
  }

  const token = await AsyncStorage.getItem("token");

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    Authorization: `Bearer ${token}`,
  };
  return API.put(`/requests/${id}`, formData, config);
};

export const searchRequests = (query: string) =>
  API.post(`/requests/search?q=${query}`);

export const deleteRequest = (id: string) => API.delete(`/requests/${id}`);

export const toggleRequestFavorites = async (
  userId: string,
  requestId: string
) => {
  const status = await API.post(`/users/toggle-favorite/${requestId}`, {
    userId: userId,
  });
  return status;
};

export const getRequestsByUserId = (userId: string) =>
  API.get(`/requests/user/${userId}`);

export const getTrendingRequests = () => API.get("/requests/trending");

export const dialRequest = async (productId: string, userId: string) => {
  try {
    const data: object = {
      userId: userId,
    };
    const response = await API.post(`/requests/dial/${productId}`, data);
    return response.data; // Assuming the API returns the user data upon successful sign up
  } catch (error) {
    console.log("Error getting favorite Products:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
export const getFavoriteRequests = (userId: string) =>
  API.get(`/requests/favorites/${userId}`);

export const getAds = () => API.get("/ads");
export const createAd = async (newAd: any) => {
  const formData: any = new FormData();
  formData.append("title", newAd.title);
  formData.append("description", newAd.description);
  formData.append("category", newAd.category);
  formData.append("country", newAd.country);
  formData.append("region", newAd.region);
  formData.append("price", newAd.price);
  formData.append("userId", newAd.userId);

  if (Platform.OS === "web") {
    newAd.images.map((image: any) => {
      formData.append("images", image);
    });
  } else {
    newAd.images.map((image: any) => {
      formData.append("images", {
        uri: image.uri,
        type: "image/jpeg",
        name: "productImage.jpg",
      });
    });
  }

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return API.post("/ads", formData, config);
};

export const updateUser = async (userData: any) => {
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

  if (Platform.OS === "web") {
    newProduct.images.map((image: any) => {
      formData.append("images", image);
    });
  } else {
    newProduct.images.map((image: any) => {
      formData.append("images", {
        uri: image.uri,
        type: "image/jpeg",
        name: "productImage.jpg",
      });
    });
  }

  const token = await AsyncStorage.getItem("token");

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

  if (Platform.OS === "web") {
    newProduct.images.forEach((image: any) => {
      formData.append("images", image);
    });
  } else {
    newProduct.images.forEach((image: any) => {
      formData.append("images", {
        uri: image.uri || image,
        type: "image/jpeg",
        name: "productImage.jpg",
      });
    });
  }

  const token = await AsyncStorage.getItem("token");

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    Authorization: `Bearer ${token}`,
  };
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

//request APIs

export const deposit = (
  email: string,
  amount: number | string,
  userId: string
) =>
  API.post("/users/initialize-payment", {
    email: email,
    amount: amount,
    userId: userId,
  });

export const createOrder = (
  sellerId: string,
  buyerId: string,
  productId: string,
  quantity: number,
  total: number
) => API.post("/orders", { sellerId, buyerId, productId, quantity, total });

export const getUserOrders = (userId: string) =>
  API.get(`/orders/user/${userId}`);

export const updateOrderStatus = (
  orderId: string,
  status: number,
  sellerId?: string,
  buyerId?: string
) =>
  API.put(`/orders/status/${orderId}`, {
    sellerId,
    status,
    buyerId,
  });

export const createTransferRecipient = (
  name: string,
  accountNumber: string,
  bankCode: string,
  userId: string
) =>
  API.post("/users/create-transfer-recipient", {
    name,
    accountNumber,
    bankCode,
    userId,
  });

export const withdrawal = (amount: number, recipient: string, userId: string) =>
  API.post("/users/initialize-withdrawal", {
    amount,
    recipient,
    userId,
  });

export const bonusWithdrawal = (amount: number, userId: string) =>
  API.post("/users/withdraw-bonus", {
    amount,
    userId,
  });

export const getUserTransactions = (userId: string) =>
  API.get(`/transactions/${userId}`);

export const deleteAccount = (userId: string) =>
  API.delete(`/users/delete-account/${userId}`);

export const getNotifications = (userId: string) =>
  API.get(`/notifications?userId=${userId}`);

export const getUnreadNotificationsCount = (userId: string) =>
  API.get(`/notifications/count?userId=${userId}`);

export const markNotificationAsRead = (id: string) =>
  API.put(`/notifications/${id}`, {
    isRead: true,
  });

export const markAllNotificationAsRead = (userId: string) =>
  API.put(`/notifications/user/${userId}`, {
    isRead: true,
  });
