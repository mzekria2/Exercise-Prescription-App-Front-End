import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { welcomeScreenStyles } from './Welcomescreen.styles';
import { Link } from 'expo-router';

const WelcomeScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage(''); // Reset error message

    // Check if email or password is empty
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        console.log('Login successful:', data.token);
      } else {
        setErrorMessage(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      setErrorMessage('Unable to login. Please try again later.');
    }
  };

  if (isLoggedIn) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'green' }}>
          Login Successful!
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: '#0066cc',
            borderRadius: 5,
          }}
          onPress={() => setIsLoggedIn(false)} 
        >
          <Text style={{ color: '#fff' }}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

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

