import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import ConfettiCannon from "react-native-confetti-cannon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "../TranslationContext";
import { useKidMode } from "../context/KidModeContext";
import ProgressChart from "../progress/progress_display";
import { normalHomePageStyles, kidModeHomePageStyles } from "./HomePage.style";

// const backendUrl = "https://exercisebackend.duckdns.org";
const backendUrl = "http://10.0.0.86:3000";
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
    welcome: "Your Dashboard",
    subtitle: "Welcome Back!",
    uploadVideo: "Upload a Video",
    viewVideos: "View Videos",
    viewProgress: "View Progress",
    home: "Home",
    profile: "Profile",
  });
  const [userId, setUserId] = useState(null);

  // Fetch translated text
  useEffect(() => {
    const fetchTranslations = async () => {
      setTranslatedText({
        welcome: await translate("Your Dashboard"),
        subtitle: await translate("Welcome Back!"),
        uploadVideo: await translate("Upload a Video"),
        viewVideos: await translate("View Videos"),
        viewProgress: await translate("View Progress"),
        home: await translate("Home"),
        profile: await translate("Profile"),
      });
    };
    fetchTranslations();
  }, [translate]);

  // Fetch user profile data (for example, to get the user ID)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/auth/profile`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserId(data._id);
          console.log("Fetched User ID:", data._id);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

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

  // Choose appropriate style based on mode
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
              <Text style={styles.subtitle}>
                Get ready for an adventure! 🚀
              </Text>
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
                  backgroundColor: "#f8bbd0", // pastel pink for Kid Mode
                  borderColor: "#f48fb1",
                  borderWidth: 1,
                  borderRadius: 20,
                },
              ]}
              onPress={() => router.push("/video/upload_video")}
            >
              <Link href="/video/upload_video">
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
              </Link>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.card,
                isKidMode && {
                  backgroundColor: "#aed6f1", // pastel blue for Kid Mode
                  borderColor: "#85c1e9",
                  borderWidth: 1,
                  borderRadius: 20,
                },
              ]}
              onPress={() => router.push("/video/video_list")}
            >
              <Link href="/video/video_list">
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
              </Link>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.cardFull,
                isKidMode && {
                  backgroundColor: "#dcedc8", // pastel green for Kid Mode
                  borderColor: "#c5e1a5",
                  borderWidth: 1,
                  borderRadius: 20,
                  marginBottom: 5,
                },
              ]}
              onPress={() => router.push("/progress/progress_display")}
            >
              <Link href="/progress/progress_display">
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
              </Link>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mini Progress Chart */}
        <View style={styles.progressContainer}>
          <ProgressChart isMini />
        </View>

        {/* Notifications Button */}
        <TouchableOpacity
          style={styles.notificationsButton}
          onPress={() => router.push("/Notifs/notifications")}
        >
          <Text style={styles.notificationsButtonText}>Notifications</Text>
        </TouchableOpacity>

        {isKidMode && (
          <ConfettiCannon count={100} origin={{ x: 200, y: -10 }} fadeOut />
        )}

        {/* Horizontal container for Kid Mode toggle and Logout buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <TouchableOpacity style={styles.toggleButton} onPress={toggleKidMode}>
            <Text style={styles.toggleButtonText}>
              {isKidMode ? "🔙 Exit Fun Mode" : "🎉 Enable Fun Mode"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>
              {isKidMode ? "🚪 Bye Bye!" : "🔒 Sign Out"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default HomePage;
