import React, { useEffect, useState, createContext} from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme"; 
import { Link } from "expo-router";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { PushTokenProvider } from "./PushTokenProvider";
//export const PushTokenContext = createContext<string | null>(null);

// const registerForPushNotificationsAsync = async (): Promise<string | null> => {
//   if (!Device.isDevice) {
//     Alert.alert("Error", "Must use a physical device for notifications.");
//     return null;
//   }

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   if (finalStatus !== "granted") {
//     Alert.alert("Error", "Push notifications permissions denied.");
//     return null;
//   }

//   const token = (await Notifications.getExpoPushTokenAsync({
//     projectId: "a029abd1-73d4-4569-affd-b92af1be7aa1"
//   })).data;
//   console.log("Expo Push Token:", token);
//   return token;
// };

function Index() {
  const colorScheme = useColorScheme();
  //const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  // useEffect(() => {
  //   if (Platform.OS === "ios" || Platform.OS === "android") {
  //     // Register for push notifications only on iOS and Android
  //     registerForPushNotificationsAsync()
  //       .then((token) => {
  //         setExpoPushToken(token);
  //         console.log("here token:" +token);
  //         if (token) {
  //           // Send the token to the backend for registration
  //           fetch("http://192.168.2.36:3000/api/schedule/register-token", {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify({ userId: "testUser123", expoPushToken: token }),
  //           })
  //             .then((response) => response.json())
  //             .then((data) => {
  //               if (data.error) {
  //                 console.error("Failed to register token:", data.error);
  //               } else {
  //                 console.log("Push token registered successfully:", data);
  //               }
  //             })
  //             .catch((error) => console.error("Error registering push token:", error));
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error during push notification registration:", error);
  //       });
  //   } else {
  //     console.error("Push notifications are not supported on this platform.");
  //   }
  // }, []);

  return (
  <PushTokenProvider>
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the HTC app</Text>
        <Link href="/WelcomeScreen/Welcomescreen">Tap to get Started</Link>
        <Link href="/Notifs/notifications">Notifs</Link>
      </View>
    </ThemeProvider>
   </PushTokenProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Index;
