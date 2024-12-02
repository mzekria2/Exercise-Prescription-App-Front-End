import { StyleSheet } from "react-native";

export const signUpScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#B0C4DE',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#F7F7F7',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF6F00',
    paddingVertical: 14,
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInRedirectText: {
    fontSize: 16,
    marginTop: 20,
    color: '#555555',
    textAlign: 'center',
  },
  signInLink: {
    color: '#FF6F00',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
