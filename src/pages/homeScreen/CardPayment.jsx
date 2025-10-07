import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';

import Title from '../../components/global/Title';
import Notice from '../../components/global/Notice';
import Row from '../../components/global/Row';
import CardPaymentForm from '../../components/fund/CardPaymentForm';

export default function CardPaymentPage() {
  return (
    <View style={styles.container}>
      <Title text="Card Payment" header />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Title text="Fill the following input fields correctly for making the transaction." />
          <Notice text="make sure you have enough balance in your bank" />
          <Row center>
            <Image
              source={require('../../assets/mastercard.png')}
              style={styles.image}
            />
          </Row>
          <CardPaymentForm />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    marginTop: 30,
  },
  image: {
    height: 100,
    resizeMode: 'contain',
  },
});
