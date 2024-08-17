import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode, // Import ReactNode
} from "react";

interface UserContextType {
  user: any; // Consider defining a more specific type for your user
  loading: boolean;
  error: any;
  // fetchUserById: (userId: string) => Promise<void>;
  userData: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [userData, setUserData] = useState();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     setLoading(true);
  //     try {
  //       const userInfo = await AsyncStorage.getItem("user");
  //       const parsedUserInfo = JSON.parse(userInfo || "{}");
  //       setUser(parsedUserInfo);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

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
