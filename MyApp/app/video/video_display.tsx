import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
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
  
  let parsedData = null;
  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    console.error("Error parsing video data:", error);
    return <Text>Error loading video.</Text>;
  }

  const videoSource = `${apiURLBackend}/videos/video/${parsedData._id}`;
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
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
});