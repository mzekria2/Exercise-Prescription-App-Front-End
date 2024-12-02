import { StyleSheet } from "react-native";


export const welcomeScreenStyles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6F00', // Orange branding
    marginBottom: 20,
  },
  welcomeInput: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#B0C4DE',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#F7F7F7', // Light gray input fields
    fontSize: 16,
  },
  welcomeForgotPassword: {
    color: '#007ACC',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  welcomeLoginButton: {
    backgroundColor: '#FF6F00', // Orange primary button
    paddingVertical: 14,
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  welcomeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  welcomeSignUpButton: {
    paddingVertical: 14,
    width: '90%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6F00',
    backgroundColor: '#FFFFFF', // White secondary button
    alignItems: 'center',
  },
  welcomeSignUpText: {
    color: '#FF6F00', // Orange for secondary action text
    fontSize: 18,
    fontWeight: '600',
  },
  indexSubtitle: {
    fontSize: 16,
    color: '#555555', // Subtle gray for description text
    textAlign: 'center',
    marginBottom: 30,
  },
});
