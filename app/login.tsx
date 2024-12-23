import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';


export default function LoginScreen() {
  const router = useRouter();

  // Handle login button click
  const handleLogin = () => {
    // Perform login authentication here (e.g., Microsoft login)
    // After success, navigate to the tabs layout
    router.replace('/(tabs)');
  };

  return (
    <ImageBackground  
      source={require('../assets/images/login_bg.png')} // Path to your background image
      style={styles.backgroundImage} // Style for the background image
    >
      <View style={styles.container}>
        {/* Fun and Modern Welcome Message */}
        <Text style={styles.title}>Welcome to eSathi!</Text>
        <Text style={styles.subtitle}>Your Personal Work Companion is here!</Text>

        {/* Microsoft login button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Image
            source={require('../assets/images/Microsoft_Logo_512px.png')} // Custom Microsoft logo image
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Sign in with Microsoft</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    color: '#fff', // Adjust color for readability
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#fff', // Adjust color for readability
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1, // This will make the background image cover the entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
  },
  button: {
    backgroundColor: '#0078D4', // Microsoft blue color
    paddingVertical: 12,
    paddingHorizontal: 15, // Horizontal padding for some space
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row', // Align image and text side by side
    justifyContent: 'center', // Center the content horizontally
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    width: 'auto', // Make width responsive to content
  },
  icon: {
    width: 20, // Set the width of the icon
    height: 20, // Set the height of the icon
    marginRight: 10, // Space between the icon and the text
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});
