import React from "react";
import { UserProvider } from "../context/UserContext";
import { AppProvider } from "../context/AppContext";
import { ThemeProvider } from "../context/ThemeContext";
import { CartProvider } from "../context/CartContext";
import { SellerModeProvider } from "../context/SellerModeContext";
import { SearchResultsProvider } from "../context/SearchResultsContext";
import { ProductProvider } from "../context/ProductContext";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AppProvider>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <SellerModeProvider>
              <SearchResultsProvider>
                <ProductProvider>{children}</ProductProvider>
              </SearchResultsProvider>
            </SellerModeProvider>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  );
};
