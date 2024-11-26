import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { welcomeScreenStyles, indexPageStyles } from './Welcomescreen.styles';  
import { Link } from 'expo-router'



const WelcomeScreen = () => {

  return (
    <View style={welcomeScreenStyles.welcomeContainer}>    
      <Text style={indexPageStyles.indexTitle}>Welcome to the Hand Therapy Canada Exercise Prescription App!</Text>
      <Text style={indexPageStyles.indexSubtitle}>Helping you recover with personalized exercise routines.</Text>
      <Text style={welcomeScreenStyles.welcomeTitle}>HTC APP</Text>
      <TextInput style={welcomeScreenStyles.welcomeInput} placeholder="Username" placeholderTextColor="#666" />
      <TextInput style={welcomeScreenStyles.welcomeInput} placeholder="Password" placeholderTextColor="#666" secureTextEntry />
      <Text style={welcomeScreenStyles.welcomeForgotPassword}>Forgot Password?</Text>
      <TouchableOpacity style={welcomeScreenStyles.welcomeLoginButton}>
       <Button title = 'Login'/>
      </TouchableOpacity>

        <Link href= "/Sign_Up/Sign_up"> Sign-Up </Link>

    </View>
  );
};

export default WelcomeScreen;