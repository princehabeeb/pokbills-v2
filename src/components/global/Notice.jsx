import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Row from './Row';
import MyIcon from './MyIcon';
import Title from './Title';
import { Theme } from '../../constants/Theme';
import MyCard from './MyCard';

const theme = Theme();

export default function Notice({ text, guide }) {
  return (
    <MyCard style={styles.card}>
      <Title text={guide} small bold position="left" />

      <Title text={text} small bold position="left" />
    </MyCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 30,
    width: '100%',
    alignItems: 'flex-start',
  },
});

//  <Row center>
//    <MyIcon name="alert-circle" size={30} color={theme.palette.red} />
//    <Title text="Notice!" header color={theme.palette.black} position="start" />
//  </Row>;
