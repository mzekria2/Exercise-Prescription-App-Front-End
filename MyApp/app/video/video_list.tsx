import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useKidMode } from "../context/KidModeContext"; // Import Kid Mode
import { LinearGradient } from "expo-linear-gradient"; // Fun background

//https://8c85-2605-8d80-6a3-89f8-ede5-a0d7-df1c-55bf.ngrok-free.app/videos
const apiURLBackend = "https://exercisebackend.duckdns.org"; // for web

type Video = {
  _id: string;
  title: string;
  description?: string;
  filename: string;
  path: string;
  size: number;
  format: string;
};

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { isKidMode } = useKidMode(); // Get Kid Mode state

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${apiURLBackend}/videos/allVideos`, {
          // Use the backend URL variable
          method: "GET",
          headers: { "ngrok-skip-browser-warning": "true" },
          credentials: "include", 
        });

        if (response.status === 401 || response.status === 403) {
          console.warn("Token expired. Redirecting to sign-up...");
          router.replace("/WelcomeScreen/Welcomescreen"); // Redirect user to sign-up page
          return;
        }

        if (!response.ok) {
          // If the response status code is not in the 200 range, throw an error
          const errorData = await response.json();
          throw new Error(errorData.message || "Unauthorized");
        }
        const data: Video[] = await response.json();

        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleDelete = (video: Video) => {
    setModalVisible(true);
    setSelectedVideo(video);
  };

  const confirmDelete = async () => {
    if (!selectedVideo) return;
    try {
      const response = await fetch(
        `${apiURLBackend}/videos/delete/${selectedVideo._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video._id !== selectedVideo._id)
        );

        const deleteProgressResponse = await fetch(
          `${apiURLBackend}/progress/delete/${selectedVideo._id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (deleteProgressResponse.ok) {
          console.log("Progress deleted");
        } else {
          console.error("Failed to delete progress.");
        }
      } else {
        console.error("Failed to delete video.");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }

    setModalVisible(false);
  };


  return (
    <LinearGradient
      colors={isKidMode ? ["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb"] : ["#ffffff", "#ffffff"]}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={isKidMode ? styles.kidHeading : styles.heading}>
        {isKidMode ? "🎬 Pick a Super Cool Video!" : "Select a Video"}
      </Text>

      <FlatList
        style={styles.videoContainer}
        data={videos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, isKidMode && styles.kidCard]}
            >
              <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteIcon}>
                <AntDesign name="close" size={16} color={isKidMode ? "#ff4757" : "red"} />
              </TouchableOpacity>
              <Link
                href={{
                  pathname: "/video/video_display",
                  params: { data: JSON.stringify(item) },
                }}
              >
                <Text style={isKidMode ? styles.kidCardTitle : styles.cardTitle}>
                  {isKidMode ? `📺 ${item.title} 🎉` : item.title}
                </Text>
              </Link>
            </TouchableOpacity>
        )}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isKidMode && styles.kidModalContent]}>
            <Text style={isKidMode ? styles.kidModalText : styles.modalText}>
              {isKidMode ? `🚨 Are you sure? 😱\nSay bye to "${selectedVideo?.title}"?` : `Are you sure you want to delete "${selectedVideo?.title}"?`}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteConfirmButton]}
                onPress={confirmDelete}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default VideoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#004D40",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  kidHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ff4757",
    textShadowColor: "#ffcc00",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  card: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  kidCard: {
    backgroundColor: "#ffcc00",
    borderWidth: 5,
    borderColor: "#ff4757",
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  kidCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  deleteIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  kidModalContent: {
    backgroundColor: "#ffcc00",
    borderColor: "#ff4757",
    borderWidth: 5,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
  },
  kidModalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff4757",
  },
});
