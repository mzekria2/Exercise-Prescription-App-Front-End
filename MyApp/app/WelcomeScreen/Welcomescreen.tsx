import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { indexPageStyles, welcomeScreenStyles } from "./Welcomescreen.styles";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "../TranslationContext"; // Import global translation hook

const backendUrl = "https://exercisebackend.duckdns.org"; // Define the backend URL here

const WelcomeScreen = () => {
  const { translate } = useTranslation(); // Use global translation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const params = useLocalSearchParams();
  const router = useRouter();

  // State for translated text
  const [translatedTitle, setTranslatedTitle] = useState("Welcome Back");
  const [translatedSubtitle, setTranslatedSubtitle] = useState("Log in to access your account");
  const [translatedEmailPlaceholder, setTranslatedEmailPlaceholder] = useState("Email");
  const [translatedPasswordPlaceholder, setTranslatedPasswordPlaceholder] = useState("Password");
  const [translatedLogin, setTranslatedLogin] = useState("Log In");
  const [translatedSignUp, setTranslatedSignUp] = useState("Sign Up");
  const [translatedForgotPassword, setTranslatedForgotPassword] = useState("Forgot Password?");

  // Translate all text when language changes
  useEffect(() => {
    const fetchTranslations = async () => {
      setTranslatedTitle(await translate("Welcome Back"));
      setTranslatedSubtitle(await translate("Log in to access your account"));
      setTranslatedEmailPlaceholder(await translate("Email"));
      setTranslatedPasswordPlaceholder(await translate("Password"));
      setTranslatedLogin(await translate("Log In"));
      setTranslatedSignUp(await translate("Sign Up"));
      setTranslatedForgotPassword(await translate("Forgot Password?"));
    };
    fetchTranslations();
  }, [translate]);

  const handleLogin = async () => {
    setErrorMessage(""); // Reset error message

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setErrorMessage(await translate("Please fill in both email and password."));
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail, password }),
        credentials: "include", // Ensures cookies are sent with the request
      });

      console.log(response.status, "response status");
      const data = await response.json();
      console.log(data, "data");

      if (response.ok) {
        console.log("Login successful:", data.token);
        router.push("/HomePage/HomePage");
      } else {
        setErrorMessage(await translate(data.message || "Invalid email or password."));
      }
    } catch (error) {
      setErrorMessage(await translate("Unable to login. Please try again later."));
    }
  };

  return (
    <View style={welcomeScreenStyles.welcomeContainer}>
      {params.success === "true" && (
        <Text style={{ color: "green", marginBottom: 10, fontWeight: "bold" }}>
          {translatedTitle}
        </Text>
      )}

      <Text style={welcomeScreenStyles.welcomeTitle}>{translatedTitle}</Text>
      <Text style={indexPageStyles.indexSubtitle}>{translatedSubtitle}</Text>

      <TextInput
        style={welcomeScreenStyles.welcomeInput}
        placeholder={translatedEmailPlaceholder}
        placeholderTextColor="#888"
        onChangeText={setEmail}
      />
      <TextInput
        style={welcomeScreenStyles.welcomeInput}
        placeholder={translatedPasswordPlaceholder}
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={setPassword}
      />

      {errorMessage ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={welcomeScreenStyles.welcomeLoginButton} onPress={handleLogin}>
        <Text style={welcomeScreenStyles.welcomeButtonText}>{translatedLogin}</Text>
      </TouchableOpacity>

      <Link href="/Sign_Up/Sign_up" style={welcomeScreenStyles.welcomeSignUpButton}>
        <TouchableOpacity>
          <Text style={welcomeScreenStyles.welcomeSignUpText}>{translatedSignUp}</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity style={welcomeScreenStyles.welcomeForgotPasswordButton}>
        <Link href="/ForgotPassword/ForgotPassword">
          <Text style={welcomeScreenStyles.welcomeForgotPasswordText}>
            {translatedForgotPassword}
          </Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
