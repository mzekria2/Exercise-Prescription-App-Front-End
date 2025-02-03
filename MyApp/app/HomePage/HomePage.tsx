import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { homePageStyles } from "./HomePage.style";
import { Link } from "expo-router";

const HomePage: React.FC = () => {
  return (
    <View style={homePageStyles.container}>
      {/* Header Section */}
      <View style={homePageStyles.header}>
        <View style={homePageStyles.userInfo}>
          <Text style={homePageStyles.greeting}>Welcome back!</Text>
          <Text style={homePageStyles.subtitle}>
            Continue your hand therapy journey.
          </Text>
        </View>
      </View>

      {/* Cards Section - Improved Layout */}
      <View style={homePageStyles.cardsContainer}>
        <View style={homePageStyles.row}>
          <TouchableOpacity style={homePageStyles.card}>
            <Link href="/video/upload_video">
              <Text style={homePageStyles.cardTitle}>Upload a Video</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={homePageStyles.card}>
            <Link href="/video/video_list">
              <Text style={homePageStyles.cardTitle}>View Videos</Text>
            </Link>
          </TouchableOpacity>
        </View>
        <View style={homePageStyles.row}>
          <TouchableOpacity style={homePageStyles.cardFull}>
            <Link href="/progress/progress_display">
              <Text style={homePageStyles.cardTitle}>View Progress</Text>
            </Link>
          </TouchableOpacity>
        </View>
        {/* 
        <View style={homePageStyles.row}>
          <TouchableOpacity style={homePageStyles.cardFull}>
            <Link href="/video/delete_video">
              <Text style={homePageStyles.cardTitle}>Delete Videos</Text>
            </Link>
          </TouchableOpacity>
        </View> */}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={homePageStyles.navBar}>
        <TouchableOpacity style={homePageStyles.navItem}>
          <Text style={homePageStyles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homePageStyles.navItem}>
          <Text style={homePageStyles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePage;
