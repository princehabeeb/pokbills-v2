import { StyleSheet, View } from 'react-native';
import React from 'react';

import MyInput from '../global/MyInput';
import Row from '../global/Row';
import MyButton from '../global/Mybutton';

export default function CardPaymentForm() {
  return (
    <View style={styles.container}>
      <MyInput text="Card Number" icon="card" />
      <MyInput text="Card Holder Name" icon="person" />
      <Row center>
        <MyInput
          style={styles.rowInputs}
          text="Expiry Date (mm/yyyy)"
          icon="calendar"
        />
        <MyInput style={styles.rowInputs} text="CVV" icon="card" />
      </Row>
      <MyInput text="Amount you want to add " icon="wallet" />
      <MyButton text="Pay" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
  },
  rowInputs: {
    flex: 1,
    marginRight: 5,
  },
});
