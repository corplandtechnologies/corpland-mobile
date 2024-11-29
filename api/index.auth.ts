import axios from "axios";

// export const corplandAccountsAPI = axios.create({
//   baseURL: "http://192.168.94.158:5008/api/v1",
//   withCredentials: true,
// });

export const corplandAccountsAPI = axios.create({
  baseURL: "https://corpland-accounts-new-backup.onrender.com/api/v1",
  withCredentials: true,
});

export const signUp = async (userData: {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}) => corplandAccountsAPI.post("/users", userData);

export const authWithSocial = async (userData: {
  name: string;
  email: string;
}) => {
  try {
    const response = await corplandAccountsAPI.post(
      "/users/auth-social",
      userData
    );
    return response.data; // Assuming the API returns the user data upon successful sign up
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const login = (userData: { email: string; password: string }) =>
  corplandAccountsAPI.post("/users/login", userData);

export const forgotPassword = (email: string) =>
  corplandAccountsAPI.post("/users/forgot-password", {
    email,
  });

export const verifyResetCode = (email: string, resetCode: string) =>
  corplandAccountsAPI.post("/users/verify-reset-code", {
    email,
    resetCode,
  });

export const resetPassword = (email: string, newPassword: string) =>
  corplandAccountsAPI.post("/users/reset-password", {
    email,
    newPassword,
  });

export const verifyEmail = (userData: { email: string; otp: string }) => {
  return corplandAccountsAPI.post("/users/verify-email", userData);
};
