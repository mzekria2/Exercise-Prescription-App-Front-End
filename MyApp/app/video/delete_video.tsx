import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

//https://8c85-2605-8d80-6a3-89f8-ede5-a0d7-df1c-55bf.ngrok-free.app/videos
const apiURLBackend = "http://localhost:3000"; // Backend API URL

const { width } = Dimensions.get("screen");

const DeleteVideo = () => {
  const [videoList, setVideoList] = useState<{ _id: string; title: string }[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${apiURLBackend}/allVideos`);
        const data = await response.json();
        setVideoList(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleDelete = (videoId: string, videoTitle: string) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete the video "${videoTitle}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(
                `${apiURLBackend}/delete/${videoId}`,
                {
                  method: "DELETE",
                }
              );

              if (response.ok) {
                setVideoList((prevList) =>
                  prevList.filter((video) => video._id !== videoId)
                );
                alert(`Video "${videoTitle}" deleted successfully.`);
              } else {
                alert("Failed to delete video. Please try again.");
              }
            } catch (error) {
              console.error("Error deleting video:", error);
              alert("An error occurred. Please try again.");
            }
          },
        },
      ]
    );
  };

  const renderVideo = ({ item }: { item: { _id: string; title: string } }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleDelete(item._id, item.title)}
    >
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Delete Videos</Text>
      {videoList.length > 0 ? (
        <FlatList
          data={videoList}
          keyExtractor={(item) => item._id}
          renderItem={renderVideo}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noVideosText}>No videos available.</Text>
      )}
    </View>
  );
};

export default DeleteVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D62B1F",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: width * 0.1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D62B1F",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D62B1F",
  },
  noVideosText: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
    marginTop: 50,
  },
});
