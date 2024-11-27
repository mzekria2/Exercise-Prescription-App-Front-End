import { StyleSheet } from "react-native";

export const signUpScreenStyles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF6FF', // Light blue for consistency
    padding: 20,
  },
  signUpTitle: {
    fontSize: 28, // Larger for emphasis
    fontWeight: 'bold',
    color: '#005A9C', // Darker blue for branding consistency
    marginBottom: 20,
    textAlign: 'center',
  },
  signUpInput: {
    width: '90%',
    height: 50,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#B0C4DE',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Subtle shadow for input
  },
  signUpButton: {
    backgroundColor: '#007ACC', // Branded blue
    width: '90%',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Button shadow
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInRedirectText: {
    fontSize: 16,
    marginTop: 20,
    color: '#555',
    textAlign: 'center',
  },
  signInLink: {
    color: '#007ACC',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
