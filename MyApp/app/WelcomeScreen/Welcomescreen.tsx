import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "../TranslationContext";
import { welcomeScreenStyles as styles } from "./Welcomescreen.styles";

const backendUrl = "https://exercisebackend.duckdns.org";

export default function WelcomeScreen() {
  const { translate } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const params = useLocalSearchParams();
  const router = useRouter();

  // Text to animate
  const fullText = "Together Towards Recovery";
  const [animatedText, setAnimatedText] = useState("");

  // Translated text states
  const [translatedTitle, setTranslatedTitle] = useState("Welcome Back");
  const [translatedSubtitle, setTranslatedSubtitle] = useState("Log in to access your account");
  const [translatedEmailPlaceholder, setTranslatedEmailPlaceholder] = useState("Email");
  const [translatedPasswordPlaceholder, setTranslatedPasswordPlaceholder] = useState("Password");
  const [translatedLogin, setTranslatedLogin] = useState("Log In");
  const [translatedSignUp, setTranslatedSignUp] = useState("Sign Up");
  const [translatedForgotPassword, setTranslatedForgotPassword] = useState("Forgot Password?");

  // Responsive layout
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600; // Adjust as needed

  // Animate text on mount, using slicing to avoid "undefined"
  useEffect(() => {
    setAnimatedText("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      // Slice the string from 0 to i, ensuring no out-of-range index
      setAnimatedText(fullText.slice(0, i));

      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [fullText]);

  // Translate text on mount
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
    setErrorMessage("");
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setErrorMessage(await translate("Please fill in both email and password."));
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/HomePage/HomePage");
      } else {
        setErrorMessage(await translate(data.message || "Invalid email or password."));
      }
    } catch (error) {
      setErrorMessage(await translate("Unable to login. Please try again later."));
    }
  };

  return (
    <View
      style={[
        styles.mainContainer,
        { flexDirection: isSmallScreen ? "column" : "row" },
      ]}
    >
      {/* Left side: Animated text */}
      <View style={[isSmallScreen ? styles.leftContainerSmall : styles.leftContainerLarge]}>
        {/* On smaller screens, use a smaller font for legibility */}
        <Text style={isSmallScreen ? styles.animatedTextSmall : styles.animatedTextLarge}>
          {animatedText}
        </Text>
      </View>

      {/* Right side: login form */}
      <View style={[isSmallScreen ? styles.rightContainerSmall : styles.rightContainerLarge]}>
        {params.success === "true" && (
          <Text style={{ color: "green", marginBottom: 10, fontWeight: "bold" }}>
            {translatedTitle}
          </Text>
        )}

        <Text style={styles.welcomeTitle}>{translatedTitle}</Text>
        <Text style={styles.subtitle}>{translatedSubtitle}</Text>

        <TextInput
          style={styles.welcomeInput}
          placeholder={translatedEmailPlaceholder}
          placeholderTextColor="#888"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.welcomeInput}
          placeholder={translatedPasswordPlaceholder}
          placeholderTextColor="#888"
          secureTextEntry
          onChangeText={setPassword}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.welcomeLoginButton} onPress={handleLogin}>
          <Text style={styles.welcomeButtonText}>{translatedLogin}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.welcomeSignUpButton}
          onPress={() => router.push("/Sign_Up/Sign_up")}
        >
          <Text style={styles.welcomeSignUpButtonText}>{translatedSignUp}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Link href="/ForgotPassword/ForgotPassword">
            <Text style={styles.forgotPasswordText}>{translatedForgotPassword}</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
