import React from "react";
import { Stack } from "expo-router";
import { TranslationProvider } from "./TranslationContext"; 

export default function RootLayout() {
  return (
    <TranslationProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TranslationProvider>
  );
}
