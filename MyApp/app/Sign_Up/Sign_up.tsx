import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { signUpScreenStyles as styles } from "./Sign_up.styles";
import { useRouter } from "expo-router";
import { useTranslation } from "../TranslationContext";
import { blindIndex, encryptEmail } from "../utils/encryption";
const SignUp = () => {
  // const backendUrl = "https://exercisebackend.duckdns.org";
  const backendUrl = "http://10.0.0.86:3000";
  const { translate } = useTranslation();
  const router = useRouter();

  // Default translated texts
  const [translatedText, setTranslatedText] = useState({
    signUpTitle: "Create Your Account",
    // namePlaceholder: "Enter your Name",
    emailPlaceholder: "Enter your Email Address",
    passwordPlaceholder: "Create a Password",
    confirmPasswordPlaceholder: "Confirm your Password",
    signUpButton: "Create Account",
  });

  // Animated title states
  const [fullAnimatedTitle, setFullAnimatedTitle] = useState(
    "Create Your Account"
  );
  const [animatedTitle, setAnimatedTitle] = useState("");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Fetch translations on mount
  useEffect(() => {
    const fetchTranslations = async () => {
      const signUpTitle = await translate("Create Your Account");
      // const namePlaceholder = await translate("Enter your Name");
      const emailPlaceholder = await translate("Enter your Email Address");
      const passwordPlaceholder = await translate("Create a Password");
      const confirmPasswordPlaceholder = await translate(
        "Confirm your Password"
      );
      const signUpButton = await translate("Create Account");

      setTranslatedText({
        signUpTitle,
        // namePlaceholder,
        emailPlaceholder,
        passwordPlaceholder,
        confirmPasswordPlaceholder,
        signUpButton,
      });

      // Use the translated title for the animation
      setFullAnimatedTitle(signUpTitle);
    };
    fetchTranslations();
  }, [translate]);

  // Animate the title letter-by-letter
  useEffect(() => {
    setAnimatedTitle(""); // reset animated title
    let i = 0;
    const interval = setInterval(() => {
      i++;
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

  const validatePassword = (password) => {
    // At least 8 chars, uppercase, lowercase, number, special char
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

    // If errors exist, do not proceed
    if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
      return;
    }

    try {
      console.log("in try");
      const idx = await blindIndex(email);
      console.log("Blind index:", idx);
      const { iv, ct } = await encryptEmail(email);
      console.log("Encrypted email:", { iv, ct });

      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          index: idx,
          emailCipher: { iv, ct },
          password,
          plainEmail: email,
        }),
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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Animated Title at the Top */}
      <Text style={styles.animatedText}>{animatedTitle}</Text>

      {/* Card Container for the Form */}
      <View style={styles.card}>
        {/* (Optional) Static Title inside the card; remove if you only want the animated text */}
        {/* <Text style={styles.title}>{translatedText.signUpTitle}</Text> */}

        {/* <TextInput
          style={styles.input}
          // placeholder={translatedText.namePlaceholder}
          placeholderTextColor="#888"
          onChangeText={setName}
        /> */}

        <TextInput
          style={styles.input}
          placeholder={translatedText.emailPlaceholder}
          placeholderTextColor="#888"
          onChangeText={setEmail}
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder={translatedText.passwordPlaceholder}
          placeholderTextColor="#888"
          secureTextEntry
          onChangeText={setPassword}
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder={translatedText.confirmPasswordPlaceholder}
          placeholderTextColor="#888"
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPassword ? (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={onSignUp}>
          <Text style={styles.buttonText}>{translatedText.signUpButton}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;
