import { StyleSheet } from "react-native";

export const welcomeScreenStyles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6F00", // Orange branding
    marginBottom: 20,
  },
  welcomeInput: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#B0C4DE",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#F7F7F7", // Light gray input fields
    fontSize: 16,
  },
  welcomeForgotPassword: {
    color: "#007ACC",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  welcomeLoginButton: {
    backgroundColor: "#ffae1a",
    paddingVertical: 14,
    width: "90%", // Ensure it takes enough space
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center", // Ensures text is centered
    marginBottom: 12,
  },
  welcomeSignUpButton: {
    paddingVertical: 14,
    width: "90%",
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#ffae1a",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  welcomeSignUpText: {
    color: "#ffae1a",
    fontSize: 16,
    fontWeight: "bold",
  },
  welcomeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  welcomeForgotPasswordButton: {
    marginTop: 10,
    alignItems: "center",
  },

  welcomeForgotPasswordText: {
    fontSize: 14,
    color: "#0066cc",
    textDecorationLine: "underline",
  },
});

export const indexPageStyles = StyleSheet.create({
  indexContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  indexLogo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  indexTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  indexSubtitle: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
    marginBottom: 30,
  },
});
