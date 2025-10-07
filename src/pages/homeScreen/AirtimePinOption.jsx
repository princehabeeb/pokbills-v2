import { StyleSheet, View } from 'react-native';
import React from 'react';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PinScreenCard from '../../components/pinScreens/PinScreenCard';
import { useNavigation } from '@react-navigation/native';

const theme = Theme();
export default function AirtimePinOption() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SecondaryHeader text="Buy Airtime Pin" />

      <PinScreenCard
        subheader={'Purchase new Airtime pin'}
        header={'Buy new pin'}
        onPress={() => navigation.navigate('airtime pin page')}
      />

      <PinScreenCard
        header={'Purchased pin'}
        subheader={'View all purchased pins'}
        cart
        onPress={() => navigation.navigate('airtime pin history')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.window.windowWidth * 0.05,
    backgroundColor: theme.palette.white,
  },
});
