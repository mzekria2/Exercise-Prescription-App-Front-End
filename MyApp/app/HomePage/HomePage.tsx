import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated, Alert } from "react-native";
import { homePageStyles } from "./HomePage.style";
import { Link, useRouter } from "expo-router";
import { useKidMode } from "../context/KidModeContext";
import { LinearGradient } from "expo-linear-gradient";
import ConfettiCannon from "react-native-confetti-cannon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "../TranslationContext";

// Animated kid mode title component
const WigglyText = ({ text }: { text: string }) => {
  const wiggle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wiggle, {
          toValue: 10,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(wiggle, {
          toValue: -10,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(wiggle, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [wiggle]);

  return (
    <Animated.Text
      style={[
        homePageStyles.kidModeTitle,
        {
          transform: [
            {
              rotate: wiggle.interpolate({
                inputRange: [-10, 10],
                outputRange: ["-5deg", "5deg"],
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

const HomePage: React.FC = () => {
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
      await AsyncStorage.removeItem("token"); // Remove token from storage
      window.alert("You have successfuly logged Out");
      router.push("/WelcomeScreen/Welcomescreen"); // Redirect to login screen
    } catch (error) {
      console.error("Error logging out:", error);
      window.alert("Error: Something went wrong. Try again.");
    }
  };

  return (
    <LinearGradient
      colors={
        isKidMode
          ? ["#ff6b6b", "#ffa502", "#f9ca24", "#7bed9f", "#70a1ff", "#d980fa"]
          : ["#ffffff", "#ffffff"]
      }
      style={{ flex: 1 }}
    >
      <View style={homePageStyles.container}>
        {/* Header Section */}
        <View style={homePageStyles.header}>
          <View style={homePageStyles.userInfo}>
            {isKidMode ? (
              <WigglyText text="🎈 Welcome to the FUN ZONE! 🎉" />
            ) : (
              <Text style={homePageStyles.greeting}>
                {translatedText.welcome}
              </Text>
            )}
            {isKidMode ? (
              <Text style={homePageStyles.subtitle}>
                Get ready for an adventure! 🚀
              </Text>
            ) : (
              <Text style={homePageStyles.subtitle}>
                {translatedText.subtitle}
              </Text>
            )}
          </View>
        </View>

        {/* Cards Section */}
        <View style={homePageStyles.cardsContainer}>
          <View style={homePageStyles.row}>
            <TouchableOpacity
              style={[
                homePageStyles.card,
                isKidMode && {
                  backgroundColor: "#ff4757",
                  borderColor: "#ff7f50",
                  borderWidth: 5,
                  borderRadius: 20,
                },
              ]}
            >
              <Link href="/video/upload_video">
                <Text
                  style={[
                    homePageStyles.cardTitle,
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
                homePageStyles.card,
                isKidMode && {
                  backgroundColor: "#1e90ff",
                  borderColor: "#00a8ff",
                  borderWidth: 5,
                  borderRadius: 20,
                },
              ]}
            >
              <Link href="/video/video_list">
                <Text
                  style={[
                    homePageStyles.cardTitle,
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

          <View style={homePageStyles.row}>
            <TouchableOpacity
              style={[
                homePageStyles.cardFull,
                isKidMode && {
                  backgroundColor: "#ffcc00",
                  borderColor: "#ffde59",
                  borderWidth: 5,
                  borderRadius: 20,
                },
              ]}
            >
              <Link href="/progress/progress_display">
                <Text
                  style={[
                    homePageStyles.cardTitle,
                    { color: isKidMode ? "#fff" : "#000" },
                  ]}
                >
                  {isKidMode
                    ? "🏆 See Your Crazy Achievements!"
                    : translatedText.viewProgress}
                </Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>

        {isKidMode && (
          <ConfettiCannon count={50} origin={{ x: 200, y: -10 }} fadeOut />
        )}

        {/* Kid Mode Toggle Button */}
        <TouchableOpacity
          style={{
            backgroundColor: isKidMode ? "#ffcc00" : "#007BFF",
            padding: 15,
            borderRadius: 50,
            alignSelf: "center",
            marginBottom: 20,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
            transform: [{ scale: isKidMode ? 1.1 : 1 }],
          }}
          onPress={toggleKidMode}
        >
          <Text
            style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
          >
            {isKidMode ? "🔙 Exit Fun Mode" : "🎉 Enable Fun Mode"}
          </Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={{
            backgroundColor: isKidMode ? "#ff4444" : "#FF0000",
            padding: 15,
            borderRadius: 50,
            alignSelf: "center",
            marginBottom: 20,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
            transform: [{ scale: isKidMode ? 1.1 : 1 }],
          }}
          onPress={handleLogout}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {isKidMode ? "🚪 Bye Bye!" : "🔒 Sign Out"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomePage;
