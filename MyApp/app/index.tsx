import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme'; 
import { Link } from 'expo-router';

function Index() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the HTC App</Text>
        <Link href="/WelcomeScreen/Welcomescreen" style={styles.link}>
          Get Started
        </Link>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EAF6FF', // Light blue background for consistency
  },
  title: {
    fontSize: 28, // Slightly larger for emphasis
    fontWeight: 'bold',
    color: '#005A9C', // Darker blue for branding consistency
    marginBottom: 30,
    textAlign: 'center',
  },
  link: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#007ACC', // Branded blue color
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4, // Android shadow
  },
});

export default Index;
