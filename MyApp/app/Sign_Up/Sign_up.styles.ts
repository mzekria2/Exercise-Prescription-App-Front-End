import { StyleSheet } from "react-native";

export const signUpScreenStyles = StyleSheet.create({
  // Container for the whole screen
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  // The animated title at the top
  animatedText: {
    fontSize: 35,
    lineHeight: 32,
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Georgia",
    fontStyle: "italic",
    fontWeight: 'bold'
  },

  // Card container for the form
  card: {
    width: "100%",
    maxWidth: 400,         
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Georgia",
  },

  // Text inputs
  input: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 30,
    fontSize: 16,
    color: "#111",
    marginBottom: 15,
    fontFamily: "Georgia",
    textAlign: "left",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  // Error text
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Georgia",
  },

  // Sign-up button
  button: {
    backgroundColor: "#2C3E50",
    width: "70%",
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Georgia",
  },
});

