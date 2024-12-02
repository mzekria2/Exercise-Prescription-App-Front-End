import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { welcomeScreenStyles } from './Welcomescreen.styles';
import { Link } from 'expo-router';

const WelcomeScreen = () => {
  return (
    <View style={welcomeScreenStyles.welcomeContainer}>
      <Text style={welcomeScreenStyles.welcomeTitle}>Welcome Back</Text>
      <Text style={welcomeScreenStyles.indexSubtitle}>Log in to access your account</Text>

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
      {/* <Link href="/ForgotPassword" style={welcomeScreenStyles.welcomeForgotPassword}>
        Forgot Password?
      </Link> */}

      <TouchableOpacity style={welcomeScreenStyles.welcomeLoginButton}>
        <Text style={welcomeScreenStyles.welcomeButtonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={welcomeScreenStyles.welcomeSignUpButton}>
        <Link href="/Sign_Up/Sign_up">
          <Text style={welcomeScreenStyles.welcomeSignUpText}>Sign Up</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
