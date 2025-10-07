import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Title from './Title';
import { Theme } from '../../constants/Theme';
import { useNavigation } from '@react-navigation/native';

const theme = Theme();

const NetworkStatusButton = ({ type }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.networkButton}
      onPress={() => navigation.navigate('network status', { type: type })}
    >
      <Title text="View Network Status" small position="left" link bold />
      <Title
        text="Check Network Status Before Purchase"
        small
        position="left"
      />
    </Pressable>
  );
};

export default NetworkStatusButton;

const styles = StyleSheet.create({
  networkButton: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: theme.palette.gray,
    borderRadius: 10,
    padding: 10,
  },
});
