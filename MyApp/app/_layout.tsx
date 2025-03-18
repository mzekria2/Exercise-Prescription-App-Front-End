// app/_layout.tsx
import React from "react";
import { Slot } from "expo-router";
import { PushTokenProvider } from "./PushTokenProvider"; // Adjust the path if needed

export default function RootLayout() {
  return (
    <PushTokenProvider>
      <Slot />
    </PushTokenProvider>
  );
}
