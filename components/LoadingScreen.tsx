import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated } from 'react-native';

export default function LoadingScreen() {
  const spinValue = new Animated.Value(0);

  // Animation for rotation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </Animated.View>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    color: '#4A90E2',
  },
});
