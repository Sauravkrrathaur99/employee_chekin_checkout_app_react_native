import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  // Handle login button click
  const handleLogin = () => {
    // Perform login authentication here
    // After success, navigate to the tabs layout
    router.replace('/(tabs)'); 
  };

  return (
    <ImageBackground  
      source={require('../assets/images/login_bg.png')} // Path to your background image
      style={styles.backgroundImage} // Style for the background image
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the App</Text>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </ImageBackground>
  );
}

// This is where we remove the header for this screen.
LoginScreen.options = {
  headerShown: false, // Hide the header for this screen
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff', // Adjust color based on your background for readability
  },
  backgroundImage: {
    flex: 1, // This will make the background image cover the entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize:'content'
  },
});
