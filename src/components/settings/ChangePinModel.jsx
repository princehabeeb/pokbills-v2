import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import BottomHalfModal from '../global/MyModal';
import Title from '../global/Title';
import MyInput from '../global/MyInput';
import MyButton from '../global/Mybutton';
import { useSelector } from 'react-redux';
import { UpdateTransactionPin } from '../../store/apis/user';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export default function ChangePinModel({ isVisible, setPinModel }) {
  const [oldpin, setOldPin] = useState('');
  const [newpin, setNewPin] = useState('');
  const [confirmpin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.globalState);

  const handlePressPin = async () => {
    setError('');
    if (newpin !== confirmpin) {
      setError('Pins are not the same');
      return;
    }

    setLoading(true);
    const response = await UpdateTransactionPin({
      confirmpin,
      newpin,
      oldpin,
      token,
    });

    if (response.status !== 'success') {
      setError(response.message);
      setLoading(false);
      return;
    }

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Pin Changed',
      textBody: response.message,
      button: 'close',
    });
    setLoading(false);
    setPinModel(false);
  };

  return (
    <BottomHalfModal
      toggleModal={() => setPinModel(false)}
      isModalVisible={isVisible}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title text="Change Transaction Pin" header />
        <Text
          style={{ textAlign: 'center', color: 'gray', fontWeight: 'bold' }}
        >
          An otp has been sent to your email containing your OTP
        </Text>
        <MyInput
          password
          icon="lock-closed"
          text="OTP"
          value={oldpin}
          onChangeText={(text) => setOldPin(text)}
        />
        <MyInput
          password
          icon="lock-closed"
          text="New Pin"
          value={newpin}
          onChangeText={(text) => setNewPin(text)}
        />
        <MyInput
          password
          icon="lock-closed"
          text="Confirm Pin"
          value={confirmpin}
          onChangeText={(text) => setConfirmPin(text)}
        />
        <Title text={error} color={'brown'} />
        <MyButton text="Confirm" onPress={handlePressPin} isLoading={loading} />
      </ScrollView>
    </BottomHalfModal>
  );
}

const styles = StyleSheet.create({});
