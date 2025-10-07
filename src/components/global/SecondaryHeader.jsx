import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';

import { Theme } from '../../constants/Theme';
import Row from './Row';
import MyIcon from './MyIcon';
import Title from './Title';
import Divider from './Divider';

const theme = Theme();
export default function SecondaryHeader({ text, hideBack }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Row style={styles.row}>
        {!hideBack && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.goBack()}
          >
            <MyIcon name="arrow-back" />
          </TouchableOpacity>
        )}
        <Title
          text={text}
          header
          style={styles.text}
          color={theme.palette.black}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.dispatch(StackActions.popToTop());
            navigation.replace('bottomTabs', { page: 'homePage' });
          }}
        >
          <MyIcon name="home" material />
        </TouchableOpacity>
      </Row>
      {/* <Divider /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    // marginTop: 2,
    marginTop: StatusBar.currentHeight,
  },
  icon: {
    backgroundColor: theme.palette.gray,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  text: {
    textTransform: 'capitalize',
  },
});
