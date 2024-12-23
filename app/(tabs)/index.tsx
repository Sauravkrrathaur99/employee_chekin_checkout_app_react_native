import React, { useState, useEffect } from 'react';
import { AppState, Image, StyleSheet, View, Text, Dimensions, ScrollView, PermissionsAndroid } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // For timer icon
import NetInfo from '@react-native-community/netinfo';
import { useRouter } from 'expo-router';

const username = 'Saurav Kumar Rathaur';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default function HomeScreen() {
  const [workTime, setWorkTime] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [networkType, setNetworkType] = useState('');
  const [appState, setAppState] = useState(AppState.currentState);
  const [ssid, setSsid] = useState('');
  const router = useRouter();

  // Define the handleAppStateChange function
  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      console.log('App is in foreground');
    } else if (nextAppState === 'background') {
      console.log('App is in the background');
      // Log the network connectivity status when the app goes into the background
      console.log('Network connectivity status');
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    // Request permission on mount (only for Android)
    requestPermission();
    // Listen for changes in app state (foreground/background)
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    const interval = setInterval(() => {
      setWorkTime((prev) => prev + 1);
    }, 1000);

    const getCurrentDate = () => {
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      const date = new Date().toLocaleDateString('en-US', options);
      setCurrentDate(date);
    };

    getCurrentDate();

    // Network Connectivity
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log(state); // Log the entire state object to check for available properties
      setIsConnected(state.isConnected);
      setNetworkType(state.type);

      // If connected to WiFi, fetch the SSID
      if (state.isConnected && state.type === 'wifi') {
        // Try to fetch SSID
        const ssid = state.details.ssid;
        if (ssid) {
          setSsid(ssid); // Set SSID if available
        } else {
          setSsid(''); // Show if SSID is not available
        }
      } else {
        setSsid(''); // Clear SSID when not connected to WiFi
      }
      // Track network disconnection and reconnection
      if (!state.isConnected) {
        setIsConnecting(true);  // Network lost, show "Connecting..."
      } else {
        setIsConnecting(false);  // Network is back, stop showing "Connecting..."
      }
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
      appStateListener.remove(); // Clean up the app state listener
    };
  }, [appState]);

  // Match SSID to custom text
  const getConnectionText = () => {
    if (networkType === 'wifi' && ssid) {
      switch (ssid) {
        case 'Airtel_! Jai Shree Krishna !':
          return 'Connected via SuperTech';
        case 'Onelogica_5G':
          return 'Connected via Onelogica';
        case 'MishiTech5G':
          return 'Connected via MishiTech';
        default:
          return `Connected via ${ssid}`;
      }
    }

    if (networkType === 'cellular') {
      return 'Please be in your corporate network';
    }

    return 'No Internet Connection, connect to your corporate network';
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.topSection}>
        <Text style={styles.headerText}>Welcome, {username}</Text>
        <Image
          source={require('@/assets/images/image_checkincheckout_home.png')}
          style={styles.reactLogo}
        />
      </View>

      <View style={styles.cylindricalBox}>
        <Text style={styles.dateText}>{currentDate}</Text>
        <MaterialCommunityIcons name="timer" size={screenWidth * 0.06} color="skyblue" />
        <Text style={styles.workTimeText}>{formatTime(workTime)}</Text>
      </View>

      {/* Display Network Connectivity Status */}
      <View style={styles.statusCylindricalBox}>
        <View style={styles.iconTextContainer}>
          <MaterialCommunityIcons
            name={networkType === 'wifi' ? 'wifi' : 'cellphone'} // Show wifi or mobile icon
            size={screenWidth * 0.06}
            color="skyblue"
          />
          <Text style={styles.statusText}>
            {isConnecting ? (
              'Connecting to your network...'
            ) : (
              getConnectionText()
            )}
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.boxesContainer}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.box}>
              <Image
                source={require('@/assets/images/set_location_attendance.png')}
                style={styles.boxImage}
              />
              <Text style={styles.boxText}>Box {item}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    height: screenHeight * 0.30,
    backgroundColor: '#0F1C3E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: screenWidth * 0.040,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 1,
  },
  reactLogo: {
    width: screenWidth * 0.52,
    height: screenWidth * 0.52,
    resizeMode: 'contain',
  },
  cylindricalBox: {
    width: '90%',
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.04,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    zIndex: 1,
  },
  dateText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: 'black',
  },
  workTimeText: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    color: 'orange',
  },
  statusCylindricalBox: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 1,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: screenWidth * 0.03,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomSection: {
    flex: 1,
    padding: 16,
  },
  boxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  boxImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  boxText: {
    marginTop: 8,
    fontSize: screenWidth * 0.040,
    fontWeight: 'bold',
  },
});
