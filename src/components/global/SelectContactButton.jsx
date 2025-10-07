import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Users } from 'react-native-feather';

import Row from './Row';
import Title from './Title';
import { Theme } from '../../constants/Theme';
import MyPressable from './MyPressable';

const theme = Theme();
export default function SelectContactButton({ onPress, style, text }) {
  return (
    <MyPressable onPress={onPress}>
      <Row style={[styles.container, style]}>
        <Title
          text={text ? text : 'Select From Contact'}
          color={theme.palette.white}
        />
        <Users color={theme.palette.white} />
      </Row>
    </MyPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.primary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
});
