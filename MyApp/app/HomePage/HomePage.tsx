import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { homePageStyles } from './HomePage.style';

function HomePage() {
  return (
    <View style={homePageStyles.container}>
      {/* Header Section */}
      <View style={homePageStyles.header}>
        <View style={homePageStyles.userInfo}>
          <Text style={homePageStyles.greeting}>Welcome back, Amy</Text>
          <Text style={homePageStyles.subtitle}>Your hand therapy journey continues!</Text>
        </View>
        <View style={homePageStyles.avatar}>
          {/* Placeholder for user avatar
          <Image
            source={require('../assets/images/avatar-placeholder.png')} // Replace with user avatar
            style={homePageStyles.avatarImage}
          /> */}
        </View>
      </View>

      {/* Card Section */}
      <View style={homePageStyles.cardsContainer}>
        {/* Upload Video Card */}
        <TouchableOpacity style={homePageStyles.card}>
          <Text style={homePageStyles.cardTitle}>Upload a Video</Text>
          <Text style={homePageStyles.cardSubtitle}>
            Share your progress and exercises with your therapist.
          </Text>
        </TouchableOpacity>

        {/* Watch Videos Card */}
        <TouchableOpacity style={homePageStyles.card}>
          <Text style={homePageStyles.cardTitle}>Watch Videos</Text>
          <Text style={homePageStyles.cardSubtitle}>
            Review your prescribed exercises.
          </Text>
        </TouchableOpacity>

        {/* Delete Videos Card */}
        <TouchableOpacity style={homePageStyles.card}>
          <Text style={homePageStyles.cardTitle}>Delete Videos</Text>
          <Text style={homePageStyles.cardSubtitle}>
            Manage your uploaded content.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={homePageStyles.navBar}>
        <TouchableOpacity style={homePageStyles.navItem}>
          <Text style={homePageStyles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homePageStyles.navItem}>
          <Text style={homePageStyles.navText}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homePageStyles.navItem}>
          <Text style={homePageStyles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomePage;
