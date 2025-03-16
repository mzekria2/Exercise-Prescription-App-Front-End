import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useKidMode } from "../context/KidModeContext"; // Import Kid Mode
import { LinearGradient } from "expo-linear-gradient"; // Fun background
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const apiURLBackend = "http://localhost:3000"; // for web
// const apiURLBackend = "http://10.0.0.86:3000";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

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
          credentials: "include", // Ensures cookies are sent with the request
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
      colors={
        isKidMode
          ? ["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb"]
          : ["#ffffff", "#ffffff"]
      }
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <View style={styles.leafAndTitle}>
        <FontAwesome5
          style={styles.leafIcon}
          name="canadian-maple-leaf"
          size={26}
          color="red"
        />
        <Text style={isKidMode ? styles.kidHeading : styles.heading}>
          {isKidMode ? "🎬 Pick a Super Cool Video!" : "Select a Video"}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        data={videos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Link
              href={{
                pathname: "/video/video_display",
                params: { data: JSON.stringify(item) },
              }}
              asChild
              style={[styles.card, isKidMode && styles.kidCard]}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                }}
              >
                <View style={{ width: "100%" }}>
                  <Text
                    style={isKidMode ? styles.kidCardTitle : styles.cardTitle}
                  >
                    {isKidMode ? `📺 ${item.title} 🎉` : item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              onPress={() => handleDelete(item)}
              style={styles.deleteIcon}
            >
              <AntDesign
                name="close"
                size={16}
                color={isKidMode ? "#ff4757" : "red"}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, isKidMode && styles.kidModalContent]}
          >
            <Text style={isKidMode ? styles.kidModalText : styles.modalText}>
              {isKidMode
                ? `🚨 Are you sure? 😱\nSay bye to "${selectedVideo?.title}"?`
                : `Are you sure you want to delete "${selectedVideo?.title}"?`}
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
    top: 4,
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "rgba(255, 245, 245, 0.8)",
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
    marginTop: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  kidHeading: {
    marginTop: 15,
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
    flex: 1,
    alignItems: "center", // Aligns content vertically
    justifyContent: "space-between", // Pushes elements to the edges
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    borderWidth: 2,
    borderColor: "red",
    width: "100%",
    minWidth: screenWidth * 0.8,
  },
  kidCard: {
    flexDirection: "row",
    backgroundColor: "#ffdb4d",
    borderWidth: 5,
    borderColor: "#ff4757",
    borderRadius: 20,
    width: "100%",
    minWidth: screenWidth * 0.8,
    alignItems: "center", // Aligns content vertically
  },
  leafAndTitle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  leafIcon: {
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  kidCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  deleteIcon: {
    position: "absolute",
    padding: 10, // Adds touch area
    right: 10,
    top: 8,
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
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  cancelButton: {
    backgroundColor: "#cccccc",
  },
  deleteConfirmButton: {
    backgroundColor: "red",
  },
});
