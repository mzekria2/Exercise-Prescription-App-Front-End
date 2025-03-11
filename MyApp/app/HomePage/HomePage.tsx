import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { homePageStyles } from "./HomePage.style";
import { Link } from "expo-router";
import { useTranslation } from "../TranslationContext"; // Import translation

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

  return (
    <View style={homePageStyles.container}>
      {/* Header Section */}
      <View style={homePageStyles.header}>
        <View style={homePageStyles.userInfo}>
          <Text style={homePageStyles.greeting}>{translatedText.welcome}</Text>
          <Text style={homePageStyles.subtitle}>{translatedText.subtitle}</Text>
        </View>
      </View>

      {/* Cards Section - Improved Layout */}
      <View style={homePageStyles.cardsContainer}>
        <View style={homePageStyles.row}>
          <TouchableOpacity style={homePageStyles.card}>
            <Link href="/video/upload_video">
              <Text style={homePageStyles.cardTitle}>{translatedText.uploadVideo}</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={homePageStyles.card}>
            <Link href="/video/video_list">
              <Text style={homePageStyles.cardTitle}>{translatedText.viewVideos}</Text>
            </Link>
          </TouchableOpacity>
        </View>
        <View style={homePageStyles.row}>
          <TouchableOpacity style={homePageStyles.cardFull}>
            <Link href="/progress/progress_display">
              <Text style={homePageStyles.cardTitle}>{translatedText.viewProgress}</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={homePageStyles.navBar}>
        <TouchableOpacity style={homePageStyles.navItem}>
          <Text style={homePageStyles.navTextActive}>{translatedText.home}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homePageStyles.navItem}>
          <Text style={homePageStyles.navText}>{translatedText.profile}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePage;
