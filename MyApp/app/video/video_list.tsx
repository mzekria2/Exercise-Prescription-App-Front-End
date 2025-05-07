import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import { Link, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useKidMode } from "../context/KidModeContext"; // Import Kid Mode
import { LinearGradient } from "expo-linear-gradient"; // Fun background
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./video_list.styles";

const backendUrl = "http://10.0.0.86:3000";
// const backendUrl = "https://exercisebackend.duckdns.org"; // for web

type Video = {
  id: string;
  title: string;
  description?: string;
  uri: string;
};

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { isKidMode } = useKidMode(); // Get Kid Mode state

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem("localVideos");
        setVideos(json ? JSON.parse(json) : []);
      } catch (err) {
        console.error("Error loading local videos:", err);
      }
    })();
  }, []);

  const handleDelete = (video: Video) => {
    setModalVisible(true);
    setSelectedVideo(video);
  };

  const confirmDelete = async () => {
    if (!selectedVideo) return;
    try {
      // remove file from disk
      await FileSystem.deleteAsync(selectedVideo.uri, { idempotent: true });

      // filter out from stored list
      const jsonList = await AsyncStorage.getItem("localVideos");
      const list = jsonList ? JSON.parse(jsonList) : [];
      const updated = list.filter((v: Video) => v.id !== selectedVideo.id);

      // save back
      await AsyncStorage.setItem("localVideos", JSON.stringify(updated));

      // update UI
      setVideos(updated);
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video.");
    } finally {
      setModalVisible(false);
      setSelectedVideo(null);
    }
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

      <Text style={isKidMode ? styles.kidHeading : styles.heading}>
        {isKidMode ? "🎬 Pick a Super Cool Video!" : "Select a Video"}
      </Text>

      <FlatList
        style={styles.videoContainer}
        data={videos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, isKidMode && styles.kidCard]}>
            <TouchableOpacity
              onPress={() => handleDelete(item)}
              style={styles.deleteIcon}
            >
              <AntDesign
                name="close"
                size={20}
                color={isKidMode ? "#ff4757" : "red"}
              />
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

      <Modal animationType="slide" transparent visible={modalVisible}>
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
