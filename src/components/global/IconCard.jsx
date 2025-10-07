import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React from 'react';
import MyIcon from './MyIcon';

import { Theme } from '../../constants/Theme';

const theme = Theme();

const IconCard = ({
  name,
  onPress,
  style,
  color,
  title,
  size,
  children,
  iconColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        color && { backgroundColor: color },
        { ...style },
      ]}
      onPress={onPress}
    >
      <View>
        <MyIcon
          name={name}
          color={iconColor ? iconColor : theme.palette.primary}
          style={{ textAlign: 'center' }}
          size={size ? size : theme.window.windowWidth > 600 ? 50 : 25}
        />
        {title && <Text style={{ textAlign: 'center' }}>{title}</Text>}
        {children && children}
      </View>
    </TouchableOpacity>
  );
};

export default IconCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.gray,
    borderRadius: 10,
    elevation: 2,
    ...theme.shadow,
    width: theme.window.windowWidth > 600 ? 70 : 40,
    height: theme.window.windowWidth > 600 ? 70 : 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginRight: theme.window.windowWidth > 400 ? 0 : -2,
    zIndex: 10,
  },
});
