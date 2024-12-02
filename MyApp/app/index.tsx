import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hand Therapy Canada</Text>
      <Image
        source={require('../assets/images/hand.jpg')} // Local image
        style={styles.backgroundPhoto}
      />
      
      <Text style={styles.subtitle}>Empowering Your Recovery Journey</Text>

      <TouchableOpacity style={styles.button}>
        <Link href="/WelcomeScreen/Welcomescreen" style={styles.buttonText}>
          Log In
        </Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Link href="/Sign_Up/Sign_up" style={styles.buttonText}>
          Sign Up
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', 
    paddingHorizontal: 20,
  },
  backgroundPhoto: {
    paddingVertical: 40 ,
    width: '90%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 15, 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, 
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF6F00', 
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555555', 
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: '85%',
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: '#ffae1a', 
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Index;
