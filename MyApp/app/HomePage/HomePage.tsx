import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { homePageStyles } from './HomePage.style';

const HomePage: React.FC = () => {
  return (
    <View style={homePageStyles.container}>
      {/* Header Section */}
      <View style={homePageStyles.header}>
        <View style={homePageStyles.userInfo}>
          <Text style={homePageStyles.greeting}>Welcome back!</Text>
          <Text style={homePageStyles.subtitle}>Continue your hand therapy journey.</Text>
        </View>
      </View>

      {/* Feature Cards */}
      <View style={homePageStyles.cardsContainer}>
        <TouchableOpacity style={homePageStyles.card}>
          <Text style={homePageStyles.cardTitle}>Upload a Video</Text>
          <Text style={homePageStyles.cardSubtitle}>
            Share progress videos with your therapist.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={homePageStyles.card}>
          <Text style={homePageStyles.cardTitle}>Watch Videos</Text>
          <Text style={homePageStyles.cardSubtitle}>
            Review prescribed exercises.
          </Text>
        </TouchableOpacity>

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
          <Text style={homePageStyles.navTextActive}>Home</Text>
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
};

export default HomePage;
