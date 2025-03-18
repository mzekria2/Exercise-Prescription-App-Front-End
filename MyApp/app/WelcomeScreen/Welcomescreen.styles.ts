import { StyleSheet } from "react-native";

export const welcomeScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  // For small screens (column layout)
  leftContainerSmall: {
    flex: 0.3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rightContainerSmall: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 50,
  },

  // For large screens (row layout)
  leftContainerLarge: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  rightContainerLarge: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },

  // Animated text for small screens
  animatedTextSmall: {
    fontSize: 30,
    lineHeight: 34,
    color: "#2C3E50",       // Same color as "Welcome Back"
    textAlign: "center",
    fontFamily: "Georgia", // or any loaded custom font
    fontWeight: "500",
    fontStyle: "italic",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  // Animated text for large screens
  animatedTextLarge: {
    fontSize: 36,
    lineHeight: 44,
    color: "#2C3E50",           // Same color as "Welcome Back"
    textAlign: "center",
    fontFamily: "Italiana", // or any loaded custom font
    fontWeight: "500",
    fontStyle: "italic",
    marginHorizontal: 40,
    marginBottom: 10,
  },

  welcomeTitle: {
    fontSize: 32,
    fontFamily: 'Georgia',
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 10,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Georgia',
    color: "#34495E",
    marginBottom: 20,
    alignSelf: "center",
  },
  welcomeInput: {
    width: "100%",
    fontFamily: 'Georgia',
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 30,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    // Subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  errorText: {
    color: "red",
    fontFamily: 'Georgia',
    marginBottom: 10,
    textAlign: "center",
  },
  welcomeLoginButton: {
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  welcomeButtonText: {
    color: "#EFA550",
    fontFamily: 'Georgia',
    fontSize: 18,
    fontWeight: "600",
  },
  welcomeSignUpButton: {
    backgroundColor: "#2C3E50",
    fontFamily: 'Georgia',
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  welcomeSignUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  forgotPasswordButton: {
    marginTop: 5,
  },
  forgotPasswordText: {
    color: "#444",
    fontFamily: 'Georgia',
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
