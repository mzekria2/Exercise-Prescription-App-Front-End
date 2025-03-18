import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useTranslation } from "../TranslationContext";

const apiURLBackend = "https://exercisebackend.duckdns.org"; // Backend URL

const VideoDisplay = () => {
  const { data } = useLocalSearchParams();
  const router = useRouter();
  const { language } = useTranslation();

  const [captions, setCaptions] = useState<string>("Generating captions...");
  const [loading, setLoading] = useState<boolean>(true);
  const [amountCompleted, setAmountCompleted] = useState(0);
  const [progressTrackedMsg, setProgressTrackedMsg] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Parse video data
  let parsedData: any = null;
  try {
    if (typeof data === "string") {
      parsedData = JSON.parse(data);
    } else if (Array.isArray(data)) {
      parsedData = JSON.parse(data[0]);
    } else {
      parsedData = data;
    }
    if (!parsedData || !parsedData._id) {
      throw new Error("Invalid video data: _id is missing");
    }
  } catch (error) {
    console.error("Error parsing video data:", error);
    return <Text>Error loading video.</Text>;
  }

  const videoSource = `${apiURLBackend}/videos/video/${parsedData._id}`;

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  // Track video progress and confirm when enough of the video has been viewed
  useEffect(() => {
    if (amountCompleted >= 0.6) {
      confirmTrack();
    }
  }, [amountCompleted]);

  const handleProgress = () => {
    setAmountCompleted(player.currentTime / (player.duration || 1));
  };

  const confirmTrack = async () => {
    setModalVisible(true);
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
        router.replace("/WelcomeScreen/Welcomescreen");
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

  // Listen for changes in the player's playing status
  useEffect(() => {
    const subscription = player.addListener(
      "playingChange",
      ({ isPlaying }) => {
        console.log("Player status changed:", isPlaying ? "Playing" : "Paused");
        setIsPlaying(isPlaying);
        if (!isPlaying) {
          handleProgress();
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [player]);
  return (
    <View style={styles.container}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Do you want to track this video as completed?
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={trackVideoCompletion}
            >
              <Text style={styles.modalButtonText}>Track Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
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


export default VideoDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#004D40",
    fontWeight: "bold",
  },
  videoView: {
    height: "50%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  captionsContainer: {
    marginTop: 20,
    padding: 15,
    alignItems: "center",
  },
  captions: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  modalButton: {
    backgroundColor: "#004D40",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#B0B0B0",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
