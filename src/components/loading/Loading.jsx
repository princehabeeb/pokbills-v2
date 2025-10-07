import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Theme } from '../../constants/Theme';

const theme = Theme();
export default function Loader({ style, containerStyle }) {
  return (
    <Image
      source={require('../../assets/loader.gif')}
      style={[{ width: 50, height: 50 }, style]}
    />
  );
}

const styles = StyleSheet.create({});
