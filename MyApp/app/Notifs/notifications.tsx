// notifications.tsx
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {
  Button,
  Text,
  TextInput,
  Card,
  Title,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { PushTokenContext } from "../PushTokenProvider";
import { useRouter } from 'expo-router';
import * as Notifications from "expo-notifications";

const API_URL = "http://192.168.2.36:3000/api/schedule/schedule";

const testConnection = async () => {
  try {
    const response = await fetch("http://192.168.2.36:3000/api/schedule/test");
    console.log("Server response status:", response.status);
    Alert.alert(
      "Connection Test",
      response.ok ? "Server is reachable!" : `Server error: ${response.status}`
    );
  } catch (error) {
    console.error("Connection test failed:", error);
    Alert.alert("Connection Failed", "Could not reach the server");
  }
};

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
    text: "#000000",
  },
};

// -----------------------
// TimePickerComponent
// -----------------------
interface TimePickerProps {
  time: string | null;
  onTimeSelected: (time: string) => void;
}
const TimePickerComponent: React.FC<TimePickerProps> = ({ time, onTimeSelected }) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const initialDate = time ? new Date(`1970-01-01T${time}:00`) : new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  const handleChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const confirmTime = () => {
    const formattedTime = selectedDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    onTimeSelected(formattedTime);
    setShowPicker(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.timeInput} onPress={() => setShowPicker(true)}>
        <Text style={styles.timeText}>{time ? time : 'Select Time'}</Text>
      </TouchableOpacity>
      {showPicker && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={selectedDate}
                mode="time"
                display="spinner"
                is24Hour={false}
                onChange={handleChange}
                textColor="#000"
              />
              <Button mode="contained" onPress={confirmTime} style={styles.confirmButton}>
                Confirm
              </Button>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

// -----------------------
// MessagePickerComponent (opens upward)
// -----------------------
interface MessagePickerProps {
  message: string;
  onMessageSelected: (message: string) => void;
}
const MessagePickerComponent: React.FC<MessagePickerProps> = ({ message, onMessageSelected }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(message || "");
  const [items, setItems] = useState([
    { label: "Reminder 1: It's time for your hand therapy exercises!", value: 'Reminder 1' },
    { label: 'Reminder 2: Take a break and stretch!', value: 'Reminder 2' },
    { label: 'Reminder 3: Time for Exercise!', value: 'Reminder 3' },
    { label: 'Custom Message', value: 'custom' },
  ]);

  useEffect(() => {
    onMessageSelected(value);
  }, [value]);

  return (
    <View style={styles.dropdownWrapper}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select message..."
        dropDownDirection="TOP" // Open upward
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainerUp}
        listItemContainerStyle={styles.dropdownItem}
        showTickIcon={false}
        closeOnBackPressed
        zIndex={3000}
        onChangeValue={(val) => val && onMessageSelected(val)}
      />
    </View>
  );
};

// -----------------------
// HeaderComponent for FlatList Header
// -----------------------
interface HeaderProps {
  daysOfWeek: string[];
  onDayToggle: (day: string) => void;
  selectedDays: string[];
}
const HeaderComponent: React.FC<HeaderProps> = ({ daysOfWeek, onDayToggle, selectedDays }) => {
  return (
    <View>
      <Title style={styles.header}>Schedule Notifications</Title>
      <Text style={styles.subHeader}>Select Days of the Week</Text>
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => onDayToggle(day)}
            style={styles.dayButton}
          >
            <Text style={styles.dayText}>{day}</Text>
            <SquareCheckbox day={day} selectedDays={selectedDays} onToggle={onDayToggle} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// -----------------------
// SquareCheckbox Component
// -----------------------
interface SquareCheckboxProps {
  day: string;
  selectedDays: string[];
  onToggle: (day: string) => void;
}
const SquareCheckbox: React.FC<SquareCheckboxProps> = ({ day, selectedDays, onToggle }) => {
  const isChecked = selectedDays.includes(day);
  return (
    <TouchableOpacity
      style={[styles.checkbox, isChecked && styles.checkboxChecked]}
      onPress={() => onToggle(day)}
    >
      {isChecked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );
};

// -----------------------
// DayCard Component
// -----------------------
interface DayCardProps {
  day: string;
  notificationCount: number;
  times: (string | null)[];
  messages: string[];
  onCountChange: (increment: boolean) => void;
  onTimeChange: (index: number, time: string) => void;
  onMessageChange: (index: number, message: string) => void;
  customMessages: string[];
  setCustomMessage: (index: number, text: string) => void;
}
const DayCard: React.FC<DayCardProps> = ({
  day,
  notificationCount,
  times,
  messages,
  onCountChange,
  onTimeChange,
  onMessageChange,
  customMessages,
  setCustomMessage,
}) => {
  const [currentOpenIndex, setCurrentOpenIndex] = useState<number | null>(null);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>{day}</Title>
        <Text style={styles.label}>Number of Notifications</Text>
        <View style={styles.notificationCount}>
          <Button mode="outlined" onPress={() => onCountChange(false)}>
            -
          </Button>
          <Text style={styles.countText}>{notificationCount}</Text>
          <Button mode="outlined" onPress={() => onCountChange(true)}>
            +
          </Button>
        </View>
        <Text style={styles.label}>Set Notification Times and Messages</Text>
        {Array.from({ length: notificationCount }).map((_, index) => (
          <View
            key={index}
            style={[styles.notificationInput, { zIndex: currentOpenIndex === index ? 1000 : 1 }]}
          >
            <TimePickerComponent
              time={times[index]}
              onTimeSelected={(selectedTime) => onTimeChange(index, selectedTime)}
            />
            <MessagePickerComponent
              message={messages[index] || ""}
              onMessageSelected={(selectedMsg) => {
                setCurrentOpenIndex(selectedMsg ? index : null);
                onMessageChange(index, selectedMsg);
              }}
            />
            {messages[index] === 'custom' && (
              <TextInput
                mode="outlined"
                label="Custom Message"
                value={customMessages[index]}
                onChangeText={(text) => setCustomMessage(index, text)}
                style={styles.textInput}
              />
            )}
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};

// -----------------------
// Main App Component using FlatList
// -----------------------
const daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const App: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [notificationsPerDay, setNotificationsPerDay] = useState<{ [key: string]: number }>({});
  const [times, setTimes] = useState<{ [key: string]: (string | null)[] }>({});
  const [messages, setMessages] = useState<{ [key: string]: string[] }>({});
  const [customMessages, setCustomMessages] = useState<{ [key: string]: string[] }>({});

  const expoPushToken = useContext(PushTokenContext);
  const router = useRouter();

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
    if (!notificationsPerDay[day]) {
      setNotificationsPerDay((prev) => ({ ...prev, [day]: 1 }));
      setTimes((prev) => ({ ...prev, [day]: [null] }));
      setMessages((prev) => ({ ...prev, [day]: [""] }));
      setCustomMessages((prev) => ({ ...prev, [day]: [""] }));
    }
  };

  const handleNotificationCountChange = (day: string, increment: boolean) => {
    setNotificationsPerDay((prev) => {
      const newCount = increment ? prev[day] + 1 : Math.max(prev[day] - 1, 1);
      return { ...prev, [day]: newCount };
    });
    setTimes((prev) => {
      const newTimes = [...(prev[day] || [null])];
      if (increment) {
        newTimes.push(null);
      } else if (newTimes.length > 1) {
        newTimes.pop();
      }
      return { ...prev, [day]: newTimes };
    });
    setMessages((prev) => {
      const newMessages = [...(prev[day] || [""])];
      if (increment) {
        newMessages.push("");
      } else if (newMessages.length > 1) {
        newMessages.pop();
      }
      return { ...prev, [day]: newMessages };
    });
    setCustomMessages((prev) => {
      const newCustoms = [...(prev[day] || [""])];
      if (increment) {
        newCustoms.push("");
      } else if (newCustoms.length > 1) {
        newCustoms.pop();
      }
      return { ...prev, [day]: newCustoms };
    });
  };

  const handleTimeChange = (day: string, index: number, time: string) => {
    setTimes((prev) => {
      const newTimes = [...prev[day]];
      newTimes[index] = time;
      return { ...prev, [day]: newTimes };
    });
  };

  const handleMessageChange = (day: string, index: number, message: string) => {
    setMessages((prev) => {
      const newMessages = [...prev[day]];
      newMessages[index] = message;
      return { ...prev, [day]: newMessages };
    });
  };

  const handleCustomMessageChange = (day: string, index: number, text: string) => {
    setCustomMessages((prev) => {
      const newCustoms = [...(prev[day] || [""])];
      newCustoms[index] = text;
      return { ...prev, [day]: newCustoms };
    });
  };

  const scheduleNotifications = async () => {
    const token = expoPushToken;
    console.log("Current expoPushToken in notifs.tsx:", token);
    if (!token) {
      Alert.alert("Error", "Push token not available. Please enable notifications.");
      return;
    }
    if (selectedDays.length === 0) {
      Alert.alert("Validation Error", "Please select at least one day.");
      return;
    }
    for (const day of selectedDays) {
      const dayMessages = messages[day] || [];
      const dayTimes = times[day] || [];
      if (dayTimes.some((t) => !t) || dayMessages.some((m) => !m)) {
        Alert.alert("Validation Error", `Please complete all fields for ${day}`);
        return;
      }
    }
    const requestBody = {
      userId: "testUser123",
      pushToken: token,
      notifications: selectedDays.map((day) => ({
        dayOfWeek: daysOfWeek.indexOf(day) + 1,
        times: times[day],
        messages: messages[day].map((m, index) =>
          m === "custom" ? customMessages[day][index] : m
        ),
      })),
    };
    console.log("Request Body:", JSON.stringify(requestBody));
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Notifications scheduled successfully!");
      } else {
        Alert.alert("Error", "Failed to schedule notifications.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to schedule notifications.");
    }
  };

  const renderDayCard = ({ item: day }: { item: string }) => (
    <DayCard
      day={day}
      notificationCount={notificationsPerDay[day]}
      times={times[day]}
      messages={messages[day]}
      onCountChange={(increment) => handleNotificationCountChange(day, increment)}
      onTimeChange={(index, time) => handleTimeChange(day, index, time)}
      onMessageChange={(index, message) => handleMessageChange(day, index, message)}
      customMessages={customMessages[day] || [""]}
      setCustomMessage={(index, text) => handleCustomMessageChange(day, index, text)}
    />
  );

  const Header = () => (
    <HeaderComponent
      daysOfWeek={daysOfWeek}
      onDayToggle={handleDayToggle}
      selectedDays={selectedDays}
    />
  );

  const Footer = () => (
    <View>
      <Button mode="outlined" onPress={testConnection}>
        Test Server Connection
      </Button>
      <Button mode="contained" onPress={scheduleNotifications} style={styles.submitButton}>
        Schedule Notifications
      </Button>
      <Button mode="contained" onPress={() => router.push('./deleteNotifications')} style={styles.submitButton}>
        Delete Notifications
      </Button>
      <Button
        mode="contained"
        onPress={() => router.push('/')}
        style={styles.backButton}
      >
        Back
      </Button>

    </View>
  );

  return (
    <PaperProvider theme={lightTheme}>
      <FlatList
        data={selectedDays}
        keyExtractor={(item) => item}
        renderItem={renderDayCard}
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
      />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  header: {
    marginVertical: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 16,
  },
  dayButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    margin: 4,
    elevation: 2,
  },
  dayText: {
    marginRight: 8,
    fontSize: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#000",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
  },
  card: {
    width: "100%",
    marginVertical: 8,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginVertical: 4,
  },
  notificationCount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "40%",
    marginVertical: 8,
  },
  countText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  notificationInput: {
    marginVertical: 8,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  timeText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownWrapper: {
    position: "relative",
    width: "100%",
  },
  dropdown: {
    borderColor: "#ccc",
  },
  // This style positions the dropdown container above the trigger
  dropdownContainerUp: {
    position: 'absolute',
    bottom: '100%',
    width: '100%',
    zIndex: 2000,
    elevation: 50,
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  dropdownItem: {
    zIndex: 3000,
  },
  textInput: {
    width: "100%",
    marginVertical: 8,
  },
  submitButton: {
    marginVertical: 16,
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  confirmButton: {
    marginTop: 16,
  },
  backButton: {
    marginVertical: 16,
    width: "100%",
  },
  
});

export default App;
