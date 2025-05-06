import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useKidMode } from "../context/KidModeContext";
import { LinearGradient } from "expo-linear-gradient";
import {
  normalUploadVideoStyles,
  kidModeUploadVideoStyles,
} from "./upload_video.styles";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const UploadVideos = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequencyCompletion, setFrequencyCompletion] = useState("1");
  const [displayVidForm, setDisplayVidForm] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const router = useRouter();
  const { isKidMode } = useKidMode();
  const backendUrl = "http://10.0.0.86:3000";
  // const backendUrl = "https://exercisebackend.duckdns.org";

  // Animate Title
  const [animatedTitle, setAnimatedTitle] = useState("");
  const fullTitle = "Upload Your Videos!";
  useEffect(() => {
    setAnimatedTitle("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setAnimatedTitle(fullTitle.slice(0, i));
      if (i >= fullTitle.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Handle picking from gallery
  const pickVideoFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    if (!result.canceled) {
      console.log("Video URI:", result.assets[0].uri);
      setVideoUri(result.assets[0].uri);
      console.log("Video URI:", result.assets[0].uri);
      setDisplayVidForm(true);
    }
  };

  // Handle recording a video
  const recordVideo = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
      setDisplayVidForm(true);
    }
  };

  // Upload the video from its local URI
  // const uploadVideo = async () => {
  //   if (!videoUri) {
  //     alert("No video selected!");
  //     return;
  //   }
  //   try {
  //     const formData = new FormData();
  //     console.log("errpr?");
  //     formData.append("video", {
  //       uri: videoUri,
  //       type: "video/mp4", // Or "video/*" if uncertain
  //       name: "upload.mp4",
  //     });
  //     formData.append("title", title);
  //     formData.append("description", description);
  //     // if (frequencyCompletion !== "1") {
  //     //   formData.append("frequencyCompletion", frequencyCompletion);
  //     // }

  //     // const response = await fetch(`${backendUrl}/videos/upload`, {
  //     //   method: "POST",
  //     //   body: formData,
  //     //   credentials: "include",
  //     // });
  //     // if (response.status === 401 || response.status === 403) {
  //     //   router.replace("/WelcomeScreen/Welcomescreen");
  //     //   return;
  //     // }
  //     // if (!response.ok) {
  //     //   const errorText = await response.text();
  //     //   throw new Error(errorText);
  //     // }
  //     // await response.json();

  //     setDisplayVidForm(false);
  //     setIsUploaded(true);
  //   } catch (error) {
  //     console.error("Error uploading video:", error);
  //     alert("Failed to upload video. Please try again.");
  //   }
  // };

  const saveLocally = async () => {
    try {
      if (!videoUri) throw new Error("No video selected");

      const filename = videoUri.split("/").pop()!;
      const ext = filename.split(".").pop() || "mp4";
      const videosDir = FileSystem.documentDirectory + "videos/";
      await FileSystem.makeDirectoryAsync(videosDir, { intermediates: true });

      const destUri = `${videosDir}${Date.now()}.${ext}`;
      await FileSystem.copyAsync({ from: videoUri, to: destUri });

      const entry = {
        id: Date.now().toString(),
        title,
        description,
        uri: destUri,
      };

      const jsonList = await AsyncStorage.getItem("localVideos");
      const list = jsonList ? JSON.parse(jsonList) : [];
      await AsyncStorage.setItem(
        "localVideos",
        JSON.stringify([entry, ...list])
      );

      setIsUploaded(true);
    } catch (err) {
      console.error("Error saving video locally:", err);
      alert((err as Error).message || "Failed to save video locally");
    }
  };

  const styles = isKidMode ? kidModeUploadVideoStyles : normalUploadVideoStyles;

  return (
    <LinearGradient
      colors={
        isKidMode
          ? ["#ff6b6b", "#ffa502", "#f9ca24", "#7bed9f"]
          : ["#ffffff", "#ffffff"]
      }
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {!displayVidForm && !isUploaded && (
        <>
          <Text style={styles.sectionTitle}>{animatedTitle}</Text>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionCard} onPress={recordVideo}>
              <Text style={styles.actionCardText}>
                {isKidMode ? "🎥 Record a Super Cool Video!" : "Record a Video"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={pickVideoFromGallery}
            >
              <Text style={styles.actionCardText}>
                {isKidMode ? "📺 Upload from Gallery" : "Upload from Gallery"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {displayVidForm && !isUploaded && (
        <>
          <Text style={styles.sectionTitle}>
            {isKidMode
              ? "🎨 Add Some Magic to Your Video!"
              : "Upload a New Video:"}
          </Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Video Title:</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={isKidMode ? "#7E57C2" : "#3949AB"}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Video Description:</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={description}
              onChangeText={setDescription}
              placeholderTextColor={isKidMode ? "#7E57C2" : "#3949AB"}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={saveLocally}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </>
      )}

      {isUploaded && (
        <Text style={styles.sectionTitle}>
          {isKidMode
            ? "🎊 Your Video is Live! 🎬"
            : "Video Uploaded. You can go back to view it."}
        </Text>
      )}
    </LinearGradient>
  );
};

export default UploadVideos;
