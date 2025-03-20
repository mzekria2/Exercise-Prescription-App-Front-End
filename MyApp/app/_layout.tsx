import React from "react";
import { Stack } from "expo-router";
import { KidModeProvider } from "./context/KidModeContext";
import { TranslationProvider } from "./TranslationContext";
import { Slot } from "expo-router";
import { PushTokenProvider } from "./PushTokenProvider"; 

export default function RootLayout() {
  return (
    <PushTokenProvider>
        <TranslationProvider>
        <KidModeProvider>
            {/* <Slot /> */}
            <Stack screenOptions={{ headerShown: false }} />
        </KidModeProvider>
        </TranslationProvider>
    </PushTokenProvider>
    );
}
