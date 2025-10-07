import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import NetworkSection from '../../components/buyAirtime/NetworkSection';
import FormSection from '../../components/buyAirtime/FormSection';
import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { useSelector } from 'react-redux';

const theme = Theme();
const BuyAirtimePage = () => {
  const { contact } = useSelector((state) => state.globalState);
  const [network, setNetwork] = useState(0);

  useEffect(() => {
    setNetwork(contact?.network);
  }, [contact?.network]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SecondaryHeader text="Buy Airtime" />
        <NetworkSection active={network} setActive={setNetwork} />
        <FormSection network={network} />
      </ScrollView>
    </View>
  );
};

export default BuyAirtimePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.window.windowWidth > 600 ? 20 : 10,
    backgroundColor: theme.palette.white,
  },
});
