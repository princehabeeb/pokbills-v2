import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import { Theme } from '../../constants/Theme';
import MyIcon from './MyIcon';
import Loader from '../loading/Loading';
import Title from './Title';
import MyPressable from './MyPressable';

const theme = Theme();
const MyButton = ({
  text,
  onPress,
  style,
  background,
  color,
  iconButton,
  iconColor,
  isLoading,
  transparent,
  iconStyle,
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
        transparent && styles.bottomButton,
        background && { backgroundColor: background },
        style,
      ]}
    >
      {!iconButton && (
        <Title
          text={text}
          color={theme.palette.white}
          style={color && { color }}
          bold
          uppercase
        />
      )}
      {iconButton && (
        <MyIcon
          name={iconButton}
          color={iconColor ? iconColor : theme.palette.white}
          style={iconStyle}
        />
      )}
    </MyPressable>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.primary,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow,
    borderRadius: 8,
    marginVertical: 10,
    height: 50,
  },
  text: {
    color: theme.palette.white,
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
    transform: [{ translateX: -10 }],
    backgroundColor: theme.palette.gray,
    height: 50,
  },
  bottomButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.palette.gray,
    elevation: 0,
  },
});
