import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "../TranslationContext";
import { welcomeScreenStyles as styles } from "./Welcomescreen.styles";
import { blindIndex } from "../utils/encryption";
const backendUrl = "http://10.0.0.86:3000";
//const backendUrl = "https://exercisebackend.duckdns.org";

export default function WelcomeScreen() {
  const { translate } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const params = useLocalSearchParams();
  const router = useRouter();

  // Animated text: full text to animate (translated)
  const [fullAnimatedText, setFullAnimatedText] = useState(
    "Together Towards Recovery"
  );
  const [animatedText, setAnimatedText] = useState("");

  // Translated text states for all UI strings
  const [translatedTitle, setTranslatedTitle] = useState("Welcome Back");
  const [translatedSubtitle, setTranslatedSubtitle] = useState(
    "Log in to access your account"
  );
  const [translatedEmailPlaceholder, setTranslatedEmailPlaceholder] =
    useState("Email");
  const [translatedPasswordPlaceholder, setTranslatedPasswordPlaceholder] =
    useState("Password");
  const [translatedLogin, setTranslatedLogin] = useState("Log In");
  const [translatedSignUp, setTranslatedSignUp] = useState("Sign Up");
  const [translatedForgotPassword, setTranslatedForgotPassword] =
    useState("Forgot Password?");

  // Translate all text on mount, including the animated text
  useEffect(() => {
    const fetchTranslations = async () => {
      setFullAnimatedText(await translate("Together Towards Recovery"));
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

  // Animate the translated text letter by letter
  useEffect(() => {
    setAnimatedText("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setAnimatedText(fullAnimatedText.slice(0, i));
      if (i >= fullAnimatedText.length) {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [fullAnimatedText]);

  const handleLogin = async () => {
    setErrorMessage("");
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setErrorMessage(
        await translate("Please fill in both email and password.")
      );
      return;
    }

    try {
      const idx = await blindIndex(email);
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: idx, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/HomePage/HomePage");
      } else {
        setErrorMessage(
          await translate(data.message || "Invalid email or password.")
        );
      }
    } catch (error) {
      setErrorMessage(
        await translate("Unable to login. Please try again later.")
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Animated Text at the Top */}
      <Text style={styles.animatedText}>{animatedText}</Text>

      {/* Card‐like container for the form */}
      <View style={styles.card}>
        {params.success === "true" && (
          <Text
            style={[styles.subtitle, { color: "green", fontWeight: "bold" }]}
          >
            {translatedTitle}
          </Text>
        )}

        <Text style={styles.title}>{translatedTitle}</Text>
        <Text style={styles.subtitle}>{translatedSubtitle}</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder={translatedEmailPlaceholder}
          placeholderTextColor="#888"
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder={translatedPasswordPlaceholder}
          placeholderTextColor="#888"
          secureTextEntry
          onChangeText={setPassword}
        />

        {/* Error Message */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {/* Log In Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{translatedLogin}</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => router.push("/Sign_Up/Sign_up")}
        >
          <Text style={styles.signUpButtonText}>{translatedSignUp}</Text>
        </TouchableOpacity>

        {/* Forgot Password Link */}
        <TouchableOpacity style={styles.forgotPassword}>
          <Link href="/ForgotPassword/ForgotPassword">
            <Text style={styles.forgotPasswordText}>
              {translatedForgotPassword}
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
