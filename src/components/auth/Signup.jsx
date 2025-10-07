import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import MyInput from '../global/MyInput';
import Row from '../global/Row';
import MyButton from '../global/Mybutton';
import Title from '../global/Title';
import { Theme } from '../../constants/Theme';
import useLogin from './useLogin';
import Dropdown from '../global/Dropdown';
import States from '../../constants/States';
import { useNavigation } from '@react-navigation/native';

const theme = Theme();
const Signup = ({
  toggleLogin,
  handleSignup,
  signUpData,
  handleSignUpChange,
  signUpError: error,
  handleSelectItem,
  loginError,
  loading,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <Title text="Register" header />
      <Title text="Create A New Account" style={{ marginTop: 10 }} />
      <View style={styles.container}>
        <MyInput
          text="Name"
          style={styles.inputStyle}
          icon="person-circle"
          error={error.name}
          props={{
            value: signUpData.name,
            onChangeText: handleSignUpChange('name'),
          }}
        />
        <MyInput
          text="Phone Number"
          style={styles.inputStyle}
          icon="call"
          error={error.phone}
          type={'phone-pad'}
          props={{
            value: signUpData.phone,
            onChangeText: handleSignUpChange('phone'),
          }}
        />
        <MyInput
          text="Email"
          style={styles.inputStyle}
          icon="mail"
          error={error.email}
          type="email-address"
          props={{
            value: signUpData.email,
            onChangeText: handleSignUpChange('email'),
          }}
        />
        <MyInput
          text="Password"
          style={styles.inputStyle}
          icon="lock-closed"
          password
          error={error.password}
          props={{
            value: signUpData.password,
            onChangeText: handleSignUpChange('password'),
          }}
        />
        <MyInput
          text="Confirm Password"
          style={styles.inputStyle}
          icon="lock-closed"
          password
          error={error.confirmPassword}
          props={{
            value: signUpData.confirmPassword,
            onChangeText: handleSignUpChange('confirmPassword'),
          }}
        />

        <Dropdown
          style={{ marginTop: 8 }}
          data={States}
          text="state"
          onSelectItem={handleSelectItem}
        />
        <MyInput
          text="Transaction Pin"
          style={styles.inputStyle}
          icon="lock-closed"
          error={error.pin}
          type={'numeric'}
          props={{
            value: signUpData.pin,
            onChangeText: handleSignUpChange('pin'),
          }}
        />
        <MyInput
          text="Referral (Optional)"
          style={styles.inputStyle}
          icon="person-circle"
          error={error.referral}
          props={{
            value: signUpData.referral,
            onChangeText: handleSignUpChange('referral'),
          }}
        />
        {loginError && (
          <Title
            text={loginError}
            style={{ width: '80%', color: theme.palette.red }}
          />
        )}
        <Row style={styles.row}>
          <MyButton
            text={'Create Account'}
            style={styles.loginButton}
            onPress={handleSignup}
            isLoading={loading}
          />
        </Row>
        <TouchableOpacity onPress={() => navigation.navigate('loginV2')}>
          <Row center>
            <Text style={styles.text}>Already have an account?</Text>
            <Text style={[styles.text, styles.link]}>Sign in</Text>
          </Row>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    padding: theme.window.windowWidth * 0.05,
  },
  inputStyle: {
    marginTop: -25,
  },
  row: {
    marginTop: 30,
  },
  loginButton: {
    width: '100%',
    marginTop: -20,
  },

  text: {
    fontSize: 16,
  },
  link: {
    marginLeft: 8,
    color: theme.palette.link,
  },
});
