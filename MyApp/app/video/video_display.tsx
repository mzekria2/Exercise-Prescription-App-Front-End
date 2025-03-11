import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator   Modal,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useTranslation } from "../TranslationContext";

const apiURLBackend = "https://tarpon-intent-uniformly.ngrok-free.app"; // Backend URL

const VideoDisplay = () => {
  const { data } = useLocalSearchParams();
  const router = useRouter();
  const { language } = useTranslation();
  
  const [captions, setCaptions] = useState<string>("Generating captions...");
  const [loading, setLoading] = useState<boolean>(true);
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
    parsedData = JSON.parse(data);
  } catch (error) {
    console.error("Error parsing video data:", error);
    return <Text>Error loading video.</Text>;
  }

  const videoSource = `${apiURLBackend}/videos/video/${parsedData._id}`;

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  useEffect(() => {
    if (amountCompleted >= 0.6) {
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
    fetchCaptions();
  }, [parsedData._id, language]);

  const fetchCaptions = async () => {
    try {
      setLoading(true);
  
      if (!parsedData || !parsedData._id) {
        console.error("Invalid video data: missing `_id`");
        setCaptions("Error: Video ID is missing.");
        setLoading(false);
        return;
      }
  
      console.log("Uploading video for captioning...");
      const response = await fetch(videoSource);
      const videoBlob = await response.blob();
  
      const formData = new FormData();
      formData.append("video", videoBlob, "video.mp4");
  
      const captionsResponse = await fetch(`${apiURLBackend}/api/captions/generate-captions`, {
        method: "POST",
        body: formData,
      });
  
      console.log("Response Status:", captionsResponse.status);
      if (!captionsResponse.ok) {
        const errorText = await captionsResponse.text();
        throw new Error(`Captions API error: ${errorText}`);
      }
  
      const result = await captionsResponse.json();
      setCaptions(result.captions || "No captions available.");
    } catch (error) {
      console.error("Error fetching captions:", error);
      setCaptions("Error loading captions.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.videoView}>
        <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
      </View>

      {/* Display Captions */}
      <View style={styles.captionsContainer}>
        {loading ? <ActivityIndicator size="small" color="#D62B1F" /> : <Text style={styles.captions}>{captions}</Text>}
      </View>
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
  },
});