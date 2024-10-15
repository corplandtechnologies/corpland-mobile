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

export interface AppContextType {
  loading: any;
  error: any;
  snackbarVisible: boolean;
  snackbarMessage: string | any;
  setSnackbarVisible: Dispatch<SetStateAction<boolean>>;
  setSnackbarMessage: Dispatch<SetStateAction<string>>;
  setLoading: any;
  setError: any;
  user: any;
  setUser: any;
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
  updateUnreadNotificationCount: any;
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
  const [user, setUser] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [transferRecipient, setTransferRecipient] = useState<string>("");
  const [requestId, setRequestId] = useState<string>("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const updateUnreadNotificationCount = useCallback(async (userId: string) => {
    const count = await fetchUnreadNotificationCount(userId);
    setUnreadNotifications(count);
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
