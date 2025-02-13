import { StyleSheet } from "react-native";

export const signUpScreenStyles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  signUpTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  signUpInput: {
    width: "90%",
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#333",
  },
  signUpButton: {
    backgroundColor: "#0066cc",
    width: "90%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  signInRedirectText: {
    fontSize: 16,
    marginTop: 20,
    color: "#666",
  },
  signInLink: {
    color: "#0066cc",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginTop: -5,
    marginBottom: 10,
  },
});
