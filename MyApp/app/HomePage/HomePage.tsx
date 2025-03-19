import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated, Dimensions, StyleSheet } from "react-native";
import { useRouter, Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import ConfettiCannon from "react-native-confetti-cannon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "../TranslationContext";
import { useKidMode } from "../context/KidModeContext";
import ProgressChart from "../progress/progress_display";
import { normalHomePageStyles } from "./HomePage.style";
import { kidModeHomePageStyles } from "./HomePage.style";

const screenWidth = Dimensions.get("window").width;

// Animated Kid Mode Title Component
const WigglyText = ({ text }) => {
  const wiggle = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wiggle, {
          toValue: 5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(wiggle, {
          toValue: -5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(wiggle, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [wiggle]);
  return (
    <Animated.Text
      style={[
        kidModeHomePageStyles.kidModeTitle,
        {
          transform: [
            {
              rotate: wiggle.interpolate({
                inputRange: [-5, 5],
                outputRange: ["-3deg", "3deg"],
              }),
            },
          ],
        },
      ]}
    >
      {text}
    </Animated.Text>
  );
};

const HomePage = () => {
  const { translate } = useTranslation();
  const [translatedText, setTranslatedText] = useState({
    welcome: "Welcome back!",
    subtitle: "Continue your hand therapy journey.",
    uploadVideo: "Upload a Video",
    viewVideos: "View Videos",
    viewProgress: "View Progress",
    home: "Home",
    profile: "Profile",
  });

  useEffect(() => {
    const fetchTranslations = async () => {
      setTranslatedText({
        welcome: await translate("Welcome back!"),
        subtitle: await translate("Continue your hand therapy journey."),
        uploadVideo: await translate("Upload a Video"),
        viewVideos: await translate("View Videos"),
        viewProgress: await translate("View Progress"),
        home: await translate("Home"),
        profile: await translate("Profile"),
      });
    };
    fetchTranslations();
  }, [translate]);

  const { isKidMode, toggleKidMode } = useKidMode();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      alert("You have successfully logged out");
      router.push("/WelcomeScreen/Welcomescreen");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error: Something went wrong. Try again.");
    }
  };

  // Choose the appropriate styles object based on Kid Mode flag.
  const styles = isKidMode ? kidModeHomePageStyles : normalHomePageStyles;

  return (
    <LinearGradient
      colors={
        isKidMode
          ? ["#ff6b6b", "#ffa502", "#f9ca24", "#7bed9f", "#70a1ff", "#d980fa"]
          : ["#ffffff", "#ffffff"]
      }
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            {isKidMode ? (
              <WigglyText text="🎈 Welcome to the FUN ZONE! 🎉" />
            ) : (
              <Text style={styles.greeting}>{translatedText.welcome}</Text>
            )}
            {isKidMode ? (
              <Text style={styles.subtitle}>Get ready for an adventure! 🚀</Text>
            ) : (
              <Text style={styles.subtitle}>{translatedText.subtitle}</Text>
            )}
          </View>
        </View>

        {/* Cards Section */}
        <View style={styles.cardsContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.card,
                isKidMode && {
                  backgroundColor: "#f8bbd0", // pastel pink
                  borderColor: "#f48fb1",
                  borderWidth: screenWidth * 0.001,
                  borderRadius: 20,
                },
              ]}
              onPress={() => router.push("/video/upload_video")}
            >
              <Text
                style={[
                  styles.cardTitle,
                  { color: isKidMode ? "#fff" : "#000" },
                ]}
              >
                {isKidMode
                  ? "🎥 Upload a Super Cool Video!"
                  : translatedText.uploadVideo}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.card,
                isKidMode && {
                  backgroundColor: "#aed6f1", // pastel blue
                  borderColor: "#85c1e9",
                  borderWidth: screenWidth * 0.001,
                  borderRadius: 20,
                },
              ]}
              onPress={() => router.push("/video/video_list")}
            >
              <Text
                style={[
                  styles.cardTitle,
                  { color: isKidMode ? "#fff" : "#000" },
                ]}
              >
                {isKidMode
                  ? "📺 Watch Amazing Videos!"
                  : translatedText.viewVideos}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.cardFull,
                isKidMode && {
                  backgroundColor: "#dcedc8", // pastel green
                  borderColor: "#c5e1a5",
                  borderWidth: screenWidth * 0.001,
                  borderRadius: 20,
                  marginBottom: 5,
                },
              ]}
              onPress={() => router.push("/progress/progress_display")}
            >
              <Text
                style={[
                  styles.cardTitle,
                  { color: isKidMode ? "#fff" : "#000" },
                ]}
              >
                {isKidMode
                  ? "🏆 See Your Amazing Achievements!"
                  : translatedText.viewProgress}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mini Progress Chart for current week */}
        <View style={styles.progressContainer}>
          <ProgressChart isMini />
        </View>

        {isKidMode && <ConfettiCannon count={100} origin={{ x: 200, y: -10 }} fadeOut />}

        {/* Kid Mode Toggle Button */}
        <TouchableOpacity style={styles.toggleButton} onPress={toggleKidMode}>
          <Text style={styles.toggleButtonText}>
            {isKidMode ? "🔙 Exit Fun Mode" : "🎉 Enable Fun Mode"}
          </Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>
            {isKidMode ? "🚪 Bye Bye!" : "🔒 Sign Out"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomePage;
