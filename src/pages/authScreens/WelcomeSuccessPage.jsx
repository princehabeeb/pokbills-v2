import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MyButton from '../../components/global/Mybutton';
import Title from '../../components/global/Title';
import { Theme } from '../../constants/Theme';
import { useSelector } from 'react-redux';

const theme = Theme();
export default function WelcomeSuccessPage() {
  const { user } = useSelector((state) => state.globalState);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 20) }]}>
      <Image source={require('../../assets/3d/2.png')} style={styles.image} />
      <Image
        source={require('../../assets/icon2.png')}
        style={styles.logoImage}
      />

      <Title text={`Welcome to ${theme.appName}, ${user?.firstname}`} header />
      <Title text="Get ready to experience seamless financial transactions and convenient services, Start exploring now" />
      <MyButton
        text="continue"
        style={styles.button}
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
          navigation.replace('bottomTabs', { page: 'homePage' });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.window.windowWidth > 800 ? 20 : 10,
  },
  image: {
    width: '70%',
    height: 150,
    resizeMode: 'contain',
  },
  logoImage: {
    width: '60%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    width: '90%',
    transform: [{ translateX: 1 }],
  },
});
