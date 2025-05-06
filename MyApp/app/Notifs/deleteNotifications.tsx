import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Card,
  Title,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";

// const backendUrl = "https://exercisebackend.duckdns.org/";
const backendUrl = "http://10.0.0.86:3000";
const API_URL = backendUrl + "api/schedule";

const daysOfWeekMap: { [key: number]: string } = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

interface NotificationItem {
  _id: string;
  dayOfWeek: number;
  times: string[];
  messages: string[];
}

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F5F5F5",
    text: "#2C3E50",
  },
};

const DeleteNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${backendUrl}api/auth/profile`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserId(data._id);
        console.log("User ID fetched:", data._id);
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchNotifications = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_URL}/${userId}`);
      if (response.ok) {
        const data = await response.json();
        const filteredNotifications = data.notifications.filter(
          (n: any) => n.dayOfWeek && n.times && n.times.length > 0
        );
        setNotifications(filteredNotifications);
      } else {
        Alert.alert("Error", "Failed to fetch notifications.");
      }
    } catch (error) {
      console.error("Fetch error", error);
      Alert.alert("Error", "Failed to fetch notifications.");
    }
  };

  const deleteNotification = async (
    dayOfWeek: number,
    time: string,
    index: number
  ) => {
    if (!userId) return;

    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete the notification for ${daysOfWeekMap[dayOfWeek]} at ${time}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const formattedTime = encodeURIComponent(time);
              const response = await fetch(
                `${API_URL}/delete/${userId}/${dayOfWeek}/${formattedTime}/${index}`,
                { method: "DELETE" }
              );

              if (response.ok) {
                fetchNotifications(); // Re-fetch from the backend after deletion
                Alert.alert("Success", "Notification deleted successfully!");
              } else {
                const errorData = await response.json();
                Alert.alert(
                  "Error",
                  errorData.error || "Failed to delete notification."
                );
              }
            } catch (error) {
              Alert.alert("Error", "Failed to delete notification.");
            }
          },
        },
      ]
    );
  };

  const snoozeNotification = async (title: string, body: string) => {
    console.log("Snoozing notification:", title, body);
    await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: "default" },
      trigger: {
        seconds: 60, // 1 minute for demo; adjust as needed
        repeats: false,
      } as Notifications.TimeIntervalTriggerInput,
    });

    Alert.alert("Snoozed!", `Notification will remind you again soon.`);
  };

  return (
    <PaperProvider theme={lightTheme}>
      <View style={styles.container}>
        <Title style={styles.header}>Manage Notifications</Title>
        {notifications.length === 0 ? (
          <Text style={styles.noNotifsText}>No notifications found.</Text>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Content>
                  <Title style={styles.dayTitle}>
                    {daysOfWeekMap[item.dayOfWeek]}
                  </Title>
                  {item.times.map((time, index) => (
                    <View
                      key={`${item._id}-${index}`}
                      style={styles.notificationRow}
                    >
                      <Text style={styles.notificationText}>
                        {time} - {item.messages[index]}
                      </Text>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.snoozeButton}
                          onPress={() =>
                            snoozeNotification(
                              "Snoozed Notification",
                              item.messages[index]
                            )
                          }
                        >
                          <Text style={styles.buttonText}>Snooze</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() =>
                            deleteNotification(item.dayOfWeek, time, index)
                          }
                        >
                          <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </Card.Content>
              </Card>
            )}
          />
        )}
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={styles.backButton}
          labelStyle={{ fontFamily: "Georgia", fontWeight: "bold" }}
        >
          Back
        </Button>
      </View>
    </PaperProvider>
  );
};

export default DeleteNotifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 70,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 24,
    fontFamily: "Georgia",
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#2C3E50",
  },
  noNotifsText: {
    fontSize: 16,
    fontFamily: "Georgia",
    textAlign: "center",
    marginVertical: 20,
    color: "#555",
  },
  card: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    // Subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  dayTitle: {
    fontSize: 20,
    fontFamily: "Georgia",
    color: "#2C3E50",
    marginBottom: 8,
  },
  notificationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  notificationText: {
    fontSize: 16,
    flex: 1,
    fontFamily: "Georgia",
    color: "#2C3E50",
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  snoozeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 6,
  },
  deleteButton: {
    backgroundColor: "#C62828",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Georgia",
    fontSize: 14,
    fontWeight: "600",
  },
  backButton: {
    marginTop: 20,
    borderRadius: 25,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
});
