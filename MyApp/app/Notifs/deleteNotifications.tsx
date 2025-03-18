import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, Card, Title, Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";

const API_URL = "http://192.168.2.36:3000/api/schedule";

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
    background: "#FFFFFF",
    text: "#000000",
  },
};

const DeleteNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${API_URL}/testUser123`);
      if (response.ok) {
        const data = await response.json();
        console.log("Raw notifications:", data.notifications);
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

  const deleteNotification = async (dayOfWeek: number, time: string, index: number) => {
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
                `${API_URL}/delete/testUser123/${dayOfWeek}/${formattedTime}/${index}`,
                { method: "DELETE" }
              );
              if (response.ok) {
                setNotifications((prev) =>
                  prev
                    .map((n) => {
                      if (n.dayOfWeek === dayOfWeek) {
                        const newTimes: string[] = [];
                        const newMessages: string[] = [];
                        n.times.forEach((t, idx) => {
                          if (idx !== index) {
                            newTimes.push(t);
                            newMessages.push(n.messages[idx]);
                          }
                        });
                        return { ...n, times: newTimes, messages: newMessages };
                      }
                      return n;
                    })
                    .filter((n) => n.times.length > 0)
                );
                Alert.alert("Success", "Notification deleted successfully!");
              } else {
                const errorData = await response.json();
                Alert.alert("Error", errorData.error || "Failed to delete notification.");
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
        seconds: 15 * 60, // Snooze for 15 minutes
        repeats: false,
      } as Notifications.TimeIntervalTriggerInput,
    });

    Alert.alert("Snoozed!", `Notification will remind you again in 15 minutes.`);
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
                  <Title>{daysOfWeekMap[item.dayOfWeek]}</Title>
                  {item.times.map((time, index) => (
                    <View key={`${item._id}-${index}`} style={styles.notificationRow}>
                      <Text style={styles.notificationText}>
                        {time} - {item.messages[index]}
                      </Text>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.snoozeButton}
                          onPress={() => snoozeNotification("Snoozed Notification", item.messages[index])}
                        >
                          <Text style={styles.buttonText}>Snooze</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => deleteNotification(item.dayOfWeek, time, index)}
                        >
                          <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </Card.Content>
              </Card>
            )}
          />
        )}
        <Button mode="contained" onPress={() => router.back()} style={styles.backButton}>
          Back
        </Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#000",
  },
  noNotifsText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    color: "#555",
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFF",
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
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    marginLeft: 10,
  },
  snoozeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 5,
    borderWidth: 1, // temporary border for debugging
    borderColor: 'black',
  },  
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
  },
});

export default DeleteNotifications;
