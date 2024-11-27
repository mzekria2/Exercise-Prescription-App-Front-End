import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width, height } = Dimensions.get("screen");
const Videos = () => {
  const [videoList, setVideoList] = useState<{ [key: string]: any }[]>([]);
  const [uploadVideoBtn, setUploadVideoBtn] = useState(false);
  const apiURLBackend = "http://localhost:3000/videos"; //for web
  //const apiURLBackend = "http://10.0.2.2:3000/videos"; //for android emulator

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
    fetch(`${apiURLBackend}/allVideos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Correct header for JSON response
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setVideoList((videoList) => {
          // Check if the video already exists in the video list
          const newVideos = data.filter(
            (newVideo: Video) =>
              !videoList.some(
                (existingVideo) => existingVideo._id === newVideo._id
              )
          );

          // If there are new videos, concatenate them to the existing list
          return videoList.concat(newVideos);
        });
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <View style={styles.container}>
      <FontAwesome5
        name="canadian-maple-leaf"
        size={40}
        style={styles.leafIcon}
      />
      <View>
        <Text style={styles.videoHeading}>Your Videos</Text>
      </View>
      <View style={styles.videoContainer}>
        <FlatList
          data={videoList}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/video/video_display",
                params: { data: JSON.stringify(item) },
              }}
              style={styles.eachVideo}
            >
              <View style={styles.videoContent}>
                <Text style={styles.videoTitle}>{item.title}</Text>
                <Text style={styles.videoSubText}>{item.description}</Text>
                <View style={styles.playButton}>
                  <Entypo name="controller-play" size={24} color="white" />
                </View>
              </View>
            </Link>
          )}
          keyExtractor={(item) => item._id.toString()}
          numColumns={1}
        />
        <TouchableOpacity>
          <View style={styles.uploadButtonContainer}>
            <AntDesign
              name="pluscircle"
              size={58}
              color="#D62B1F" // Red color
              style={styles.uploadButton}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9e9e9", // Soft gray background to contrast the red
    paddingTop: 50,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    paddingBottom: 10,
    marginBottom: 5,
  },
  videoHeading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#D62B1F", // Hand Therapy Canada red color
  },
  videoContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  eachVideo: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: "#fff", // White background for the video items
    height: height / 5.5,
    width: width * 0.9,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    overflow: "hidden",
    borderWidth: 2, // Add a red border around each video
    borderColor: "#D62B1F", // Hand Therapy Canada red color for the border
    padding: 10, // Added padding for spacing
  },
  videoContent: {
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    flex: 1, // Take up available space in the container
    textAlign: "center", // Ensure text is centered
  },
  videoTitle: {
    color: "#333", // Dark gray for readability
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  videoSubText: {
    color: "#666", // Lighter text for descriptions
    fontSize: 14,
    marginTop: 5,
  },
  leafIcon: {
    marginBottom: 20,
    color: "#D62B1F", // Red color for the leaf icon
  },
  playButton: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D62B1F", // Red play button background
    padding: 10,
    borderRadius: 50, // Circular button
  },
  uploadButtonContainer: {
    position: "static",
    bottom: 10, // Adjust the button's position from the bottom
  },
  uploadButton: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
});
