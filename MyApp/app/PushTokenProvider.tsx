  import React, { createContext, useState, useEffect } from "react";
  import { Alert, Platform } from "react-native";
  import * as Notifications from "expo-notifications";
  import * as Device from "expo-device";

  export const PushTokenContext = createContext<string | null>(null);

  export const PushTokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

    const registerForPushNotificationsAsync = async (): Promise<string | null> => {
      if (!Device.isDevice) {
        Alert.alert("Error", "Must use a physical device for notifications.");
        return null;
      }
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Error", "Push notifications permissions denied.");
        return null;
      }
      const token = (await Notifications.getExpoPushTokenAsync({
        projectId: "a029abd1-73d4-4569-affd-b92af1be7aa1",
      })).data;
      console.log("Expo Push Token:", token);
      return token;
    };

    useEffect(() => {
      if (Platform.OS === "ios" || Platform.OS === "android") {
        registerForPushNotificationsAsync()
          .then((token) => {
            setExpoPushToken(token);
            console.log("Push token in provider:", token);
          })
          .catch((error) => console.error("Error during push token registration:", error));
      }

      // Listen for incoming notifications
      const subscription = Notifications.addNotificationReceivedListener(notification => {
        console.log("Notification Received:", notification);
      });

      return () => {
        subscription.remove();
      };
    }, []);

    return (
      <PushTokenContext.Provider value={expoPushToken}>
        {children}
      </PushTokenContext.Provider>
    );
  };
