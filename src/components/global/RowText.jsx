import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Row from './Row';
import Title from './Title';
import Divider from './Divider';

export default function RowText({ header, title }) {
  return (
    <>
      <Divider />
      <Row style={{ justifyContent: 'space-between', marginTop: 5 }}>
        <Title style={styles.text} text={header} small bold position="left" />
        <Title style={styles.text} text={title} small position="end" />
      </Row>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    maxWidth: '50%',
  },
});
