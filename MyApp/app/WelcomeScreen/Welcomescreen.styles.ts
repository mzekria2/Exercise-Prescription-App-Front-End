import { StyleSheet } from 'react-native';

export const welcomeScreenStyles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#000',
  },
  welcomeInput: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  welcomeForgotPassword: {
    color: '#00AEEF',
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: 32,
    fontSize: 14,
  },
  welcomeLoginButton: {
    backgroundColor: '#00AEEF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginBottom: 16,
  },
  welcomeLoginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  welcomeSignUpButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00AEEF',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  welcomeSignUpText: {
    color: '#00AEEF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  welcomeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export const indexPageStyles = StyleSheet.create({
  indexContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  indexLogo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  indexTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  indexSubtitle: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    padding: 20
  },
  indexButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  indexButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
