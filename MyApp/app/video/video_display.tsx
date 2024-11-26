import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Video } from "expo-av";

// const apiURLBackend = "http://localhost:3000/videos"; //for web
const apiURLBackend = "http://10.0.2.2:3000/videos"; //for android emulator
const { width, height } = Dimensions.get("screen");

const Videos = () => {
  const { data } = useLocalSearchParams();
  // Check if data is a string or an array of strings
  let parsedData = null;

  if (typeof data === "string") {
    parsedData = JSON.parse(data); // Parse the string if it's a valid JSON string
  } else if (Array.isArray(data)) {
    parsedData = JSON.parse(data[0]); // If data is an array, we take the first item
  }

  return (
    <View style={styles.videoContainer}>
      <View style={styles.videoView}>
        <Video
          source={{ uri: `${apiURLBackend}/video/${parsedData._id}` }}
          useNativeControls
          style={styles.video}
        />
      </View>
      <Text style={styles.videoTitle}>{parsedData.title}</Text>
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  videoTitle: {
    fontSize: 30,
    height: 40,
    width: 100,
    textAlign: "center",
  },
  videoContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  videoView: {
    height: height / 2,
    width: "100%",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
