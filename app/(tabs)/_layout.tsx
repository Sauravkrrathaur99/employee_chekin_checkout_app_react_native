// import { Tabs } from 'expo-router';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaView } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useState, useEffect } from 'react'; // For managing authentication state
// import { useRouter } from 'expo-router'; // To handle redirection
// import LoadingScreen from '../../components/LoadingScreen';
// import LoginScreen from '../login'; // Correct relative path to LoginScreen

// export default function TabLayout() {
//   const insets = useSafeAreaInsets();
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
//   const [isLoading, setIsLoading] = useState(true); // State to manage loading screen
//   const router = useRouter();

//   // Simulate fetching login status (replace with actual logic)
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const loggedIn = false; // Replace with actual login check
//       setIsLoggedIn(loggedIn);
//       setIsLoading(false);
//     };
//     checkLoginStatus();
//   }, []);

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   if (!isLoggedIn) {
//     return <LoginScreen setIsLoggedIn={setIsLoggedIn} />; // Pass setIsLoggedIn to LoginScreen
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
//       <StatusBar style="auto" />
//       <Tabs screenOptions={{ headerShown: false }}>
//         <Tabs.Screen
//           name="history"
//           options={{
//             title: 'History',
//             tabBarIcon: ({ color }) => (
//               <IconSymbol size={28} name="clock.fill" color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="index"
//           options={{
//             title: 'Home',
//             tabBarIcon: ({ color }) => (
//               <IconSymbol size={28} name="house.fill" color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="user"
//           options={{
//             title: 'User',
//             tabBarIcon: ({ color }) => (
//               <IconSymbol size={28} name="person.fill" color={color} />
//             ),
//           }}
//         />
//       </Tabs>
//     </SafeAreaView>
//   );
// }



import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Persistent Storage
import LoadingScreen from '../../components/LoadingScreen';
import LoginScreen from '../login';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const router = useRouter();

  // Check stored token or session to verify login status
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken'); // Get token from storage
        console.log("token in the layout", token);

        if (token) {
          console.log("token received");
          setIsLoggedIn(true); // User is logged in
          console.log("token received logged in successfully");
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
      setIsLoading(false); // Stop loading
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/(tabs)'); // Redirect to index page after login
    }
  }, [isLoggedIn]);

  // Logout function (optional)
  const logout = async () => {
    await AsyncStorage.removeItem('accessToken'); // Clear token
    setIsLoggedIn(false); // Update state
    router.replace('/login'); // Redirect to login page
  };

  // Show loading screen while checking login status
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If not logged in, render login screen
  if (!isLoggedIn) {
    return <LoginScreen setIsLoggedIn={setIsLoggedIn} />;
  }

  // Render tabs if logged in
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <StatusBar style="auto" />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="clock.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            title: 'User',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}