import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";

const UploadVideos = () => {
  const [video, setVideo] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayVidForm, setDisplayVidForm] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false); // Track upload status

  const apiURLBackend = "http://localhost:3000/videos"; // for web
  //const apiURLBackend = "http://10.0.2.2:3000/videos"; //for android emulator

  const uploadVideo = async () => {
    if (!video) {
      alert("No video selected!");
      return;
    }
    try {
      console.log("in try");
      const response = await fetch(video);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("file", blob, "video.mp4");
      formData.append("title", title);
      formData.append("description", description);

      const uploadResponse = await fetch(`${apiURLBackend}/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await uploadResponse.json();
      setDisplayVidForm(false);
      setIsUploaded(true); // Set the upload status to true

      // router.replace("/video/videos");
    } catch (error) {
      console.error("Error uploading video: ", error);
      alert("Failed to upload video. Please try again.");
    }
  };

  const pickVideo = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      setDisplayVidForm(true);
    }
  };

  useEffect(() => {
    pickVideo();
  }, []);

  return (
    <View style={styles.container}>
      {displayVidForm ? (
        <>
          <Text style={styles.label}>Upload a New Video:</Text>
          <View>
            <Text style={styles.label}>Video Title:</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={title}
              onChangeText={(value) => setTitle(value)}
            />
          </View>
          <View>
            <Text style={styles.label}>Video Description:</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={description}
              onChangeText={(value) => setDescription(value)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={uploadVideo}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Redirect using Link after upload
        // <Link href="/video/videos" style={styles.redirectLink}>
        //   <Text style={styles.redirectText}>Return to Your Videos</Text>
        // </Link>
        <Text>Video Uploaded. Return to your videos.</Text>
      )}
    </View>
  );
};

export default UploadVideos;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: "100%",
  },
  uploadButton: {
    backgroundColor: "#D62B1F",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  uploadButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  showFormButton: {
    backgroundColor: "#D62B1F",
    padding: 10,
    borderRadius: 5,
  },
  showFormButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#D62B1F", // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff", // White text color
    fontWeight: "bold",
    fontSize: 16,
  },
  redirectLink: {
    marginTop: 20,
    backgroundColor: "#D62B1F",
    padding: 10,
    borderRadius: 5,
  },
  redirectText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
