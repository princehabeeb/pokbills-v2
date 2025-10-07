import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '../../constants/Theme';
import Title from '../../components/global/Title';
import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/Mybutton';
import Row from '../../components/global/Row';
import { SendEmailOtp } from '../../store/apis/auth';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

//reset password
const theme = Theme();
const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [responseError, setResponseError] = useState('');
  const [isLoading, setLoading] = useState(false);

  function handleEmailChange(e) {
    setError('');
    setEmail(e);
  }

  async function handleProceed() {
    setError('');
    setResponseError('');
    if (!email) {
      setError('Email cannot be empty');
      return;
    }
    setLoading(true);
    const response = await SendEmailOtp({ email });
    setLoading(false);

    console.log(response);

    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'OTP Sent Fail',
        textBody: response?.message ?? response?.msg,
        button: 'close',
      });
      return;
    }

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'OTP Sent Successfully',
      textBody: response?.message ?? response?.msg,
      button: 'close',
    });

    navigation.navigate('otpPage', {
      email,
    });
  }

  function handleRegister() {
    navigation.navigate('loginPage', {
      islogin: false,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../../assets/icon.png')} style={styles.image} />
        <Title text="Refresh Password" header />
        <Title text="Please Enter your Email!" style={styles.title} />
        <MyInput
          text="Email"
          icon="mail"
          value={email}
          type="email-address"
          onChangeText={handleEmailChange}
          error={error}
        />
        {responseError && <Title text={responseError} error />}
        <MyButton
          text={'Proceed'}
          style={styles.button}
          isLoading={isLoading}
          onPress={handleProceed}
        />
        <Pressable onPress={handleRegister}>
          <Row>
            <Title text="Don't have an account?" position={'left'} />
            <Title text="Register" position={'left'} link />
          </Row>
        </Pressable>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.white,
  },
  topContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    height: theme.window.windowHeight / 3,
  },
  backgroundImage: {
    flex: 1,
  },
  image: {
    resizeMode: 'contain',
    height: 100,
    alignSelf: 'center',
  },
  bottomContainer: {
    flex: 1,
    zIndex: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: theme.palette.white,
    transform: [
      {
        translateY: -20,
      },
    ],
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    marginTop: 20,
  },
  button: {
    width: '100%',
  },
  scrollView: {
    flexGrow: 1,
  },
});
