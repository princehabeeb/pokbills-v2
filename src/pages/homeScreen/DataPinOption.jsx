import { StyleSheet, View } from 'react-native';
import React from 'react';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import PinScreenCard from '../../components/pinScreens/PinScreenCard';

const theme = Theme();
export default function DataPinOption() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SecondaryHeader text="Buy Data Pin" />

      <PinScreenCard
        subheader={'Purchase new Data pin'}
        header={'Buy new pin'}
        onPress={() => navigation.navigate('data pin page')}
      />

      <PinScreenCard
        header={'Purchased pin'}
        subheader={'View all purchased pins'}
        cart
        onPress={() => navigation.navigate('data pin history')}
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
