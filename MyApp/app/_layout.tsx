import React from 'react';
import { Stack } from "expo-router"; 
import { KidModeProvider } from "./context/KidModeContext"; 

export default function RootLayout() {
  return (
    <KidModeProvider> 
      <Stack />
    </KidModeProvider>
  );
}
