import { StyleSheet, View } from 'react-native';
import React from 'react';

const Row = ({ children, style, center }) => {
  return (
    <View
      style={[styles.container, center && { justifyContent: 'center' }, style]}
    >
      {children}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
