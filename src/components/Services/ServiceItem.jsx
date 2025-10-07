import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import MyCard from '../global/MyCard';
import MyIcon from '../global/MyIcon';
import Title from '../global/Title';
import { Theme } from '../../constants/Theme';

const theme = Theme();
export default function ServiceItem({ item, onPress }) {
  return (
    <MyCard style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.innerContainer}>
        <MyIcon name={item.icon} color={theme.palette.primary} />
        <Title text={item.name} small />
      </TouchableOpacity>
    </MyCard>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.window.windowWidth > 600 ? 10 : 5,
    width: theme.window.windowWidth > 600 ? 100 : 90,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: theme.palette.white,
  },
  innerContainer: {
    alignItems: 'center',
  },
});
