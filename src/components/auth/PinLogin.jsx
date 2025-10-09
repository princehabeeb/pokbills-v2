import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Title from '../global/Title';
import OtpInput from '../global/OtpInput';
import { StackActions, useNavigation } from '@react-navigation/native';
import MyVirtualKeyBoard from '../global/VirtualKeyBoard';
import useGetAvatar from '../../hooks/useGetAvater';
import { Theme } from '../../constants/Theme';
import MyIcon from '../global/MyIcon';
import Row from '../global/Row';
import LoadingPage from '../loading/LoadingPage';
import { GetData } from '../../constants/storage';
import { LoginUser } from '../../store/apis/auth';
import { performSuccessfulLogin } from './useSuccessufulLogin';
import { loginUser } from '../../store/globalState';
import { StatusBar } from 'react-native';

const theme = Theme();
export default function PinLogin({
  handleBiometricAuth,
  togglePhoneNumber,
  useBio,
  support,
}) {
  const { user } = useSelector((state) => state.globalState);
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const avater = useGetAvatar();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const handleCodeChange = (newCode) => {
    setError('');
    if (newCode < 5) {
      return;
    }
    setCode(newCode);
  };

  const handleSubmit = async () => {
    setError('');

    if (code.length < 5) {
      setError('Please enter the 5 digits code');
      return;
    }

    const pin = await GetData('pin');
    const password = await GetData('pas');
    const phone = user?.phone;
    const devicetoken = await GetData('deviceToken');

    if (pin !== code) {
      setError('Incorrect Pin, Try again');
      return;
    }

    setLoading(true);

    const response = await LoginUser({
      phone,
      password,
      devicetoken,
    });

    if (response.status === 'success') {
      const newUser = await performSuccessfulLogin({ response });
      dispatch(loginUser(newUser));
      setLoading(false);
      navigation.dispatch(StackActions.popToTop());
      navigation.replace('bottomTabs', { page: 'homePage' });
    } else {
      // setSupport(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code.length === 5) {
      handleSubmit();
    }
  }, [code]);

  return (
    <View>
      <LoadingPage show={loading} />
      <ScrollView contentContainerStyle={[styles.container, { marginTop: insets.top + 10 }]}>
        <Image source={avater} style={styles.image} />
        <Title text={`Hello, ${user?.firstname}`} header />
        <Title
          text={`Sign in with your security PIN`}
          small
          color={theme.palette.grayDark}
        />
        <View style={styles.inputContainer}>
          <OtpInput
            password
            onChange={handleCodeChange}
            code={code}
            onFilled={handleSubmit}
          />
          <Title text={error} style={{ color: 'red' }} />
        </View>
        <View style={{ width: '100%' }}>
          <MyVirtualKeyBoard onPress={(val) => setCode(val)} />
          {useBio && support && (
            <TouchableOpacity
              onPress={handleBiometricAuth}
              style={[styles.fingerPrintButton]}
            >
              <MyIcon
                name="finger-print"
                iconStyle={styles.fingerPrintIcon}
                color={theme.palette.grayDark}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={{ marginTop: 15 }} onPress={togglePhoneNumber}>
          <Row>
            <Title text="Not you?" color={theme.palette.grayDark} bold />
            <Title text="Switch Account" link bold />
          </Row>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    minHeight: theme.window.windowHeight - 80,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
  },
  fingerPrintButton: {
    width: '22%',
    height: 60,
    position: 'absolute',
    bottom: -16,
    left: 55,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  fingerPrintIcon: {
    fontSize: 20,
  },
});
