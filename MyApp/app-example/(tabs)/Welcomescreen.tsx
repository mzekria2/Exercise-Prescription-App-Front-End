import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {StackNavigationProp } from '@react-navigation/stack';
import { welcomeScreenStyles, indexPageStyles } from './Welcomescreen.styles';  
import { RootStackParamList } from './types';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
  
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={welcomeScreenStyles.welcomeContainer}>    
      <Text style={indexPageStyles.indexTitle}>Welcome to the Hand Therapy Canada Exercise Prescription App!</Text>
      <Text style={indexPageStyles.indexSubtitle}>Helping you recover with personalized exercise routines.</Text>
      <Text style={welcomeScreenStyles.welcomeTitle}>HTC APP</Text>
      <TextInput style={welcomeScreenStyles.welcomeInput} placeholder="Username" placeholderTextColor="#666" />
      <TextInput style={welcomeScreenStyles.welcomeInput} placeholder="Password" placeholderTextColor="#666" secureTextEntry />
      <Text style={welcomeScreenStyles.welcomeForgotPassword}>Forgot Password?</Text>
      <TouchableOpacity style={welcomeScreenStyles.welcomeLoginButton} onPress={() => { /* Add your login function or navigation */ }}>
        <Text style={welcomeScreenStyles.welcomeLoginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={welcomeScreenStyles.welcomeSignUpButton} onPress={() => { /* Handle sign up or navigation */ }}>
        <Text style={welcomeScreenStyles.welcomeSignUpText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={welcomeScreenStyles.welcomeButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;