import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import ListItem from '../../components/global/ListItem';
import ChangePasswordModel from '../../components/settings/ChangePasswordModel';
import ChangePinModel from '../../components/settings/ChangePinModel';
import ChangeLoginPinModel from '../../components/settings/ChangeLoginPinModel';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { BaseUrl } from '../../store/apis/api';

export default function SecurityPage() {
  const [passModel, setPassModel] = useState(false);
  const [pinModel, setPinModel] = useState(false);
  const [loginModel, setLoginModel] = useState();
  const { token } = useSelector((state) => state.globalState);

  const sendOtp = async () => {
    setPinModel(true);

    try {
      const response = await axios.post(
        `${BaseUrl}request-emailotp`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.status === 'success') {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'OTP Sent',
          textBody: response?.data?.message,
          button: 'close',
        });
      }
    } catch (error) {
      console.log(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody:
          error?.response?.data?.message || error || 'Something went wrong',
        button: 'close',
      });
    }
  };

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Security" />
      <ChangePasswordModel
        handleToggleModal={() => setPassModel((prev) => !prev)}
        isVisible={passModel}
      />
      <ChangePinModel setPinModel={setPinModel} isVisible={pinModel} />
      <ChangeLoginPinModel
        handleToggleModal={() => setLoginModel((prev) => !prev)}
        isVisible={loginModel}
      />
      <ListItem
        header="Change Password"
        icon="lock-closed"
        text="Reset account Password"
        onPress={() => setPassModel((prev) => !prev)}
      />
      <ListItem
        header="Change Pin"
        icon="lock-closed"
        text="Change Transaction Pin"
        onPress={sendOtp}
      />
      <ListItem
        header="Change Login Pin"
        icon="lock-closed"
        text="Change Login Pin"
        onPress={() => setLoginModel((prev) => !prev)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
