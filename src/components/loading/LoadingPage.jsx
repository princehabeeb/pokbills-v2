import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Theme } from '../../constants/Theme';
import Loader from './Loading';

const theme = Theme();
export default function LoadingPage({ show, containerStyle }) {
  return (
    <View
      style={{
        display: show ? 'flex' : 'none',
        zIndex: 300,
        backgroundColor: theme.palette.white,
        position: 'absolute',
        top: 0,
        height: theme.window.windowHeight,
        width: theme.window.windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        ...containerStyle,
      }}
    >
      <Loader />
    </View>
  );
}

const styles = StyleSheet.create({});
