import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';

import Header from '../../components/global/Header';
import Title from '../../components/global/Title';
import { Theme } from '../../constants/Theme';
import PaymentOptions from '../../components/fund/PaymentOption';
import { useNavigation } from '@react-navigation/native';
import SecondaryHeader from '../../components/global/SecondaryHeader';

const theme = Theme();
const FundWalletPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <SecondaryHeader text="Add Money" />
        <View style={styles.innerContainer}>
          <PaymentOptions
            header="Bank Transfer"
            title="Pay with automatic bank transfer and get credited on your wallet instantly"
            onclick={() => navigation.navigate('bankTransferPage')}
          />

          <PaymentOptions
            header="Manual Transfer"
            title="Transfer money directly to admin and send him proof of payment to get credited"
            onclick={() => navigation.navigate('manualFundingPage')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default FundWalletPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {},
});
