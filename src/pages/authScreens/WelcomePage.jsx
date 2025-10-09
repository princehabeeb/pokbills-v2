import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Mybutton from '../../components/global/Mybutton';
import { Theme } from '../../constants/Theme';
import { GetData } from '../../constants/storage';
import Title from '../../components/global/Title';

const WelcomePage = () => {
  const [LoginInfoData, setLoginInfoData] = useState({
    useBio: false,
    usePin: false,
  });

  const theme = Theme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const getLoginInfo = async () => {
    const useBio = await GetData('use_biometric');
    const usePin = await GetData('use_login_pin');

    setLoginInfoData({
      useBio,
      usePin,
    });
  };

  useFocusEffect(() => {
    getLoginInfo();
  });

  const navigateToLogin = () => {
    navigation.navigate('loginV2');
  };

  const navigateToSignup = () => {
    navigation.navigate('loginPage', {
      islogin: false,
      LoginInfoData,
    });
  };

  const img = require('../../assets/background.jpg');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground source={img} style={styles.bgImage}>
        <View style={styles.topContainer}>
          <Image
            source={require('../../assets/icon2.png')}
            style={styles.image}
          />
        </View>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.bottomContainer}
        >
          <View style={[styles.innerBottomContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
          <Title
              text={'Welcome ' + theme.appName}
              header
              color={theme.palette.white}
            />
            <Mybutton text="Login" onPress={navigateToLogin} />
            <Mybutton text="Register" onPress={navigateToSignup} transparent />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
  },
  innerBottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  image: {
    marginTop: 7,
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default WelcomePage;
