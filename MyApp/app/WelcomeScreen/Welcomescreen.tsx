import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { indexPageStyles, welcomeScreenStyles } from "./Welcomescreen.styles";
import { Link, useRouter, useLocalSearchParams } from "expo-router";

const WelcomeScreen = () => {
  //'https://8c85-2605-8d80-6a3-89f8-ede5-a0d7-df1c-55bf.ngrok-free.app'
  const backendUrl = "http://localhost:3000"; // Define the backend URL here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const params = useLocalSearchParams();
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage(""); // Reset error message

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }

    try {
      console.log("in try");
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        // Use the backend URL variable
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });
      console.log(response.status, "resposne status");
      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data.token);
        router.push("/HomePage/HomePage");
      } else {
        setErrorMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("Unable to login. Please try again later.");
    }
  };

  return (
    <View style={welcomeScreenStyles.welcomeContainer}>
      {params.success === "true" && (
        <Text style={{ color: "green", marginBottom: 10, fontWeight: "bold" }}>
          Registration successful! Please log in.
        </Text>
      )}

      <Text style={welcomeScreenStyles.welcomeTitle}>Welcome Back</Text>
      <Text style={indexPageStyles.indexSubtitle}>
        Log in to access your account
      </Text>

      <TextInput
        style={welcomeScreenStyles.welcomeInput}
        placeholder="Email"
        placeholderTextColor="#888"
        onChangeText={setEmail}
      />
      <TextInput
        style={welcomeScreenStyles.welcomeInput}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={setPassword}
      />

      {errorMessage ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity
        style={welcomeScreenStyles.welcomeLoginButton}
        onPress={handleLogin}
      >
        <Text style={welcomeScreenStyles.welcomeButtonText}>Log In</Text>
      </TouchableOpacity>

      <Link
        href="/Sign_Up/Sign_up"
        style={welcomeScreenStyles.welcomeSignUpButton}
      >
        <TouchableOpacity>
          <Text style={welcomeScreenStyles.welcomeSignUpText}>Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default WelcomeScreen;
