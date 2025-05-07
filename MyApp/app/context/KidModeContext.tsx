import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create Context
const KidModeContext = createContext({
  isKidMode: false,
  toggleKidMode: () => {},
});

// Hook to use Kid Mode
export const useKidMode = () => useContext(KidModeContext);

// Provider Component
export const KidModeProvider = ({ children }) => {
  const [isKidMode, setIsKidMode] = useState(false);

  // Load saved Kid Mode state from AsyncStorage
  useEffect(() => {
    const loadKidMode = async () => {
      const savedMode = await AsyncStorage.getItem("kidMode");
      if (savedMode !== null) {
        setIsKidMode(JSON.parse(savedMode));
      }
    };
    loadKidMode();
  }, []);

  // Toggle Kid Mode and save the state
  const toggleKidMode = async () => {
    setIsKidMode((prev) => {
      const newMode = !prev;
      AsyncStorage.setItem("kidMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <KidModeContext.Provider value={{ isKidMode, toggleKidMode }}>
      {children}
    </KidModeContext.Provider>
  );
};
