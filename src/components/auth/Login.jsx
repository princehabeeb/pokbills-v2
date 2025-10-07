import { useRoute } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import MyInput from '../global/MyInput';
import Row from '../global/Row';
import MyButton from '../global/Mybutton';
import { Theme } from '../../constants/Theme';
import useLogin from './useLogin';
import Signup from './Signup';
import Title from '../global/Title';
import PinLogin from './PinLogin';
import LoadingPage from '../loading/LoadingPage';

const theme = Theme();
const Login = ({ islogin, setLoading, loading }) => {
  const {
    password,
    phoneNumber,
    error,
    signUpData,
    signUpError,
    loginError,
    login,
    support,
    showLAP,
    currentUser,
    loginWithPin,
    useBiometric,
    togglePhoneNumber,
    handleBiometricAuth,
    toggleLogin,
    handleSelectItem,
    handleForgetPassword,
    handleSignUpChange,
    handleSignup,
    handleLogin,
    handlePasswordChange,
    handlePhoneChange,
  } = useLogin({ setLoading, islogin });

  if (loginWithPin && login) {
    return (
      <>
        <LoadingPage show={loading} />
        <PinLogin
          support={support}
          handleBiometricAuth={handleBiometricAuth}
          togglePhoneNumber={togglePhoneNumber}
          useBio={useBiometric}
        />
      </>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <Image source={require('../../assets/icon.png')} style={styles.image} />
        {login ? (
          <>
            <Title
              text={`Welcome ${
                showLAP
                  ? `Back, ${currentUser?.firstname}`
                  : 'to ' + theme.appName
              }`}
              header
            />
            {!support && (
              <MyInput
                text="Phone Number"
                style={styles.inputStyle}
                icon="call"
                type={'phone-pad'}
                error={error.phone}
                props={{
                  value: phoneNumber,
                  onChangeText: handlePhoneChange,
                }}
              />
            )}
            {showLAP && (
              <TouchableOpacity onPress={togglePhoneNumber}>
                <Row>
                  <Text style={[styles.text, styles.link]}>Change account</Text>
                </Row>
              </TouchableOpacity>
            )}
            <MyInput
              text="Password"
              style={styles.inputStyle}
              icon="lock-closed"
              password
              error={error.password}
              props={{ value: password, onChangeText: handlePasswordChange }}
            />

            <TouchableOpacity
              onPress={handleForgetPassword}
              style={{
                width: '100%',
                alignItems: 'flex-end',
                marginRight: 20,
              }}
            >
              <Row>
                <Text style={[styles.text, styles.link, { color: 'gray' }]}>
                  Forgot Password?
                </Text>
              </Row>
            </TouchableOpacity>
            {loginError && (
              <Title
                text={loginError}
                style={{
                  width: '80%',
                  color: theme.palette.red,
                  textTransform: 'lowercase',
                }}
                small
              />
            )}
            <Row style={styles.row}>
              <MyButton
                text={'Login'}
                style={[
                  styles.loginButton,
                  support && useBiometric ? {} : { width: '100%' },
                  // loading && { width: '90%' },
                ]}
                onPress={handleLogin}
                isLoading={loading}
              />
              {support && useBiometric && !loading && (
                <MyButton
                  iconButton="finger-print-outline"
                  style={[styles.fingerPrintButton]}
                  onPress={handleBiometricAuth}
                />
              )}
            </Row>

            <TouchableOpacity onPress={toggleLogin}>
              <Row>
                <Text style={[styles.text, styles.link]}>
                  Don't have an account? Create Account
                </Text>
              </Row>
            </TouchableOpacity>
          </>
        ) : (
          <Signup
            toggleLogin={toggleLogin}
            handleSignup={handleSignup}
            signUpData={signUpData}
            handleSignUpChange={handleSignUpChange}
            signUpError={signUpError}
            handleSelectItem={handleSelectItem}
            loginError={loginError}
            loading={loading}
          />
        )}
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.window.windowWidth * 0.03,
  },
  inputStyle: {
    width: '95%',
  },
  row: {
    justifyContent: 'space-between',
    width: '95%',
  },
  loginButton: {
    width: '75%',
  },

  fingerPrintButton: {
    width: '20%',
    marginLeft: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'right',
    textTransform: 'capitalize',
  },
  link: {
    color: theme.palette.link,
    marginLeft: 8,
    marginTop: 5,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
