import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { signUpScreenStyles } from "./Sign_up.styles";
import { Link } from 'expo-router';

const SignUp = () => {
  return (
    <View style={signUpScreenStyles.signUpContainer}>
      <Text style={signUpScreenStyles.signUpTitle}>Create Your Account</Text>

      <TextInput
        style={signUpScreenStyles.signUpInput}
        placeholder="Enter your Email Address"
        placeholderTextColor="#888"
      />
      <TextInput
        style={signUpScreenStyles.signUpInput}
        placeholder="Confirm your Email Address"
        placeholderTextColor="#888"
      />
      <TextInput
        style={signUpScreenStyles.signUpInput}
        placeholder="Create a Password"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <TextInput
        style={signUpScreenStyles.signUpInput}
        placeholder="Confirm your Password"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <TouchableOpacity style={signUpScreenStyles.signUpButton}>
        <Text style={signUpScreenStyles.signUpButtonText}>Create Account</Text>
      </TouchableOpacity>

      <Text style={signUpScreenStyles.signInRedirectText}>
        Already have an account?{' '}
        <Link href="/WelcomeScreen/Welcomescreen" style={signUpScreenStyles.signInLink}>
          Sign In
        </Link>
      </Text>
    </View>
  );
};

export default SignUp;
