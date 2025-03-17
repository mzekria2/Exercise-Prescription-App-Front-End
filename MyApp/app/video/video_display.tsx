import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";

const apiURLBackend = "http://localhost:3000"; // for web
// const apiURLBackend = "http://10.0.0.86:3000";

const { width, height } = Dimensions.get("screen");

const Videos = () => {
  const { data } = useLocalSearchParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0); // State for current time
  // const [totalTime, setTotalTime] = useState(0); // State for total time
  const [amountCompleted, setAmountCompleted] = useState(0); // State for amount completed
  const [progressTrackedMsg, setProgressTrackedMsg] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  let parsedData = null;

  try {
    if (typeof data === "string") {
      parsedData = JSON.parse(data); // Parse string
      //console.log("Parsed Data:", parsedData);
    } else if (Array.isArray(data)) {
      parsedData = JSON.parse(data[0]); // Parse array
      //console.log("Parsed Data (Array):", parsedData);
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

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  useEffect(() => {
    if (amountCompleted >= 0.9) {
      confirmTrack();
    }
  }, [amountCompleted]);

  // Function to track progress using player.currentTime & player.duration
  const handleProgress = () => {
    setAmountCompleted(player.currentTime / (player.duration || 1));
  };
  // Function to track video completion
  const confirmTrack = async () => {
    setModalVisible(true); // Show pop-up when video ends
  };
  const trackVideoCompletion = async () => {
    try {
      const trackResponse = await fetch(
        `${apiURLBackend}/progress/markCompletedVideo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId: parsedData._id,
            videoTitle: parsedData.title,
          }),
          credentials: "include",
        }
      );
      if (trackResponse.status === 401 || trackResponse.status === 403) {
        console.warn("Token expired. Redirecting to sign-up...");
        router.replace("/WelcomeScreen/Welcomescreen"); // Redirect user to sign-up page
        return;
      }
      const responseData = await trackResponse.json();

      setProgressTrackedMsg(
        "Video completion tracked. Response: " + JSON.stringify(responseData)
      );
    } catch (error) {
      console.error("Error tracking video completion:", error);
    }
    setModalVisible(false);
  };

  useEffect(() => {
    const subscription = player.addListener(
      "playingChange",
      ({ isPlaying, oldIsPlaying }) => {
        console.log("Player status changed:", isPlaying ? "Playing" : "Paused");

        if (isPlaying) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
          handleProgress();
        }
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
      <Text style={styles.videoDescription}>{parsedData.description}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back button press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Do you want to track this video as completed?
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={trackVideoCompletion} // Calls API
            >
              <Text style={styles.modalButtonText}>Track Video</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)} // Close modal without tracking
            >
              <Text style={styles.modalButtonText}>
                I Already Tracked My Video Today
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  videoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004D40",
    textAlign: "center",
    marginTop: 20,
  },
  videoDescription: {
    textAlign: "center",
    marginHorizontal: 25,
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 10,
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
    width: "90%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    alignSelf: "center",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4, // Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },

  cancelButton: {
    backgroundColor: "#B0B0B0",
  },
  modalButton: {
    backgroundColor: "#004D40",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
