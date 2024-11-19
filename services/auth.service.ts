import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../api/index";

const STORAGE_KEYS = {
  USER: "user",
  TOKEN: "token",
};

export interface StoredUser {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  phoneNumber?: string;
  region?: string;
  country?: string;
  verified?: boolean;
}

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async setUser(user: StoredUser): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      throw error;
    }
  }

  async getUser(): Promise<StoredUser | null> {
    try {
      const userString = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      return null;
    }
  }

  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (error) {
      throw error;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.TOKEN]);
    } catch (error) {
      throw error;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken();
      const user = await this.getUser();
      return !!(token && user?._id);
    } catch (error) {
      return false;
    }
  }

  async refreshSession(): Promise<void> {
    try {
      const user = await this.getUser();
      if (user?._id) {
        const userProfile = await getUserById(user._id);
        if (userProfile?.data?.data) {
          await this.setUser(userProfile.data.data);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<StoredUser | null> {
    try {
      const user = await this.getUser();
      if (user?._id) {
        const userProfile = await getUserById(user._id);
        const updatedUser = userProfile?.data?.data;
        if (updatedUser) {
          await this.setUser(updatedUser);
          return updatedUser;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

export const authService = AuthService.getInstance();
