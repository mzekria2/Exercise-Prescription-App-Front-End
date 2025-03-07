import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

const UploadVideos = () => {
  const [video, setVideo] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayVidForm, setDisplayVidForm] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false); // Track upload status
  const [frequencyCompletion, setFrequencyCompletion] = useState("1");
  const router = useRouter(); // Use router to navigate
  //https://8c85-2605-8d80-6a3-89f8-ede5-a0d7-df1c-55bf.ngrok-free.app
  const backendUrl = "http://localhost:3000"; // Backend URL

  const base64ToBlob = (base64Data: string, contentType: any) => {
    const byteCharacters = atob(base64Data.split(",")[1]); // Decoding base64
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const uploadVideo = async () => {
    if (!video) {
      alert("No video selected!");
      return;
    }

    try {
      const mimeType = determineMimeType(video); // Custom function to determine MIME type
      const videoBlob = base64ToBlob(video, mimeType);

      const formData = new FormData();
      formData.append("video", videoBlob, `video.${mimeType.split("/")[1]}`); // Ensure correct file name
      formData.append("title", title);
      formData.append("description", description);
      if (frequencyCompletion !== "1") {
        formData.append("frequencyCompletion", frequencyCompletion);
      }

      // Log form data to check contents
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // Upload video
      const uploadResponse = await fetch(`${backendUrl}/videos/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (uploadResponse.status === 401 || uploadResponse.status === 403) {
        console.warn("Token expired. Redirecting to sign-up...");
        router.replace("/WelcomeScreen/Welcomescreen"); // Redirect user to sign-up page
        return;
      }

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(errorText);
      }

      const result = await uploadResponse.json();

      setDisplayVidForm(false);
      setIsUploaded(true); // Set upload status
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");
    }
  };

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
      setVideo(result.assets[0].uri);
      setDisplayVidForm(true);
    }
  };
  function determineMimeType(vid) {
    console.log(vid);
    const matches = vid.match(/^data:(.+);base64,/);
    return matches ? matches[1] : "application/octet-stream"; // Fallback MIME type
  }
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
      setVideo(result.assets[0].uri);
      setDisplayVidForm(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {!displayVidForm && !isUploaded && (
        <>
          <Text style={styles.label}>Choose an option:</Text>
          <TouchableOpacity style={styles.button} onPress={recordVideo}>
            <Text style={styles.buttonText}>Record a Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={pickVideoFromGallery}
          >
            <Text style={styles.buttonText}>Upload from Gallery</Text>
          </TouchableOpacity>
        </>
      )}

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
          <View>
            <Text style={styles.label}>Frequency per Day:</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here...(Leave empty if Frequency = 1)"
              value={frequencyCompletion}
              onChangeText={(value) => setFrequencyCompletion(value)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={uploadVideo}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </>
      ) : isUploaded ? (
        <Text>Video Uploaded. You can go back to view it.</Text>
      ) : null}
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
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
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
  button: {
    backgroundColor: "#D62B1F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
    width: "80%",
  },
  secondaryButton: {
    backgroundColor: "#004D40",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
