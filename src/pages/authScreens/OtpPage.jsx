import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Theme } from '../../constants/Theme';
import Title from '../../components/global/Title';
import OtpInput from '../../components/global/OtpInput';
import MyButton from '../../components/global/Mybutton';
import { useNavigation } from '@react-navigation/native';
import { verifyOtp } from '../../store/apis/api';
import { ConfirmEmailOtp } from '../../store/apis/auth';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

//reset password
const theme = Theme();
export default function OtpPage({ route }) {
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const { email } = route.params;
  const [loading, setLoading] = useState(false);

  const handleCodeChange = (newCode) => {
    setError('');
    setCode(newCode);
  };

  const handleSubmit = async () => {
    setError('');
    if (code.length !== 4) {
      setError('Please enter the 5 digits code');
      return;
    }

    setLoading(true);
    const response = await ConfirmEmailOtp({ email, otp: code });
    setLoading(false);

    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Wrong OTP',
        textBody: response?.message ?? response?.msg,
        button: 'close',
      });
      return;
    }

    if (response.status === 'success') {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'OTP Verified Successfully',
        textBody: response?.message ?? response?.msg,
        button: 'close',
      });

      navigation.navigate('changePassword', {
        email,
        otp: code,
      });
    }
  };

  useEffect(() => {
    if (code.length === 4) {
      handleSubmit();
    }
  }, [code]);

  return (
    <View style={styles.container}>
      <Title
        text={`Enter the OTP sent to this email`}
        style={{ color: theme.palette.black }}
      />
      <Title text={email} bold color={theme.palette.primary} />
      <View style={styles.inputContainer}>
        <OtpInput count={4} onChange={handleCodeChange} code={code} />
      </View>
      {error && <Title text={error} style={styles.errorText} />}
      <MyButton text={'Submit'} onPress={handleSubmit} isLoading={loading} />
      <TouchableOpacity>
        {/* <Title text="Send Another Code" link /> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.white,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '100%',
    padding: theme.window.windowWidth * 0.05,
  },
  inputContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: theme.palette.white,
  },
  errorText: {
    marginTop: -20,
    color: theme.palette.red,
  },
});
