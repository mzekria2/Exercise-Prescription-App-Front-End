import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import { useTranslation } from "./TranslationContext"; // Import global translation hook

const supportedLanguages = [
  { label: "🇺🇸 English", value: "en" },
  { label: "🇪🇸 Español", value: "es" },
  { label: "🇫🇷 Français", value: "fr" },
  { label: "🇩🇪 Deutsch", value: "de" },
  { label: "🇮🇹 Italiano", value: "it" },
  { label: "🇵🇹 Português", value: "pt" },
];

export default function Index() {
  const { language, setLanguage, translate } = useTranslation();
  const [title, setTitle] = useState("Hand Therapy Canada");
  const [subtitle, setSubtitle] = useState("Empowering Your Recovery Journey");
  const [loginText, setLoginText] = useState("Log In");
  const [signUpText, setSignUpText] = useState("Sign Up");

  useEffect(() => {
    const fetchTranslations = async () => {
      setTitle(await translate("Hand Therapy Canada"));
      setSubtitle(await translate("Empowering Your Recovery Journey"));
      setLoginText(await translate("Log In"));
      setSignUpText(await translate("Sign Up"));
    };
    fetchTranslations();
  }, [language]);

  return (
    <LinearGradient colors={["#F8D6A9", "#EFA550"]} style={styles.gradientBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image source={require("../assets/images/hand.jpg")} style={styles.backgroundPhoto} />
        <Text style={styles.subtitle}>{subtitle}</Text>

        <TouchableOpacity style={styles.loginbutton}>
          <Link href="/WelcomeScreen/Welcomescreen" style={styles.loginbuttonText}>
            {loginText}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpbutton}>
          <Link href="/Sign_Up/Sign_up" style={styles.signUpbuttonText}>
            {signUpText}
          </Link>
        </TouchableOpacity>

        {/* Language Selector */}
        <View style={styles.languageSelector}>
          <Text style={styles.languageLabel}>🌍 Select Language:</Text>
          <RNPickerSelect
            onValueChange={(value) => setLanguage(value)}
            items={supportedLanguages}
            value={language}
            placeholder={{ label: "Choose Language...", value: null }}
            style={pickerSelectStyles}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20, overflowY: "scroll" },
  backgroundPhoto: { paddingVertical: 40, width: "90%", height: 300, resizeMode: "cover", borderRadius: 15, marginBottom: 20 },
  title: { fontSize: 40, fontWeight: "bold", color: "#FF6F00", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 16, fontWeight: "500", color: "#555555", textAlign: "center", marginBottom: 30 },
  loginbutton: { width: "85%", paddingVertical: 15, borderRadius: 8, backgroundColor: "#F8D6A9", alignItems: "center", marginVertical: 10 },
  signUpbutton: { width: "85%", paddingVertical: 15, borderRadius: 8, backgroundColor: "#F8D6A9", alignItems: "center", marginVertical: 10 },
  loginbuttonText: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold", textAlign: "center" },
  signUpbuttonText: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold", textAlign: "center" },
  languageSelector: { marginTop: 20, alignItems: "center" },
  languageLabel: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
});

const pickerSelectStyles = {
  inputIOS: { fontSize: 16, padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, width: 200, textAlign: "center" },
  inputAndroid: { fontSize: 16, padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, width: 200, textAlign: "center" },
};
