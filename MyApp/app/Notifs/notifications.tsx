import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Checkbox, Button, Text, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const App: React.FC = () => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [notificationCount, setNotificationCount] = useState<number>(1);
    const [times, setTimes] = useState<string[]>(["12:00"]); // Default time
    const [fcmToken, setFcmToken] = useState<string>("placeholder_token");
    const [selectedMessage, setSelectedMessage] = useState<string>(""); // New state for message
    const [customMessage, setCustomMessage] = useState<string>(""); // New state for custom message
  
    const predefinedMessages = [
      { label: "Reminder 1: It's time for your hand therapy exercises!", value: "It's time for your hand therapy exercises!" },
      { label: "Reminder 2: Take a break and stretch!", value: "Take a break and stretch!" },
      { label: "Reminder 3: Time for Exercise!", value: "Time for Exercise!" },
      { label: "Custom Message", value: "custom" },
    ];
  
    const handleDayToggle = (day: string) => {
      setSelectedDays((prev) =>
        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
      );
    };
  
    const handleNotificationCountChange = (increment: boolean) => {
      if (increment) {
        setNotificationCount((prev) => Math.min(prev + 1, 10)); // Max 10 notifications
        setTimes((prev) => [...prev, "12:00"]); // Add default time for new notification
      } else if (notificationCount > 1) {
        setNotificationCount((prev) => prev - 1);
        setTimes((prev) => prev.slice(0, -1)); // Remove the last time slot
      }
    };
  
    const handleTimeChange = (index: number, time: string) => {
      const updatedTimes = [...times];
      updatedTimes[index] = time;
      setTimes(updatedTimes);
    };
  
    const handleSubmit = async () => {
      if (selectedDays.length === 0) {
        Alert.alert("Validation Error", "Please select at least one day.");
        return;
      }
  
      const finalMessage =
        selectedMessage === "custom" ? customMessage : selectedMessage;
  
      if (!finalMessage) {
        Alert.alert("Validation Error", "Please select or enter a message.");
        return;
      }
  
      const notifications = times.map((time) => ({
        daysOfWeek: selectedDays,
        time,
        message: finalMessage,
      }));
  
      try {
        const payload = {
          userId: "testUser",
          fcmToken,
          notifications,
        };
  
        await axios.post("http://localhost:3000/api/schedule", payload);
        Alert.alert("Success", "Notifications scheduled successfully!");
      } catch (error) {
        console.error("Error scheduling notifications:", error);
        Alert.alert("Error", "Failed to schedule notifications.");
      }
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Schedule Notifications</Text>
  
        {/* Days of the Week Checkboxes */}
        <Text style={styles.sectionTitle}>Select Days of the Week</Text>
        <View style={styles.checkboxContainer}>
          {daysOfWeek.map((day) => (
            <View key={day} style={styles.checkboxRow}>
              <Checkbox
                status={selectedDays.includes(day) ? "checked" : "unchecked"}
                onPress={() => handleDayToggle(day)}
              />
              <Text>{day}</Text>
            </View>
          ))}
        </View>
  
        {/* Number of Notifications */}
        <Text style={styles.sectionTitle}>Number of Notifications Per Day</Text>
        <View style={styles.notificationCount}>
          <Button mode="outlined" onPress={() => handleNotificationCountChange(false)}>-</Button>
          <Text>{notificationCount}</Text>
          <Button mode="outlined" onPress={() => handleNotificationCountChange(true)}>+</Button>
        </View>
  
        {/* Time Pickers */}
        <Text style={styles.sectionTitle}>Set Notification Times</Text>
        {times.map((time, index) => (
          <RNPickerSelect
            key={index}
            onValueChange={(value) => handleTimeChange(index, value)}
            items={Array.from({ length: 48 }).map((_, i) => {
              const hour = String(Math.floor(i / 2)).padStart(2, "0");
              const minute = i % 2 === 0 ? "00" : "30";
              return { label: `${hour}:${minute}`, value: `${hour}:${minute}` };
            })}
            value={time}
            style={pickerStyles}
            placeholder={{ label: "Select Time", value: null }}
          />
        ))}
  
        {/* Message Selector */}
        <Text style={styles.sectionTitle}>Select a Message</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedMessage(value)}
          items={predefinedMessages}
          value={selectedMessage}
          style={pickerStyles}
          placeholder={{ label: "Select a Message", value: null }}
        />
        {selectedMessage === "custom" && (
          <TextInput
            mode="outlined"
            label="Custom Message"
            value={customMessage}
            onChangeText={(text) => setCustomMessage(text)}
            style={styles.textInput}
          />
        )}
  
        {/* Submit Button */}
        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
          Schedule Notifications
        </Button>
      </ScrollView>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  notificationCount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "50%",
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
  },
  textInput: {
    width: "100%", // Full width
    height: 50, // Height of the text input
    marginVertical: 10, // Vertical margin
    borderWidth: 1, // Add a border
    borderColor: "#ccc", // Border color
    borderRadius: 5, // Rounded corners
    paddingHorizontal: 10, // Horizontal padding for text
  },
});

const pickerStyles = {
  inputAndroid: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 10,
  },
  inputIOS: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 10,
  },
};

export default App;
