import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { homePageStyles } from "./HomePage.style";
import { Link } from "expo-router";
import { useKidMode } from "../context/KidModeContext";
import { LinearGradient } from "expo-linear-gradient"; 
import ConfettiCannon from "react-native-confetti-cannon"; 

const WigglyText = ({ text }) => {
  const wiggle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wiggle, { toValue: 10, duration: 200, useNativeDriver: true }),
        Animated.timing(wiggle, { toValue: -10, duration: 200, useNativeDriver: true }),
        Animated.timing(wiggle, { toValue: 0, duration: 200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return <Animated.Text style={[homePageStyles.kidModeTitle, { transform: [{ rotate: wiggle.interpolate({ inputRange: [-10, 10], outputRange: ["-5deg", "5deg"] }) }] }]}>{text}</Animated.Text>;
};

const HomePage: React.FC = () => {
  const { isKidMode, toggleKidMode } = useKidMode();

  return (
    <LinearGradient
      colors={isKidMode ? ["#ff6b6b", "#ffa502", "#f9ca24", "#7bed9f", "#70a1ff", "#d980fa"] : ["#ffffff", "#ffffff"]}
      style={{ flex: 1 }}
    >
      <View style={homePageStyles.container}>
        <View style={homePageStyles.header}>
          <View style={homePageStyles.userInfo}>
            {isKidMode ? <WigglyText text="🎈 Welcome to the FUN ZONE! 🎉" /> : <Text style={homePageStyles.greeting}>Welcome back!</Text>}
            <Text style={homePageStyles.subtitle}>{isKidMode ? "Get ready for an adventure! 🚀" : "Continue your journey."}</Text>
          </View>
        </View>


        <View style={homePageStyles.cardsContainer}>
          <View style={homePageStyles.row}>
            <TouchableOpacity
              style={[
                homePageStyles.card,
                isKidMode && { backgroundColor: "#ff4757", borderColor: "#ff7f50", borderWidth: 5, borderRadius: 20 },
              ]}
            >
              <Link href="/video/upload_video">
                <Text style={[homePageStyles.cardTitle, { color: isKidMode ? "#fff" : "#000" }]}>
                  {isKidMode ? "🎥 Upload a Super Cool Video!" : "Upload a Video"}
                </Text>
              </Link>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                homePageStyles.card,
                isKidMode && { backgroundColor: "#1e90ff", borderColor: "#00a8ff", borderWidth: 5, borderRadius: 20 },
              ]}
            >
              <Link href="/video/video_list">
                <Text style={[homePageStyles.cardTitle, { color: isKidMode ? "#fff" : "#000" }]}>
                  {isKidMode ? "📺 Watch Amazing Videos!" : "View Videos"}
                </Text>
              </Link>
            </TouchableOpacity>
          </View>

          <View style={homePageStyles.row}>
            <TouchableOpacity
              style={[
                homePageStyles.cardFull,
                isKidMode && { backgroundColor: "#ffcc00", borderColor: "#ffde59", borderWidth: 5, borderRadius: 20 },
              ]}
            >
              <Link href="/progress/progress_display">
                <Text style={[homePageStyles.cardTitle, { color: isKidMode ? "#fff" : "#000" }]}>
                  {isKidMode ? "🏆 See Your Crazy Achievements!" : "View Progress"}
                </Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>

        
        {isKidMode && <ConfettiCannon count={50} origin={{ x: 200, y: -10 }} fadeOut />}

      
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
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {isKidMode ? "🔙 Exit Fun Mode" : "🎉 Enable Fun Mode"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomePage;
