import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

//https://8c85-2605-8d80-6a3-89f8-ede5-a0d7-df1c-55bf.ngrok-free.app/videos
const apiURLBackend = "http://localhost:3000"; // for web

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
  const [dimensionsVid, setDimensionsVid] = useState({ width: 0, height: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${apiURLBackend}/videos/allVideos`, {
          // Use the backend URL variable
          method: "GET",
          credentials: "include", // Ensures cookies are sent with the request
        });
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

  // Separate function for async delete request
  const confirmDelete = async () => {
    if (!selectedVideo) return;
    try {
      console.log("Deleting:", selectedVideo._id);

      const response = await fetch(
        `${apiURLBackend}/videos/delete/${selectedVideo._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video._id !== selectedVideo._id)
        );
      } else {
        console.error("Failed to delete video.");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }

    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Select a Video</Text>
      <FlatList
        style={styles.videoContainer}
        data={videos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setDimensionsVid({ width, height });
            }}
          >
            <TouchableOpacity
              style={[{ left: dimensionsVid.width - 40 }]}
              onPress={() => handleDelete(item)}
            >
              <AntDesign name="close" size={12} color="red" />
            </TouchableOpacity>
            <Link
              href={{
                pathname: "/video/video_display",
                params: { data: JSON.stringify(item) },
              }}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
            </Link>
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete "{selectedVideo?.title}"?
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
    </View>
  );
};

export default VideoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAFAFA",
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
  card: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  videoContainer: {
    top: 30,
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
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  deleteConfirmButton: {
    backgroundColor: "red",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
