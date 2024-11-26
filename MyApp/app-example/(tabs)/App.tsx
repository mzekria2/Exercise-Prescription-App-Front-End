import React, { useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
// import NotFoundScreen from '../+not-found';
import WelcomeScreen from './Welcomescreen'; // Ensure this path is correct
import { useColorScheme } from '@/hooks/useColorScheme';

// Define the Stack Navigator outside of the component for better performance
const Stack = createNativeStackNavigator();

function App() {
    // Prevent the splash screen from auto-hiding before asset loading is complete.
    SplashScreen.preventAutoHideAsync();

    // Load fonts and handle the splash screen
    const [fontsLoaded] = useFonts({
      SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    });

    const colorScheme = useColorScheme();

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    // If fonts are not loaded, return null to avoid rendering other components
    if (!fontsLoaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}

export default App;
