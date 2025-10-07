import { StyleSheet } from 'react-native';
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { Theme } from '../../constants/Theme';

const theme = Theme();
const OtpInput = ({ onChange, code, onFilled, password, count }) => {
  return (
    <OTPInputView
      style={{ width: '80%' }}
      pinCount={count ?? 5}
      codeInputFieldStyle={styles.otpInput}
      codeInputHighlightStyle={styles.highlight}
      onCodeChanged={onChange}
      code={code}
      autoFocusOnLoad={false}
      onCodeFilled={onFilled}
      secureTextEntry={password ? true : false}
    />
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  otpInput: {
    width: theme.window.windowWidth > 600 ? 80 : 50,
    height: theme.window.windowWidth > 600 ? 80 : 50,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: theme.palette.gray,
    fontSize: 30,
    color: theme.palette.black,
    backgroundColor: theme.palette.white,
    elevation: 1,
  },
  highlight: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: theme.palette.primary,
    backgroundColor: theme.palette.white,
  },
});
