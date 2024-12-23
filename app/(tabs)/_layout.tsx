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
