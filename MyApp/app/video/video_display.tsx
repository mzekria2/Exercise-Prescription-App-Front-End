import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Video } from "expo-av";

const apiURLBackend = "http://10.0.0.61:3000/videos"; // for web
const { width, height } = Dimensions.get("screen");

const Videos = () => {
  const { data } = useLocalSearchParams();
  const router = useRouter();

  let parsedData = null;

  try {
    if (typeof data === "string") {
      parsedData = JSON.parse(data); // Parse string
      console.log("Parsed Data:", parsedData);
    } else if (Array.isArray(data)) {
      parsedData = JSON.parse(data[0]); // Parse array
      console.log("Parsed Data (Array):", parsedData);
    }

    if (!parsedData || !parsedData._id) {
      throw new Error("Invalid video data: _id is missing");
    }
  } catch (error) {
    console.error("Error parsing video data:", error);
    return (
      <View style={styles.videoContainer}>
        <Text style={styles.errorText}>
          Error loading video. Please ensure the data contains a valid `_id`.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.videoContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Video Player */}
      <View style={styles.videoView}>
        <Video
          source={{ uri: `${apiURLBackend}/video/${parsedData._id}` }}
          useNativeControls
          style={styles.video}
          resizeMode="contain"
        />
      </View>

      {/* Video Title */}
      <Text style={styles.videoTitle}>{parsedData.title}</Text>
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  videoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  backButton: {
    position: "absolute",
    top: 50, // Ensure it is visible under any potential headers
    left: 20,
    zIndex: 10, // Ensures it stays above other elements
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#004D40",
    fontWeight: "bold",
  },
  videoView: {
    height: height / 2.5,
    width: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80, // To ensure the back button is not overlapped
  },
  video: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
