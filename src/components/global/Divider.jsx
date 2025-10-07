import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Theme } from '../../constants/Theme';

const theme = Theme();
export default function Divider() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: theme.palette.gray,
    borderTopColor: 'transparent',
    margin: 10,
    alignSelf: 'center',
  },
});
