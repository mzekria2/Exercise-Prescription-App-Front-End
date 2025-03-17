import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import ModalSelector from "react-native-modal-selector"; 
import { useTranslation } from "./TranslationContext"; 

const supportedLanguages = [
  { key: "en", label: "🇺🇸 English", value: "en" },
  { key: "es", label: "🇪🇸 Español", value: "es" },
  { key: "fr", label: "🇫🇷 Français", value: "fr" },
  { key: "de", label: "🇩🇪 Deutsch", value: "de" },
  { key: "it", label: "🇮🇹 Italiano", value: "it" },
  { key: "pt", label: "🇵🇹 Português", value: "pt" },
];

export default function Index() {
  const { language, setLanguage, translate } = useTranslation();
  const [translatedText, setTranslatedText] = useState({
    title: "Hand Therapy Canada",
    subtitle: "Empowering Your Recovery Journey",
    loginText: "Log In",
    signUpText: "Sign Up",
  });

  const fetchTranslations = useCallback(async () => {
    setTranslatedText({
      title: await translate("Hand Therapy Canada"),
      subtitle: await translate("Empowering Your Recovery Journey"),
      loginText: await translate("Log In"),
      signUpText: await translate("Sign Up"),
    });
  }, [translate]);

  useEffect(() => {
    fetchTranslations();
  }, [language, fetchTranslations]);

  return (
    <LinearGradient colors={["#F8D6A9", "#EFA550"]} style={styles.gradientBackground}>
      <View style={styles.languageContainer}>
        <TouchableOpacity style={styles.languageButton}>
          <ModalSelector
            data={supportedLanguages}
            initValue="🌍 Select Language"
            onChange={(option) => setLanguage(option.value)}
            selectStyle={styles.pickerStyle}
            selectTextStyle={styles.pickerText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>{translatedText.title}</Text>

        <View style={styles.imageCircleContainer}>
          <Image
            source={require("../assets/images/handremovebg.jpg")}
            style={styles.backgroundPhoto}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.subtitle}>{translatedText.subtitle}</Text>

        <TouchableOpacity style={styles.loginButton}>
          <Link href="/WelcomeScreen/Welcomescreen" style={styles.loginButtonText}>
            {translatedText.loginText}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton}>
          <Link href="/Sign_Up/Sign_up" style={styles.signUpButtonText}>
            {translatedText.signUpText}
          </Link>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  languageContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  languageButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pickerStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  pickerText: {
    color: "#222",
    fontSize: 14,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    color: "#34495E",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  imageCircleContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#F2F2F2",
    borderWidth: 3,
    borderColor: "#EFA560",
    overflow: "hidden",
    marginBottom: 20,
  },
  backgroundPhoto: {
    width: "100%",
    height: "100%",
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderColor:'#000',
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButtonText: {
    color: "#EFA550",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  // Updated sign up button background to a deep muted navy for contrast
  signUpButton: {
    backgroundColor: "#2C3E50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
