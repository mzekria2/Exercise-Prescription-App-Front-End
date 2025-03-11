import React from "react";
import { Stack } from "expo-router";
import { KidModeProvider } from "./context/KidModeContext";
import { TranslationProvider } from "./TranslationContext";

export default function RootLayout() {
  return (
    <TranslationProvider>
      <KidModeProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </KidModeProvider>
    </TranslationProvider>
  );
}
