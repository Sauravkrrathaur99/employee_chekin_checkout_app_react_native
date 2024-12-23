// import { Tabs } from 'expo-router';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaView } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useState, useEffect } from 'react'; // For managing authentication state
// import { useRouter } from 'expo-router'; // To handle redirection
// import LoadingScreen from '../../components/LoadingScreen';


// export default function TabLayout() {
//   const insets = useSafeAreaInsets();
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
//   const [isLoading, setIsLoading] = useState(true); // State to manage loading screen
//   const router = useRouter();

//   // Simulate fetching login status (replace with actual logic)
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       // Check if user is authenticated (replace with your actual authentication logic)
//       const loggedIn = false; // Replace with your logic (e.g., check token, session)
//       setIsLoggedIn(loggedIn);
//       setIsLoading(false); // Stop loading after checking login status
//     };
//     checkLoginStatus();
//   }, []);

//   // If still loading, show the loading screen
//   if (isLoading) {
//     return <LoadingScreen />; // Show a loading screen while checking the login status
//   }

//   // If not logged in, redirect to login screen
//   if (!isLoggedIn) {
//     router.push('/login');
//     return null; // Optionally show a loading state or nothing while redirecting
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

// import { Tabs } from 'expo-router';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaView } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useState, useEffect } from 'react'; // For managing authentication state
// import { useRouter } from 'expo-router'; // To handle redirection
// import LoadingScreen from '../../components/LoadingScreen';

// export default function TabLayout() {
//   const insets = useSafeAreaInsets();
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
//   const [isLoading, setIsLoading] = useState(true); // State to manage loading screen
//   const router = useRouter();

//   // Simulate fetching login status (replace with actual logic)
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       // Check if user is authenticated (replace with your actual authentication logic)
//       const loggedIn = false; // Replace with your logic (e.g., check token, session)
//       setIsLoggedIn(loggedIn);
//       setIsLoading(false); // Stop loading after checking login status
//     };
//     checkLoginStatus();
//   }, []);

//   // If still loading, show the loading screen
//   if (isLoading) {
//     return <LoadingScreen />; // Show a loading screen while checking the login status
//   }

//   // If not logged in, redirect to login screen (ensure this happens after rendering)
//   useEffect(() => {
//     if (!isLoggedIn) {
//       router.push('/login');
//     }
//   }, [isLoggedIn, router]);

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
import { useState, useEffect } from 'react'; // For managing authentication state
import { useRouter } from 'expo-router'; // To handle redirection
import LoadingScreen from '../../components/LoadingScreen';
import LoginScreen from '../login'; // Correct relative path to LoginScreen

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [isLoading, setIsLoading] = useState(true); // State to manage loading screen
  const router = useRouter();

  // Simulate fetching login status (replace with actual logic)
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = false; // Replace with actual login check
      setIsLoggedIn(loggedIn);
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return <LoginScreen setIsLoggedIn={setIsLoggedIn} />; // Pass setIsLoggedIn to LoginScreen
  }

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
