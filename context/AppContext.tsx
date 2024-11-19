import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback, // Import ReactNode
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Notification } from "../interfaces";
import { fetchUnreadNotificationCount } from "../utils";
import { authService, StoredUser } from "../services/auth.service";

export interface AppContextType {
  loading: any;
  error: any;
  snackbarVisible: boolean;
  snackbarMessage: string | any;
  setSnackbarVisible: Dispatch<SetStateAction<boolean>>;
  setSnackbarMessage: Dispatch<SetStateAction<string>>;
  setLoading: any;
  setError: any;
  user: StoredUser | null;
  setUser: (user: StoredUser | null) => Promise<void>;
  refreshing: boolean;
  setRefreshing: any;
  eventLoading: boolean;
  setEventLoading: any;
  transferRecipient: string;
  setTransferRecipient: Dispatch<SetStateAction<string>>;
  requestId: string;
  setRequestId: Dispatch<SetStateAction<string>>;
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
  unreadNotifications: number;
  setUnreadNotifications: Dispatch<SetStateAction<number>>;
  updateUnreadNotificationCount: (userId: string) => Promise<void>;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [eventLoading, setEventLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [user, setUserState] = useState<StoredUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [transferRecipient, setTransferRecipient] = useState<string>("");
  const [requestId, setRequestId] = useState<string>("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const updateUnreadNotificationCount = useCallback(async (userId: string) => {
    const count = await fetchUnreadNotificationCount(userId);
    setUnreadNotifications(count);
  }, []);

  const setUser = async (newUser: StoredUser | null) => {
    if (newUser) {
      await authService.setUser(newUser);
      setUserState(newUser);
      setIsAuthenticated(true);
    } else {
      await authService.logout();
      setUserState(null);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUserState(null);
    setIsAuthenticated(false);
  };

  const refreshUserData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        const userResponse = await getUserById(currentUser._id);
        const updatedUserData = userResponse.data?.data;
        await authService.setUser(updatedUserData);
        setUserState(updatedUserData);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = await authService.getUser();
        if (storedUser) {
          setUserState(storedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {}
    };

    initializeAuth();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        error,
        snackbarVisible,
        snackbarMessage,
        setSnackbarVisible,
        setSnackbarMessage,
        setLoading,
        setError,
        user,
        setUser,
        refreshing,
        setRefreshing,
        eventLoading,
        setEventLoading,
        transferRecipient,
        setTransferRecipient,
        requestId,
        setRequestId,
        notifications,
        setNotifications,
        unreadNotifications,
        setUnreadNotifications,
        updateUnreadNotificationCount,
        isAuthenticated,
        logout,
        refreshUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};
