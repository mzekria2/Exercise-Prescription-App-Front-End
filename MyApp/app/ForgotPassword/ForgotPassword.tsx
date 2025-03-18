import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { forgotPasswordStyles } from './ForgotPassword.styles';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('https://exercisebackend.duckdns.org/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        window.alert('Password reset email sent. Please check your inbox.');
      } else {
        window.alert('Error something went wrong.');
      }
    } catch (error) {
      window.alert('Error unable to send reset email. Please try again later.');
    }
  };

  return (
    <View style={forgotPasswordStyles.container}>
      <Text style={forgotPasswordStyles.title}>Forgot Password</Text>
      <TextInput
        style={forgotPasswordStyles.input}
        placeholder="Enter your Email Address"
        onChangeText={setEmail}
      />
      <TouchableOpacity style={forgotPasswordStyles.button} onPress={handleForgotPassword}>
        <Text style={{ color: '#fff' }}>Send Reset Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
