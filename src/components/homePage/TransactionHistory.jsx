import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Title from '../global/Title';
import Divider from '../global/Divider';
import TransactionItem from './TransactionItem';

export default function TransactionHistory() {
  return (
    <View style={styles.container}>
      <Title header text="Transaction History" position="start" />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
      <TransactionItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
