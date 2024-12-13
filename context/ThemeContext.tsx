import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { LIGHT_THEME, DARK_THEME, ThemeColors } from "../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeContextType = {
  theme: ThemeColors;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: LIGHT_THEME,
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  console.log("System Color Scheme", systemColorScheme);

  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");

  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(systemColorScheme === "dark");
    };

    updateTheme();
  }, [systemColorScheme]);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      console.log(savedTheme);

      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === "dark");
      } else {
        setIsDarkMode(systemColorScheme === "dark");
      }
    } catch (error) {
      console.error("Failed to load theme preference:", error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
    } catch (error) {
      console.error("Failed to toggle theme:", error);
    }
  };

  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
