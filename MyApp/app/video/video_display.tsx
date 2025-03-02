import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";

const apiURLBackend = "http://localhost:3000"; // Adjust this if running on a device

const { width, height } = Dimensions.get("screen");

const Videos = () => {
  const { data } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [subtitleUrl, setSubtitleUrl] = useState(null);
  const [showSubtitles, setShowSubtitles] = useState(false);

  let parsedData = null;

  try {
    if (typeof data === "string") {
      parsedData = JSON.parse(data);
    } else if (Array.isArray(data)) {
      parsedData = JSON.parse(data[0]);
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

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`${apiURLBackend}/videos/video/${parsedData._id}`);
        const data = await response.json();
        setVideoUrl(data.videoPath);
        setSubtitleUrl(data.subtitlePath);
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [parsedData._id]);

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    const subscription = player.addListener("statusChange", ({ status }) => {
      console.log("Player status changed:", status);
    });

    return () => subscription.remove();
  }, [player]);

  if (loading) {
    return (
      <View style={styles.videoContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.videoContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Video Player */}
      <View style={styles.videoView}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          selectedTextTrack={{
            type: showSubtitles ? "index" : "disabled",
            value: 0,
          }}
          textTracks={
            subtitleUrl
              ? [
                  {
                    title: "English Subtitles",
                    uri: subtitleUrl,
                    language: "en",
                    type: "text/vtt",
                  },
                ]
              : []
          }
        />
      </View>

      {/* Video Title */}
      <Text style={styles.videoTitle}>{parsedData.title}</Text>

      {/* Subtitle Toggle Button */}
      {subtitleUrl && (
        <TouchableOpacity
          style={styles.subtitleButton}
          onPress={() => setShowSubtitles(!showSubtitles)}
        >
          <Text style={styles.subtitleText}>
            {showSubtitles ? "Hide Subtitles" : "Show Subtitles"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
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
  videoView: {
    height: height / 2.5,
    width: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  videoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  subtitleButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    alignSelf: "center",
  },
  subtitleText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
