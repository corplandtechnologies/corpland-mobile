// contexts/SellerModeContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";

interface SellerModeContextType {
  isSellerMode: boolean;
  toggleSellerMode: () => void;
}

const SellerModeContext = createContext<SellerModeContextType | undefined>(
  undefined
);

export const useSellerMode = () => {
  const context = useContext(SellerModeContext);
  if (!context) {
    throw new Error("useSellerMode must be used within a SellerModeProvider");
  }
  return context;
};

export const SellerModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSellerMode, setIsSellerMode] = useState(false);

  const toggleSellerMode = () => {
    setIsSellerMode(!isSellerMode);
  };

  return (
    <SellerModeContext.Provider value={{ isSellerMode, toggleSellerMode }}>
      {children}
    </SellerModeContext.Provider>
  );
};
