import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

function Index() {
  return (
    <LinearGradient
      colors={["#F8D6A9", "#EFA550"]} // Customize these colors to match the gradient
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Hand Therapy Canada</Text>
        <Image
          source={require("../assets/images/hand.jpg")}
          style={styles.backgroundPhoto}
        />
        <Text style={styles.subtitle}>Empowering Your Recovery Journey</Text>

        <TouchableOpacity
          style={styles.loginbutton}
          onPress={() => router.push("/WelcomeScreen/Welcomescreen")}
        >
          Log In
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpbutton}
          onPress={() => router.push("/Sign_Up/Sign_up")}
        >
          Sign Up
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backgroundPhoto: {
    paddingVertical: 40,
    width: "90%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF6F00",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555555",
    textAlign: "center",
    marginBottom: 30,
  },
  loginbutton: {
    width: "85%",
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#F8D6A9",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpbutton: {
    width: "85%",
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#F8D6A9",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginbuttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpbuttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Index;
