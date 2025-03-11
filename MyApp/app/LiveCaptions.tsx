import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { io } from "socket.io-client";

const socket = io("https://tarpon-intent-uniformly.ngrok-free.app"); // Change to your backend URL

const LiveCaptions: React.FC = () => {
  const [captions, setCaptions] = useState<string>("...");
  const [language, setLanguage] = useState<string>("es"); // Default: Spanish

  useEffect(() => {
    socket.on("caption", (translatedText: string) => {
      setCaptions(translatedText);
    });

    return () => {
      socket.off("caption");
    };
  }, []);

  const startListening = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    mediaRecorder.ondataavailable = async (event) => {
      if (event.data.size > 0) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(event.data);
        reader.onloadend = () => {
          socket.emit("audioData", reader.result, language);
        };
      }
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>{captions}</Text>
      <Button title="Start Captions" onPress={startListening} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  caption: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});

export default LiveCaptions;
