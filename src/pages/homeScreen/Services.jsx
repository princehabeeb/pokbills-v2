import { StyleSheet, View } from 'react-native';
import React from 'react';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import QuickActions from '../../components/homePage/QuickActions';

const theme = Theme();
export default function Services() {
  return (
    <View style={styles.container}>
      <SecondaryHeader text="Services" />
      <QuickActions hideText />
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
