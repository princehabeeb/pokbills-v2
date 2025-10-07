import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Theme } from '../../constants/Theme';
import MyIcon from './MyIcon';
import Loader from '../loading/Loading';
import MyPressable from './MyPressable';

const theme = Theme();
const TransparentButton = ({
  text,
  onPress,
  style,
  background,
  color,
  iconButton,
  iconColor,
  isLoading,
  borderColor,
}) => {
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Loader />
      </View>
    );
  }

  return (
    <MyPressable
      onPress={onPress}
      style={[
        styles.container,
        background && { backgroundColor: background },
        { borderColor: borderColor ? borderColor : theme.palette.primary },
        style,
      ]}
    >
      {!iconButton && (
        <Text style={[styles.text, color && { color }]}>{text}</Text>
      )}
      {iconButton && (
        <MyIcon
          name={iconButton}
          color={iconColor ? iconColor : theme.palette.white}
        />
      )}
    </MyPressable>
  );
};

export default TransparentButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderWidth: 2,

    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
    height: 50,
  },
  text: {
    color: theme.palette.primary,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loading: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow,
    borderRadius: 8,
    paddingVertical: 20,
    margin: 10,
    backgroundColor: theme.palette.gray,
    height: 50,
  },
});
