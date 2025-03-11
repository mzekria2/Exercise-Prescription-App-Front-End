import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTranslation } from "../TranslationContext";

const { width, height } = Dimensions.get("screen");

const apiURLBackend = "https://tarpon-intent-uniformly.ngrok-free.app"; // Backend URL

const Videos = () => {
  const { language, translate } = useTranslation();
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState({});
  const [translatedCaptions, setTranslatedCaptions] = useState({});

  type Video = {
    _id: string;
    title: string;
    description?: string;
    filename: string;
    path: string;
    size: string;
    format: string;
  };

  const getVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiURLBackend}/videos/allVideos`);
      const text = await response.text();
      console.log("Raw response:", text);
      try {
        const data = JSON.parse(text);
        setVideoList(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    getVideos();
  }, []);

  const fetchCaptions = async (videoFile) => {
    try {
      const formData = new FormData();
      // "video" must match the field name expected by multer in the back-end
      formData.append("video", videoFile);
  
      const response = await fetch(`${apiURLBackend}/api/captions/generate-captions`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      // Assuming the returned JSON contains a "captions" property
      setCaptions((prev) => ({ ...prev, [videoFile.name]: data.captions }));
  
      // After generating captions, translate them if needed:
      const translatedResponse = await fetch(`${apiURLBackend}/api/translation/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: data.captions, targetLang: language }),
      });
      const translatedData = await translatedResponse.json();
      setTranslatedCaptions((prev) => ({ ...prev, [videoFile.name]: translatedData.translatedText }));
    } catch (error) {
      console.error("Error fetching captions:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.videoHeading}>Your Videos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#D62B1F" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={videoList}
          renderItem={({ item }) => (
            <View style={styles.eachVideo}>
              <View style={styles.videoContent}>
                <Text style={styles.videoTitle}>{item.title}</Text>
                <Text style={styles.videoSubText}>{item.description}</Text>

                {/* 🆕 Fetch Captions Button */}
                <TouchableOpacity style={styles.captionButton} onPress={() => fetchCaptions(item._id)}>
                  <Text style={styles.captionButtonText}>🎤 Generate Captions</Text>
                </TouchableOpacity>

                {/* 🆕 Display Captions */}
                {captions[item._id] && (
                  <View style={styles.captionContainer}>
                    <Text style={styles.captionText}>Captions: {captions[item._id]}</Text>
                    {translatedCaptions[item._id] && (
                      <Text style={styles.captionText}>
                        Translated: {translatedCaptions[item._id]}
                      </Text>
                    )}
                  </View>
                )}

                <Link
                  href={{
                    pathname: "/video/video_display",
                    params: { data: JSON.stringify(item) },
                  }}
                  style={styles.playButton}
                >
                  <Entypo name="controller-play" size={24} color="white" />
                </Link>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id.toString()}
          numColumns={1}
        />
      )}
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9e9e9",
    paddingTop: 50,
    alignItems: "center",
  },
  videoHeading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#D62B1F",
  },
  eachVideo: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: "#fff",
    height: height / 5.5,
    width: width * 0.9,
    borderRadius: 12,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#D62B1F",
    padding: 10,
  },
  videoContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  videoSubText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  playButton: {
    marginTop: 10,
    backgroundColor: "#D62B1F",
    padding: 10,
    borderRadius: 50,
  },
  captionButton: {
    marginTop: 10,
    backgroundColor: "#FF6F00",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
  },
  captionButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
  captionContainer: {
    marginTop: 10,
    backgroundColor: "#FAFAFA",
    padding: 8,
    borderRadius: 8,
    width: "90%",
    textAlign: "center",
  },
  captionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});
