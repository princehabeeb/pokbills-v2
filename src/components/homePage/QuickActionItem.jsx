import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import MyIcon from '../global/MyIcon';
import Title from '../global/Title';
import { Theme } from '../../constants/Theme';

const theme = Theme();
export default function QuickActionItem({
  title,
  icon,
  onPress,
  material,
  children,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && (
        <MyIcon
          name={icon}
          color={theme.palette.primary}
          size={theme.window.windowWidth > 600 ? 40 : 25}
          material={material}
        />
      )}
      {children}
      <Title text={title} small />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    width: theme.window.windowWidth / 4.6,
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
  },
});
