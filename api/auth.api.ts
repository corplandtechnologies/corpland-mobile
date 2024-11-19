import { API } from "./api";

export const signUp = async (userData: {
  name: string;
  phoneNumber: string;
  email: string;
  password?: string;
  termsAccepted: boolean;
  referralCode?: string;
}) => {
  try {
    const response = await API.post("/users/signup", userData);
    return response.data; // Assuming the API returns the user data upon successful sign up
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const authWithSocial = async (userData: {
  name: string;
  email: string;
}) => {
  try {
    const response = await API.post("/users/auth-social", userData);
    return response.data; // Assuming the API returns the user data upon successful sign up
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const login = async (userData: { email: string; password: string }) => {
  try {
    const response = await API.post("/users/login", userData);
    return response.data; // Assuming the API returns the user data upon successful sign up
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await API.post("/users/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyResetCode = async (email: string, resetCode: string) => {
  try {
    const response = await API.post("/users/verify-reset-code", {
      email,
      resetCode,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await API.post("/users/reset-password", {
      email,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (userData: {
  email: string;
  code: string;
}) => {
  try {
    const response = await API.post("/users/verify", userData);
    return response.data; // Assuming the API returns the user data upon successful sign up
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
};
