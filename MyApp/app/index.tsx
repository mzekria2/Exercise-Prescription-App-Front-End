import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter, Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import ModalSelector from "react-native-modal-selector"; 
import { useTranslation } from "./TranslationContext"; 
import { PushTokenProvider } from "./PushTokenProvider";

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
  const router = useRouter();
  const [translatedText, setTranslatedText] = useState({
    title: "Hand Therapy Canada",
    loginText: "Log In",
    signUpText: "Sign Up",
  });

  const fetchTranslations = useCallback(async () => {
    setTranslatedText({
      title: await translate("Hand Therapy Canada"),
      loginText: await translate("Log In"),
      signUpText: await translate("Sign Up"),
    });
  }, [translate]);

  useEffect(() => {
    fetchTranslations();
  }, [language, fetchTranslations]);

  return (
    <PushTokenProvider>
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

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/WelcomeScreen/Welcomescreen")}
          >
            <Text style={styles.loginButtonText}>{translatedText.loginText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => router.push("/Sign_Up/Sign_up")}
          >
            <Text style={styles.signUpButtonText}>{translatedText.signUpText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {/* <Text style={styles.title}>Welcome to the HTC app</Text> */}
          {/* <Link href="/WelcomeScreen/Welcomescreen">Tap to get Started</Link> */}
          {/* <Link href="/Notifs/notifications">Notifs</Link> */}
        </View>
      </LinearGradient>
    </PushTokenProvider>
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
    top: 70,
    right: 20,
    zIndex: 10,
  },
  languageButton: {
    backgroundColor: "#EFA560",
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
    fontFamily: 'Georgia',
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    paddingHorizontal: 20,
    marginTop: 50
  },
  title: {
    fontSize: 40,
    fontFamily: 'Georgia',
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 10,
    textAlign: "center",
    paddingBottom: 30,
  },
  imageCircleContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
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
    borderColor: '#000',
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#EFA550",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: 'Georgia',
  },
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
    width: "100%",
    alignItems: "center",
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: 'Georgia',
  },
});
