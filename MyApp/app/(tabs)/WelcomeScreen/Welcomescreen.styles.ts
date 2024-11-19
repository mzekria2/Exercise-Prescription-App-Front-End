import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#000',
  },
  input: {
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
  forgotPassword: {
    color: '#00AEEF',
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: 32,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#00AEEF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginBottom: 16,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00AEEF',
  },
  signUpText: {
    color: '#00AEEF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


