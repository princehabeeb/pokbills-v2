import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Theme } from '../../constants/Theme';

const theme = Theme();
export default function Title({
  text,
  position,
  header,
  small,
  style,
  link,
  uppercase,
  color,
  error,
  bold,
  textTransform,
  numberOfLines,
  ellipsizeMode,
}) {
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        styles.text,
        !position && { textAlign: position ? position : 'center' },
        header && styles.header,
        small && styles.small,
        color && { color },
        { ...style },
        link && styles.link,
        uppercase && { textTransform: 'uppercase' },
        error && { color: theme.palette.red },
        bold && { fontWeight: 'bold' },
        textTransform && { textTransform },
      ]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: theme.window.windowWidth > 400 ? 20 : 16,
    letterSpacing: 1.5,
    color: theme.palette.black,
  },
  header: {
    fontWeight: 'bold',
    fontSize: theme.window.windowWidth > 600 ? 30 : 20,
    color: theme.palette.primary,
  },
  small: {
    fontSize: theme.window.windowWidth > 400 ? 15 : 12,
    letterSpacing: 0,
  },
  link: {
    color: 'blue',
    marginLeft: 5,
  },
});
