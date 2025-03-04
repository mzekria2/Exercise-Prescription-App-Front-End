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
        <Image source={require("../assets/images/hand.jpg")} style={styles.backgroundPhoto} />
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
  gradientBackground: { flex: 1 },
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  backgroundPhoto: { width: "90%", height: 300, resizeMode: "cover", borderRadius: 15, marginBottom: 20 },
  title: { fontSize: 40, fontWeight: "bold", color: "#FF6F00", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 16, fontWeight: "500", color: "#555555", textAlign: "center", marginBottom: 30 },
  loginButton: { width: "85%", paddingVertical: 15, borderRadius: 8, backgroundColor: "#F8D6A9", alignItems: "center", marginVertical: 10 },
  signUpButton: { width: "85%", paddingVertical: 15, borderRadius: 8, backgroundColor: "#F8D6A9", alignItems: "center", marginVertical: 10 },
  loginButtonText: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold", textAlign: "center" },
  signUpButtonText: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold", textAlign: "center" },

  languageContainer: { position: "absolute", top: 55, right: 10, zIndex: 10, color: "#000000"},
  languageButton: { backgroundColor: "#EFA550", padding: 1, borderRadius: 10, elevation: 1, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 100 },
  pickerStyle: { backgroundColor: "#EFA550", borderRadius: 10, paddingVertical: 10, borderColor:"#EFA550",  },
  pickerText: { fontSize: 15, fontWeight: "bold", textAlign: "center" }, 
});