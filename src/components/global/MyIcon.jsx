import { StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Theme } from '../../constants/Theme';

const theme = Theme();
const MyIcon = ({ name, style, size, color, material }) => {
  if (material) {
    return (
      <Icon
        name={name}
        size={size ? size : 30}
        color={color ? color : theme.palette.black}
        style={style}
      />
    );
  }

  return (
    <Ionicons
      name={name}
      size={size ? size : 30}
      color={color ? color : theme.palette.black}
      style={style}
    />
  );
};

export default MyIcon;

const styles = StyleSheet.create({});
