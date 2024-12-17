import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { indexPageStyles, welcomeScreenStyles } from './Welcomescreen.styles';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';

const WelcomeScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const params = useLocalSearchParams(); 
  const router = useRouter(); 

  const handleLogin = async () => {
    setErrorMessage(''); // Reset error message

    // Convert email to lowercase
    const normalizedEmail = email.trim().toLowerCase();

    // Check if email or password is empty
    if (!normalizedEmail || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    try {
      const response = await fetch('http://10.0.0.61:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: normalizedEmail, password }), // Use normalized email
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data.token);
        // Navigate to home page upon successful login
        router.push('/HomePage/HomePage');
      } else {
        setErrorMessage(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      setErrorMessage('Unable to login. Please try again later.');
    }
  };

  return (
    <View style={welcomeScreenStyles.welcomeContainer}>
      {/* Success Message from Sign-Up */}
      {params.success === 'true' && (
        <Text style={{ color: 'green', marginBottom: 10, fontWeight: 'bold' }}>
          Registration successful! Please log in.
        </Text>
      )}

      <Text style={welcomeScreenStyles.welcomeTitle}>Welcome Back</Text>
      <Text style={indexPageStyles.indexSubtitle}>Log in to access your account</Text>

      <TextInput
        style={welcomeScreenStyles.welcomeInput}
        placeholder="Email"
        placeholderTextColor="#888"
        onChangeText={setEmail} // Update email state
      />
      <TextInput
        style={welcomeScreenStyles.welcomeInput}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={setPassword} // Update password state
      />

      {/* Display Error Message */}
      {errorMessage ? (
        <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
      ) : null}

      {/* Login Button */}
      <TouchableOpacity
        style={welcomeScreenStyles.welcomeLoginButton}
        onPress={handleLogin}
      >
        <Text style={welcomeScreenStyles.welcomeButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity style={welcomeScreenStyles.welcomeSignUpButton}>
        <Link href="/Sign_Up/Sign_up">
          <Text style={welcomeScreenStyles.welcomeSignUpText}>Sign Up</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
