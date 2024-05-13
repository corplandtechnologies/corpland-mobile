// UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../api/api";

interface UserContextType {
  user: any; // You might want to define a more specific type for your user
  loading: boolean;
  error: any;
  fetchUserById: (userId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userInfo = await AsyncStorage.getItem("user");
        console.log("user context", userInfo);
        const parsedUserInfo = JSON.parse(userInfo);
        const response = await fetchUserById(parsedUserInfo._id);
        console.log("res", response);
        setUser(response.data?.user);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  const fetchUserById = async (userId: string) => {
    setLoading(true);
    try {
      const response = await getUserById(userId);
      setUser(response.data?.user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, error, fetchUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
