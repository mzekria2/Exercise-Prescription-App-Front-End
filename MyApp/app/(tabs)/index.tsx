import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './index.styles';
import { RootStackParamList } from './types';


const IndexPage: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


  // Debugging navigation
  console.log(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Hand Therapy Canada Exercise Prescription App!</Text>
      <Text style={styles.subtitle}>Helping you recover with personalized exercise routines.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IndexPage;
