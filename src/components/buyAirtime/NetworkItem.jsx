import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import MyCard from '../global/MyCard';
import { Theme } from '../../constants/Theme';

const theme = Theme();
export default function NetworkItem({ active, item, onPress }) {
  return (
    <MyCard style={[styles.container, active === item.id && styles.active]}>
      <TouchableOpacity onPress={onPress}>
        <Image source={item?.image} style={styles.image} alt="Logo" />
      </TouchableOpacity>
    </MyCard>
  );
}

const height = theme.window.windowWidth > 600 ? 100 : 60;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 10,
    overflow: 'hidden',
    opacity: 0.9,
    height,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  active: {
    borderWidth: 2,
    borderColor: theme.palette.primary,
    opacity: 1,
    height,
  },
  image: {
    resizeMode: 'contain',
    width: height,
    height,
  },
});
