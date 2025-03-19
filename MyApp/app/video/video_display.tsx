import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useTranslation } from "../TranslationContext";

const apiURLBackend = "https://exercisebackend.duckdns.org";

const VideoDisplay = () => {
  const { data } = useLocalSearchParams();
  const router = useRouter();
  const { language } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [amountCompleted, setAmountCompleted] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  let parsedData = null;
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
    return <Text style={styles.errorText}>Error loading video.</Text>;
  }

  const videoSource = `${apiURLBackend}/videos/video/${parsedData._id}`;
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  useEffect(() => {
    if (amountCompleted >= 0.6) {
      setModalVisible(true);
    }
  }, [amountCompleted]);

  const handleProgress = () => {
    setAmountCompleted(player.currentTime / (player.duration || 1));
  };

  const trackVideoCompletion = async () => {
    try {
      const trackResponse = await fetch(`${apiURLBackend}/progress/markCompletedVideo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: parsedData._id,
          videoTitle: parsedData.title,
        }),
        credentials: "include",
      });
      if (trackResponse.status === 401 || trackResponse.status === 403) {
        router.replace("/WelcomeScreen/Welcomescreen");
        return;
      }
      await trackResponse.json();
    } catch (error) {
      console.error("Error tracking video completion:", error);
    }
    setModalVisible(false);
  };

  useEffect(() => {
    const subscription = player.addListener("playingChange", ({ isPlaying }) => {
      setIsPlaying(isPlaying);
      if (!isPlaying) {
        handleProgress();
      }
    });
    return () => {
      subscription.remove();
    };
  }, [player]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>{parsedData.title || "Video Display"}</Text>
      </View>
      <View style={styles.videoView}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.completionText}>{`Completion: ${(amountCompleted * 100).toFixed(0)}%`}</Text>
      </View>
      <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>You have watched at least 60% of this video. Track it as completed?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={trackVideoCompletion}>
              <Text style={styles.modalButtonText}>Track Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  backButton: {
    paddingTop: 30,
  },
  backButtonText: {
    fontSize: 18,
    fontFamily: "Georgia",
    color: "#2C3E50",
  },
  pageTitle: {
    fontSize: 25,
    paddingTop: 15,
    paddingLeft: 75,
    fontFamily: "Georgia",
    fontWeight: "bold",
    color: "#2C3E50",
    flex: 1,
  },
  videoView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    borderRadius: 30,
    overflow: "hidden",
    height: 50,
  },
  video: {
    width: "95%",
    height: 600,
  },
  bottomContainer: {
    alignItems: "center",
    paddingVertical: 35,
  },
  completionText: {
    fontSize: 18,
    fontFamily: "Georgia",
    color: "#34495E",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontFamily: "Georgia",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#EFA550",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#2C3E50",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default VideoDisplay;
 