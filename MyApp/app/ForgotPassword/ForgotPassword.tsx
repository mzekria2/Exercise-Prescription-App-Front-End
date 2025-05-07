import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { forgotPasswordStyles } from "./ForgotPassword.styles";
import { blindIndex } from "../utils/encryption";

// const backendUrl = "https://exercisebackend.duckdns.org";
const backendUrl = "http://10.0.0.86:3000";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [animatedTitle, setAnimatedTitle] = useState("");
  const fullTitle = "Forgot Password";

  useEffect(() => {
    setAnimatedTitle("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setAnimatedTitle(fullTitle.slice(0, i));
      if (i >= fullTitle.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleForgotPassword = async () => {
    try {
      const index = await blindIndex(email);
      const plainEmail = email;
      const response = await fetch(`${backendUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index, plainEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          "Success",
          "Password reset email sent. Please check your inbox."
        );
      } else {
        Alert.alert("Error", data.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to send reset email. Please try again later."
      );
    }
  };

  return (
    <View style={forgotPasswordStyles.container}>
      <Animated.Text style={forgotPasswordStyles.title}>
        {animatedTitle}
      </Animated.Text>
      <TextInput
        style={forgotPasswordStyles.input}
        placeholder="Enter your Email Address"
        placeholderTextColor="#2C3E50"
        onChangeText={setEmail}
      />
      <TouchableOpacity
        style={forgotPasswordStyles.button}
        onPress={handleForgotPassword}
      >
        <Animated.Text
          style={{
            color: "#fff",
            fontFamily: "Georgia",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Send Reset Email
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
