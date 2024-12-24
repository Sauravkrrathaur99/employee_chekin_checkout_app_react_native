// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
// import { useRouter } from 'expo-router';


// export default function LoginScreen() {
//   const router = useRouter();

//   // Handle login button click
//   const handleLogin = () => {
//     // Perform login authentication here (e.g., Microsoft login)
//     // After success, navigate to the tabs layout
//     router.replace('/(tabs)');
//   };

//   return (
//     <ImageBackground  
//       source={require('../assets/images/login_bg.png')} // Path to your background image
//       style={styles.backgroundImage} // Style for the background image
//     >
//       <View style={styles.container}>
//         {/* Fun and Modern Welcome Message */}
//         <Text style={styles.title}>Welcome to eSathi!</Text>
//         <Text style={styles.subtitle}>Your Personal Work Companion is here!</Text>

//         {/* Microsoft login button */}
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Image
//             source={require('../assets/images/Microsoft_Logo_512px.png')} // Custom Microsoft logo image
//             style={styles.icon}
//           />
//           <Text style={styles.buttonText}>Sign in with Microsoft</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// // This is where we remove the header for this screen.
// LoginScreen.options = {
//   headerShown: false, // Hide the header for this screen
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 30,
//     marginBottom: 10,
//     color: '#fff', // Adjust color for readability
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 40,
//     color: '#fff', // Adjust color for readability
//     textAlign: 'center',
//   },
//   backgroundImage: {
//     flex: 1, // This will make the background image cover the entire screen
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundSize: 'cover',
//   },
//   button: {
//     backgroundColor: '#0078D4', // Microsoft blue color
//     paddingVertical: 12,
//     paddingHorizontal: 15, // Horizontal padding for some space
//     borderRadius: 8,
//     alignItems: 'center',
//     flexDirection: 'row', // Align image and text side by side
//     justifyContent: 'center', // Center the content horizontally
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5, // For Android shadow
//     width: 'auto', // Make width responsive to content
//   },
//   icon: {
//     width: 20, // Set the width of the icon
//     height: 20, // Set the height of the icon
//     marginRight: 10, // Space between the icon and the text
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: '600',
//   },
// });



import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useRouter } from 'expo-router';

// Your app's Azure details
const clientId = '68a4e767-34b2-41e5-b4c7-59578dae21b8'; // Your Application (client) ID
const tenantId = '1de61f46-fc12-4067-ab1d-147eb7e21025'; // Your Directory (tenant) ID
const redirectUri = 'msauth://com.myapp/M61nf%2BaC69kCXmFY1ejcX83rDNc%3D';

const discoveryUrl = `https://login.microsoftonline.com/${tenantId}/v2.0/.well-known/openid-configuration`;
const authorizationEndpoint = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';

export default function LoginScreen() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  // Set up the auth request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email', 'offline_access'], // Required scopes
      redirectUri,
    },
    { authorizationEndpoint, tokenEndpoint: `${discoveryUrl}/token` }
  );

  // Handle authentication response
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token, id_token } = response.params;
      setToken(access_token); // Store the access token (or id_token)
      console.log('Access Token:', access_token);
      console.log('ID Token:', id_token);
      
      // Redirect to the next screen after successful login
      router.replace('/(tabs)');
    }
  }, [response]);

  // Handle login button click
  const handleLogin = () => {
    promptAsync();
  };

  return (
    <ImageBackground  
      source={require('../assets/images/login_bg.png')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to eSathi!</Text>
        <Text style={styles.subtitle}>Your Personal Work Companion is here!</Text>

        {/* Microsoft login button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Image
            source={require('../assets/images/Microsoft_Logo_512px.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Sign in with Microsoft</Text>
        </TouchableOpacity>

        {/* Conditionally render the success message */}
        {token}
      </View>
    </ImageBackground>
  );
}

// This is where we remove the header for this screen.
LoginScreen.options = {
  headerShown: false,
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
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#fff',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0078D4',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  successMessage: {
    marginTop: 20,
    fontSize: 16,
    color: '#00C853', // Green color for success message
    fontWeight: 'bold',
  },
});
