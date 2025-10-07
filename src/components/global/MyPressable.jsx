import { Pressable, StyleSheet, Vibration } from 'react-native';
import React from 'react';

const MyPressable = ({ children, style, onPress }) => {
  const handlePress = () => {
    Vibration.vibrate(50);
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        { transform: [{ scale: pressed ? 0.95 : 1 }] },
        style,
      ]}
      onPress={handlePress}
    >
      {children}
    </Pressable>
  );
};

export default MyPressable;

const styles = StyleSheet.create({});
