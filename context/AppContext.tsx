import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode, // Import ReactNode
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppContextType {
  loading: any;
  error: any;
  snackbarVisible: boolean;
  snackbarMessage: string | any;
  setSnackbarVisible: any;
  setSnackbarMessage: any;
  setLoading: any;
  setError: any;
  user: any;
  setUser: any;
  refreshing: boolean;
  setRefreshing: any;
  eventLoading: boolean;
  setEventLoading: any;
  transferRecipient: string;
  setTransferRecipient: any;
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