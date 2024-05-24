// Import necessary modules and functions
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProductById } from "../api/api"; // Assuming you have a function to get product by ID

interface ProductContextType {
  productId: string;
  setProductId: (id: string) => void;
  loading: boolean;
  error: any;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);


export const ProductProvider: React.FC = ({ children }) => {
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const storedProductId = await AsyncStorage.getItem("selectedProductId");
        if (storedProductId) {
          setProductId(storedProductId);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const getProductById = async (id: string) => {
    setLoading(true);
    try {
      const response = await getProductById(id); // Ensure this function exists and returns the expected format
      setProductId(response.data?.productId || "");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{ productId, setProductId, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

