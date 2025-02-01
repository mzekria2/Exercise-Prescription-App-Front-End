import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { signUpScreenStyles } from "./Sign_up.styles";
import { useRouter } from "expo-router"; // Import useRouter for navigation

const SignUp = () => {
  //'https://8c85-2605-8d80-6a3-89f8-ede5-a0d7-df1c-55bf.ngrok-free.app'
  const backendUrl = "http://localhost:3000"; // Define the backend URL here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter(); // Initialize router for navigation

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const onSignUp = async () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, numbers, and special characters.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    // If any errors exist, don't submit the form
    if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        // Use the backend URL variable
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/WelcomeScreen/Welcomescreen?success=true");
      } else {
        setErrors({
          ...errors,
          email: data.message || "Something went wrong.",
        });
      }
    } catch (error) {
      setErrors({ ...errors, email: "Unable to register. Please try again." });
    }
  };

  return (
    <View style={signUpScreenStyles.signUpContainer}>
      <Text style={signUpScreenStyles.signUpTitle}>Create Your Account</Text>
      <TextInput
        style={signUpScreenStyles.signUpInput}
        placeholder="Enter your Name"
        onChangeText={setName}
      />
      <TextInput
        style={signUpScreenStyles.signUpInput}
        placeholder="Enter your Email Address"
        onChangeText={setEmail}
      />
      {errors.email ? (
        <Text style={signUpScreenStyles.errorText}>{errors.email}</Text>
      ) : null}
      <TextInput
        style={signUpScreenStyles.signUpInput}
        placeholder="Create a Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      {errors.password ? (
        <Text style={signUpScreenStyles.errorText}>{errors.password}</Text>
      ) : null}
      <TextInput
        style={signUpScreenStyles.signUpInput}
        placeholder="Confirm your Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword ? (
        <Text style={signUpScreenStyles.errorText}>
          {errors.confirmPassword}
        </Text>
      ) : null}
      <TouchableOpacity
        style={signUpScreenStyles.signUpButton}
        onPress={onSignUp}
      >
        <Text style={{ color: "#fff" }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
