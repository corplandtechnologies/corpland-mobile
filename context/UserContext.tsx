// UserContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../api/api";

interface UserContextType {
  user: any; // You might want to define a more specific type for your user
  loading: boolean;
  error: any;
  fetchUserById: (userId: string) => Promise<void>;
  userData: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [userData, setUserData] = useState();
  console.log("userData", user);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userInfo = await AsyncStorage.getItem("user");
        const parsedUserInfo = JSON.parse(userInfo);
        const response = await getUserById(parsedUserInfo._id);
        setUser(response?.data?.user);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, userData }}>
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
