import { StyleSheet } from "react-native";

export const signUpScreenStyles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  signUpTitle: {
    fontSize: 38,
    fontWeight: "700",
    color: "#2C3E50", // Consistent with Welcome Back
    marginBottom: 20,
    textAlign: "center",
    fontStyle: "italic",
    paddingBottom:30
  },
  signUpInput: {
    width: "90%",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 30, // Increased border radius for a modern look
    fontSize: 16,
    color: "#111", // Pure black for better legibility on mobile
    marginBottom: 15,
    fontFamily: "Georgia",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Georgia",
  },
  signUpButton: {
    backgroundColor: "#2C3E50",
    width: "50%",
    marginTop:30,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
    // Consistent shadow
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
    fontFamily: "Georgia",
  },
});
