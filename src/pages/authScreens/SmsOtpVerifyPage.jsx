import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';

import Title from '../../components/global/Title';
import OtpInput from '../../components/global/OtpInput';
import MyButton from '../../components/global/Mybutton';
import { Theme } from '../../constants/Theme';
import { ConfirmSmsOtp, LoginUser, SendSmsOtp } from '../../store/apis/auth';
import { StoreData } from '../../constants/storage';
import { performSuccessfulLogin } from '../../components/auth/useSuccessufulLogin';
import { loginUser } from '../../store/globalState';
import { useDispatch } from 'react-redux';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Row from '../../components/global/Row';

const theme = Theme();

export default function SmsOtpVerifyPage({ route }) {
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { number, type, password, ref } = route.params;
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const handleCodeChange = (newCode) => {
    setError('');
    setCode(newCode);
  };

  const handleSubmit = async () => {
    setError('');
    if (code.length !== 5) {
      setError('Please enter the 5 digits code');
      return;
    }

    setLoading(true);
    //verify otp
    const response = await ConfirmSmsOtp({ otp: code, phone: number, ref });
    if (response?.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Login Failed',
        textBody: response?.message,
        button: 'close',
      });
      setLoading(false);
      return;
    }
    //save otp to device
    await StoreData('deviceToken', response.response.devicetoken);

    //login the user
    const user = await LoginUser({
      phone: number,
      password: password,
      devicetoken: response.response.devicetoken,
    });

    if (user?.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Login Failed',
        textBody: user?.message,
        button: 'close',
      });
      return;
    }
    const newUser = await performSuccessfulLogin({ response: user });
    dispatch(loginUser(newUser));
    setLoading(false);
    await StoreData('pas', password);
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('set up pin page');
  };

  useEffect(() => {
    if (code.length === 5) {
      handleSubmit();
    }
  }, [code]);

  const startResendTimer = () => {
    setIsResendDisabled(true);
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  async function handleResendOTP() {
    setLoading(true);
    const response = await SendSmsOtp({ phone: number });
    setLoading(false);

    if (response?.status === 'success') {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'OTP Sent Successfully',
        textBody: response?.message,
        button: 'close',
      });
      startResendTimer();
      return;
    }

    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'OTP Send Failed',
      textBody: response?.message,
      button: 'close',
    });
  }

  return (
    <View style={styles.container}>
      <Title text="Verify Phone Number" header />
      <Image
        source={require('../../assets/lottie/sms.gif')}
        style={styles.image}
      />
      <Title text="Enter the OTP send to your phone number or email" />
      <View style={styles.inputContainer}>
        <OtpInput onChange={handleCodeChange} code={code} />
      </View>
      {error && <Title text={error} style={{ color: theme.palette.red }} />}
      <View style={{ width: '100%' }}>
        <MyButton
          text="Verify OTP"
          style={[styles.button, loading && styles.isLoading]}
          onPress={handleSubmit}
          isLoading={loading}
        />
        {/* {isResendDisabled ? (
          <Title text={`Resend OTP in ${resendTimer} seconds`} />
        ) : (
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={handleResendOTP}
            disabled={isResendDisabled}
          >
            <Row style={{ justifyContent: 'center' }}>
              <Title text="Didn't receive OTP?" />
              <Title text="Resend" link />
            </Row>
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    height: 200,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
  },
  // button: {
  //   width: '83%',
  // },
  // isLoading: {},
});
