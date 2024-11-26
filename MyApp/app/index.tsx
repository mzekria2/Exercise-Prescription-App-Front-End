import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme'; 
import { Link } from "expo-router"

function Index() {
  const colorScheme = useColorScheme();


  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to the HTC app</Text>
          <Link href= "/WelcomeScreen/Welcomescreen">Tap to get Started </Link>
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
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  }
});


export default Index;