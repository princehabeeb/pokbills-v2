import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../components/global/Header';
import Title from '../../components/global/Title';
import PaymentOptions from '../../components/fundWallet/PaymentOption';

const PaymentPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <Header back />

        <Title text="Fund Wallet" header />
        <View style={styles.innerContainer}>
          <Title
            text="Select one of the options below to fund your wallet"
            style={{ marginBottom: 20 }}
          />
          <PaymentOptions
            header="Bank Transfer"
            title="Pay with automatic bank transfer and get credited on your wallet instantly"
            onclick={() => navigation.navigate('bankTransferPage')}
          />
          {/* <PaymentOptions
            header="Card Payment"
            title="Make payment with your debit card, Visa, Verb or Mastercard"
            onclick={() => navigation.navigate('cardPaymentPage')}
          /> */}
          <PaymentOptions
            header="Manual Funding"
            title="Transfer money directly to admin and send him proof of payment to get credited"
            onclick={() => navigation.navigate('manualFundingPage')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
