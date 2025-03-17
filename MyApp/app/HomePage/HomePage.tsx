import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Alert,
  Image,
} from "react-native";
import { homePageStyles } from "./HomePage.style";
import { Link, useRouter } from "expo-router";
import { useKidMode } from "../context/KidModeContext";
import { LinearGradient } from "expo-linear-gradient";
import ConfettiCannon from "react-native-confetti-cannon";
import AsyncStorage from "@react-native-async-storage/async-storage";
const robotImage = require("../../assets/images/Robot.png");

const WigglyText = ({ text }) => {
  const wiggle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wiggle, {
          toValue: 5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(wiggle, {
          toValue: -5,
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
  }, []);

  return (
    <Animated.Text
      style={[
        homePageStyles.kidModeTitle,
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

const HomePage: React.FC = () => {
  const { isKidMode, toggleKidMode } = useKidMode();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Remove token from storage
      Alert.alert("You have successfuly logged Out");
      router.push("/WelcomeScreen/Welcomescreen"); // Redirect to login screen
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error: Something went wrong. Try again.");
    }
  };

  return (
    <LinearGradient
      colors={
        isKidMode
          ? ["#B0E0E6", "#FFD700", "#98FB98"] // Soft pastel colors
          : ["#ffffff", "#ffffff"]
      }
      style={{ flex: 1 }}
    >
      <View style={homePageStyles.container}>
        <View style={homePageStyles.header}>
          <View style={homePageStyles.userInfo}>
            {isKidMode ? (
              <View style={homePageStyles.kidModeHeader}>
                <Animated.View>
                  <WigglyText text="🎈 Welcome to the FUN ZONE!" />
                </Animated.View>
                <Image
                  source={robotImage}
                  style={{ width: 120, height: 120, resizeMode: "contain" }}
                />
              </View>
            ) : (
              <Text style={homePageStyles.greeting}>Welcome back!</Text>
            )}
            <Text
              style={
                isKidMode ? homePageStyles.kidSubtitle : homePageStyles.subtitle
              }
            >
              {isKidMode
                ? "Get ready for an adventure! 🚀"
                : "Continue your journey."}
            </Text>
          </View>
        </View>

        <View style={homePageStyles.cardsContainer}>
          <View style={homePageStyles.row}>
            <Link
              href="/video/upload_video"
              style={[
                homePageStyles.card,
                isKidMode && {
                  backgroundColor: "#f0f8ff",
                  borderColor: "#8a2be2",
                  borderWidth: 3,
                  borderRadius: 15,
                },
              ]}
              asChild
            >
              <TouchableOpacity>
                <Text
                  style={[
                    homePageStyles.cardTitle,
                    { color: isKidMode ? "#4b0082" : "#000" }, // Softer text color
                  ]}
                >
                  {isKidMode
                    ? "🎥 Upload Your Amazing Video!"
                    : "Upload a Video"}
                </Text>
              </TouchableOpacity>
            </Link>
            <Link
              href="/video/video_list"
              style={[
                homePageStyles.card,
                isKidMode && {
                  backgroundColor: "#ffebcd",
                  borderColor: "#ff6347",
                  borderWidth: 3,
                  borderRadius: 15,
                },
              ]}
              asChild
            >
              <TouchableOpacity>
                <Text
                  style={[
                    homePageStyles.cardTitle,
                    { color: isKidMode ? "#ff4500" : "#000" },
                  ]}
                >
                  {isKidMode ? "📺 Watch Amazing Videos!" : "View Videos"}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={homePageStyles.row}>
            <Link
              href="/progress/progress_display"
              style={[
                homePageStyles.card,
                isKidMode && {
                  backgroundColor: "#ffebcd", // Softer pastel yellow
                  borderColor: "#ff4500",
                  borderWidth: 3,
                },
              ]}
            >
              <TouchableOpacity
                style={{
                  width: `100%`,
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Text
                  style={[
                    homePageStyles.cardTitle,
                    { color: isKidMode ? "#ff4500" : "#000" },
                  ]}
                >
                  {isKidMode
                    ? "🏆 See Your Cool Achievements!"
                    : "View Progress"}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {isKidMode && (
          <ConfettiCannon count={50} origin={{ x: 200, y: -10 }} fadeOut />
        )}

        <TouchableOpacity
          style={{
            backgroundColor: isKidMode ? "#007BFF" : "#add8e6",
            padding: 15,
            borderRadius: 50,
            alignSelf: "center",
            shadowColor: "#000",
            marginTop: 50,
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
            transform: [{ scale: isKidMode ? 1.05 : 1 }],
          }}
          onPress={toggleKidMode}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {isKidMode ? "🔙 Exit Fun Mode" : "🎉 Enable Fun Mode"}
          </Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={{
            backgroundColor: isKidMode ? "#ffcc00" : "#FF0000", // Softer red
            padding: 15,
            borderRadius: 50,
            alignSelf: "center",
            marginBottom: 20,
            shadowColor: "#000",
            marginTop: 20,
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
            transform: [{ scale: isKidMode ? 1.1 : 1 }],
          }}
          onPress={handleLogout}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {isKidMode ? "👋🏼 Bye!" : "🔒 Sign Out"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomePage;
