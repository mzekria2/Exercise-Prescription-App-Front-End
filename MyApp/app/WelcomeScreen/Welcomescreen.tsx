import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { welcomeScreenStyles, indexPageStyles } from './Welcomescreen.styles';  
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
      <Text style={indexPageStyles.indexTitle}>
        Welcome to the Hand Therapy Canada Exercise Prescription App!
      </Text>
      <Text style={indexPageStyles.indexSubtitle}>
        Helping you recover with personalized exercise routines.
      </Text>
      <Text style={welcomeScreenStyles.welcomeTitle}>HTC APP</Text>

      {/* Input fields */}
      <TextInput
        style={welcomeScreenStyles.welcomeInput}
        placeholder="Enter your Email Address"
        placeholderTextColor="#666"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={welcomeScreenStyles.welcomeInput}
        placeholder="Enter your Password"
        placeholderTextColor="#666"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      {/* Error message */}
      {errorMessage ? (
        <Text style={welcomeScreenStyles.errorText}>{errorMessage}</Text>
      ) : null}

      {/* Forgot password and Login button */}
      <Text style={welcomeScreenStyles.welcomeForgotPassword}>Forgot Password?</Text>
      <TouchableOpacity
        style={welcomeScreenStyles.welcomeLoginButton}
        onPress={handleLogin}
      >
        <Text style={{ color: '#fff' }}>Login</Text>
      </TouchableOpacity>

      {/* Link to sign-up */}
      <Link href="/Sign_Up/Sign_up">Don't have an account? Sign up</Link>
    </View>
  );
};

export default WelcomeScreen;
