import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { signUpScreenStyles } from "./Sign_up.styles";
import { useRouter } from "expo-router"; // For navigation

const SignUp = () => {
  const backendUrl = "https://exercisebackend.duckdns.org";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  // New state for animated title text
  const fullAnimatedTitle = "Create Your Account";
  const [animatedTitle, setAnimatedTitle] = useState("");

  // Animate the title on mount
  useEffect(() => {
    setAnimatedTitle(""); // Clear on mount
    let i = 0;
    const interval = setInterval(() => {
      i++;
      // Use slicing to prevent "undefined" from appending
      setAnimatedTitle(fullAnimatedTitle.slice(0, i));
      if (i >= fullAnimatedTitle.length) {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [fullAnimatedTitle]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
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

    // If any errors exist, do not proceed
    if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
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
      <Text style={signUpScreenStyles.signUpTitle}>{animatedTitle}</Text>
      <TextInput
        style={signUpScreenStyles.signUpInput}
        placeholder="Enter your Name"
        placeholderTextColor="#888"
        onChangeText={setName}
      />
      <TextInput
        style={signUpScreenStyles.signUpInput}
        placeholder="Enter your Email Address"
        placeholderTextColor="#888"
        onChangeText={setEmail}
      />
      {errors.email ? (
        <Text style={signUpScreenStyles.errorText}>{errors.email}</Text>
      ) : null}
      <TextInput
        style={signUpScreenStyles.signUpInput}
        placeholder="Create a Password"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={setPassword}
      />
      {errors.password ? (
        <Text style={signUpScreenStyles.errorText}>{errors.password}</Text>
      ) : null}
      <TextInput
        style={signUpScreenStyles.signUpInput}
        placeholder="Confirm your Password"
        placeholderTextColor="#888"
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
        <Text style={signUpScreenStyles.signUpButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
