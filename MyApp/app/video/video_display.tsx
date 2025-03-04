import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";

const apiURLBackend = "http://localhost:3000"; // for web

const { width, height } = Dimensions.get("screen");

const Videos = () => {
  const { data } = useLocalSearchParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

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

  const videoSource = `${apiURLBackend}/videos/video/${parsedData._id}`;
  console.log("Video source:", videoSource);
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    const subscription = player.addListener(
      "statusChange",
      ({ status, error }) => {
        if (status === "playing") {
          setIsPlaying(true);
        } else if (status === "paused") {
          setIsPlaying(false);
        }
        console.log("Player status changed:", status);
      }
    );

    return () => {
      subscription.remove();
    };
  }, [player]);

  return (
    <View style={styles.videoContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <View style={styles.videoView}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      </View>
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
    top: 20, // Ensure it is visible under any potential headers
    left: 10,
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
  controlsContainer: {
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
