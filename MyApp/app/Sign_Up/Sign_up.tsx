import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { signUpScreenStyles } from './Sign_up.styles';
import { Link } from 'expo-router';

const SignUp = () => {
  return (
    <View style={signUpScreenStyles.container}>
      <Text style={signUpScreenStyles.title}>Create Your Account</Text>

      <TextInput
        style={signUpScreenStyles.input}
        placeholder="Email"
        placeholderTextColor="#888"
      />
      <TextInput
        style={signUpScreenStyles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <TextInput
        style={signUpScreenStyles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <TouchableOpacity style={signUpScreenStyles.button}>
        <Text style={signUpScreenStyles.buttonText}>Sign Up</Text>
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
