import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter, Link } from "expo-router";

const Videos = () => {
  const [videoList, setVideoList] = useState<{ [key: string]: any }[]>([]);
  const [clickedVideo, setClickedVideo] = useState({});
  // const apiURLBackend = "http://localhost:3000/videos"; //for web
  const apiURLBackend = "http://10.0.2.2:3000/videos"; //for android emulator

  //   const data = [
  //     { _id: 0, title: "title1", description: "mm", path: "im" },
  //     { _id: 1, title: "title2", description: "mmm", path: "imm" },
  //     { _id: 2, title: "title3", description: "mmmm", path: "immm" },
  //     { _id: 3, title: "title4", description: "mmmmm", path: "immmm" },
  //   ];
  // const onClickedVideo = (item: object) => {
  //   router.push({
  //     pathname: "./video_display",
  //     params: { video: JSON.stringify(item) },
  //   });
  // };
  const getVideos = async () => {
    fetch(`${apiURLBackend}/allVideos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Correct header for JSON response
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setVideoList((videoList) => videoList.concat(data));
        console.log(videoList), "videolist";
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
      <View>
        <Text style={styles.heading}>Your Videos</Text>
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
            >
              <View style={styles.eachVideo}>
                <Text style={styles.videoTitle}>{item.title}</Text>
              </View>
            </Link>
          )}
          keyExtractor={(item) => item._id.toString()}
          numColumns={1}
        />
      </View>
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    height: "100%",
    width: "100%",
  },
  videoContainer: {
    backgroundColor: "lightblue",
    margin: 20,
    alignItems: "center",
    height: "100%",
  },
  videoTitle: {
    color: "whitesmoke",
    textAlign: "center",
    marginTop: 30,
  },
  eachVideo: {
    padding: 20,
    margin: 20,
    backgroundColor: "black",
    height: 120,
    width: 220,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.7,
    textAlign: "center",
    marginTop: 10,
  },
});
