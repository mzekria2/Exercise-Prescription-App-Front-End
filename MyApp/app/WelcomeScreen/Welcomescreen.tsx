import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { welcomeScreenStyles } from './Welcomescreen.styles';
import { Link } from 'expo-router';

const WelcomeScreen = () => {
  return (
    <View style={welcomeScreenStyles.welcomeContainer}>
      <Text style={welcomeScreenStyles.welcomeTitle}>HTC APP</Text>
      <Text style={welcomeScreenStyles.indexTitle}>
        Welcome to the Exercise Prescription App!
      </Text>

      <TextInput
        style={welcomeScreenStyles.welcomeInput}
        placeholder="Username"
        placeholderTextColor="#888"
      />
      <TextInput
        style={welcomeScreenStyles.welcomeInput}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <Text style={welcomeScreenStyles.welcomeForgotPassword}>Forgot Password?</Text>

      <TouchableOpacity style={welcomeScreenStyles.welcomeLoginButton}>
        <Text style={welcomeScreenStyles.welcomeButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={welcomeScreenStyles.welcomeSignUpButton}>
        <Link href="/Sign_Up/Sign_up">
          <Text style={welcomeScreenStyles.welcomeSignUpText}>Sign-Up</Text>
        </Link>
      </TouchableOpacity>

      <Text style={welcomeScreenStyles.indexSubtitle}>
        Helping you recover with personalized exercise routines.
      </Text>
    </View>
  );
};

export default WelcomeScreen;
