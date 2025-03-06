import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useKidMode } from "../context/KidModeContext"; // Import Kid Mode
import { LinearGradient } from "expo-linear-gradient"; // For fun background

const UploadVideos = () => {
  const [video, setVideo] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayVidForm, setDisplayVidForm] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const router = useRouter();
  const { isKidMode } = useKidMode(); // Get Kid Mode state

  const backendUrl = "http://localhost:3000"; // Backend URL
  //https://8c85-2605-8d80-6a3-89f8-ede5-a0d7-df1c-55bf.ngrok-free.app

  // Fun animation for Kid Mode buttons
  const bounceAnim = new Animated.Value(1);
  Animated.loop(
    Animated.sequence([
      Animated.timing(bounceAnim, { toValue: 1.1, duration: 500, useNativeDriver: true }),
      Animated.timing(bounceAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ])
  ).start();

  const pickVideoFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      setDisplayVidForm(true);
    }
  };

  const recordVideo = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      setDisplayVidForm(true);
    }
  };

  return (
    <LinearGradient
      colors={isKidMode ? ["#ff6b6b", "#ffa502", "#f9ca24", "#7bed9f"] : ["#ffffff", "#ffffff"]}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {!displayVidForm && !isUploaded && (
        <>
          <Text style={isKidMode ? styles.kidLabel : styles.label}>
            {isKidMode ? "🎉 Pick an Option, Superstar! 🎬" : "Choose an option:"}
          </Text>

          <Animated.View style={{ transform: [{ scale: isKidMode ? bounceAnim : 1 }] }}>
            <TouchableOpacity style={isKidMode ? styles.kidButton : styles.button} onPress={recordVideo}>
              <Text style={styles.buttonText}>
                {isKidMode ? "🎥 Record a Super Cool Video!" : "Record a Video"}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={isKidMode ? styles.kidButton : [styles.button, styles.secondaryButton]}
            onPress={pickVideoFromGallery}
          >
            <Text style={styles.buttonText}>
              {isKidMode ? "📺 Pick an Awesome Video!" : "Upload from Gallery"}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {displayVidForm ? (
        <>
          <Text style={isKidMode ? styles.kidLabel : styles.label}>
            {isKidMode ? "🎨 Add Some Magic to Your Video!" : "Upload a New Video:"}
          </Text>
          <View>
            <Text style={styles.label}>Video Title:</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={title}
              onChangeText={(value) => setTitle(value)}
            />
          </View>
          <View>
            <Text style={styles.label}>Video Description:</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={description}
              onChangeText={(value) => setDescription(value)}
            />
          </View>
          <TouchableOpacity style={isKidMode ? styles.kidButton : styles.button}>
            <Text style={styles.buttonText}>
              {isKidMode ? "🚀 Blast Off! Upload Now!" : "Upload"}
            </Text>
          </TouchableOpacity>
        </>
      ) : isUploaded ? (
        <Text style={styles.label}>
          {isKidMode ? "🎊 Your Video is Live! 🎬" : "Video Uploaded. You can go back to view it."}
        </Text>
      ) : null}
    </LinearGradient>
  );
};

export default UploadVideos;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#004D40",
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  kidLabel: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
    color: "#ff4757",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#D62B1F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
    width: "80%",
  },
  kidButton: {
    backgroundColor: "#ff4757",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#ffcc00",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 15,
    alignItems: "center",
    width: "80%",
  },
  secondaryButton: {
    backgroundColor: "#004D40",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
