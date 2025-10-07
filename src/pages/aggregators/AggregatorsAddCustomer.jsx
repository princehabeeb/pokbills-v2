import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import Title from '../../components/global/Title';
import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/Mybutton';
import Dropdown from '../../components/global/Dropdown';
import States from '../../constants/States';
import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { SignUpUser } from '../../store/apis/auth';

const theme = Theme();

const AggregatorsAddCustomer = ({}) => {
  const [selectedState, setSelectedState] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.globalState);
  const navigation = useNavigation();

  const fieldNames = {
    name: 'name',
    phone: 'phone',
    email: 'email',
    password: 'password',
    state: 'state',
    pin: 'pin',
    referral: 'referral',
  };

  const [inputError, setInputError] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    state: '',
    pin: '',
    referral: '',
  });

  const [signUpData, setSignUpData] = useState({
    [fieldNames.name]: '',
    [fieldNames.phone]: '',
    [fieldNames.email]: '',
    [fieldNames.password]: '',
    [fieldNames.state]: '',
    [fieldNames.pin]: '',
    [fieldNames.referral]: '',
  });

  useEffect(() => {
    setSignUpData((prev) => ({
      ...prev,
      referral: user?.phone,
    }));
  }, []);

  const handleInputChange = (fieldName) => (text) => {
    setInputError((prev) => ({ ...prev, [fieldName]: '' }));
    setSignUpData((prev) => ({ ...prev, [fieldName]: text }));
  };

  const handleSelectItem = (item) => {
    setInputError((prev) => ({ ...prev, state: '' }));
    setSignUpData((prev) => ({ ...prev, state: item }));
    // setSelectedState(item);
  };

  const handleSignup = async () => {
    const error = [];

    if (signUpData.name.trim() === '') {
      error.name = 'Name cannot be empty';
    }
    if (signUpData.phone.trim() === '') {
      error.phone = 'Phone number cannot be empty';
    }
    if (signUpData.email.trim() === '') {
      error.email = 'Email cannot be empty';
    }
    if (signUpData.name.split(' ')[1].trim() === '') {
      error.name = 'Last name cannot be empty';
    }
    if (signUpData.password.trim().length < 8) {
      error.password = 'Password must be 8 characters long or more';
    }
    if (signUpData.state === null) {
      error.state = 'State cannot be empty';
    }
    if (signUpData.pin.trim().length < 5) {
      error.pin = 'Pin must be 5 characters long or more';
    }

    if (Object.keys(error).length > 0) {
      setInputError((prev) => ({ ...prev, ...error }));
      return;
    }

    setLoading(true);
    const response = await SignUpUser({
      email: signUpData.email,
      phone: signUpData.phone,
      password: signUpData.password,
      state: signUpData.state,
      firstname: signUpData.name.split(' ')[0],
      lastname: signUpData.name.split(' ')[1],
      pin: signUpData.pin,
      referral: signUpData.referral,
    });

    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Account Creation Failed',
        textBody: response?.message,
        button: 'close',
      });
      setLoading(false);
      return;
    }

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Account Created',
      textBody: 'Your account has been created successfully',
      button: 'close',
    });
    setLoading(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="white" />
      <SecondaryHeader text="Add Customer" />
      <ScrollView
        style={{ marginTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Title text="Enter customer information" />
        <MyInput
          text="Name"
          style={styles.inputStyle}
          icon="person-circle"
          error={inputError.name}
          props={{
            value: signUpData[fieldNames.name],
            onChangeText: handleInputChange(fieldNames.name),
          }}
        />
        <MyInput
          text="Phone Number"
          style={styles.inputStyle}
          icon="call"
          error={inputError.phone}
          type={'phone-pad'}
          props={{
            value: signUpData[fieldNames.phone],
            onChangeText: handleInputChange(fieldNames.phone),
          }}
        />
        <MyInput
          text="Email"
          style={styles.inputStyle}
          icon="mail"
          error={inputError.email}
          type="email-address"
          props={{
            value: signUpData[fieldNames.email],
            onChangeText: handleInputChange(fieldNames.email),
          }}
        />
        <MyInput
          text="Password"
          style={styles.inputStyle}
          icon="lock-closed"
          password
          error={inputError.password}
          props={{
            value: signUpData[fieldNames.password],
            onChangeText: handleInputChange(fieldNames.password),
          }}
        />
        <Dropdown
          iconName="business"
          data={States}
          text="state"
          error={inputError.state}
          onSelectItem={handleSelectItem}
        />
        <MyInput
          text="Transaction Pin"
          style={styles.inputStyle}
          icon="lock-closed"
          error={inputError.pin}
          type={'numeric'}
          props={{
            value: signUpData[fieldNames.pin],
            onChangeText: handleInputChange(fieldNames.pin),
          }}
        />
        <MyInput
          text="Referral"
          style={styles.inputStyle}
          icon="person-circle"
          error={inputError.referral}
          props={{
            value: signUpData[fieldNames.referral],
            onChangeText: handleInputChange(fieldNames.referral),
          }}
        />
        <MyButton
          text={'Create Account'}
          style={styles.loginButton}
          onPress={handleSignup}
          isLoading={loading}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.palette.white,
  },
});

export default AggregatorsAddCustomer;
