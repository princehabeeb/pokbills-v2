import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import BottomHalfModal from '../global/MyModal';
import Title from '../global/Title';
import MyInput from '../global/MyInput';
import MyButton from '../global/Mybutton';
import { useSelector } from 'react-redux';
import { UpdateLoginPin, UpdateTransactionPin } from '../../store/apis/user';
import { GetData, StoreData } from '../../constants/storage';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export default function ChangeLoginPinModel({ handleToggleModal, isVisible }) {
  const [oldpin, setOldPin] = useState('');
  const [newpin, setNewPin] = useState('');
  const [confirmpin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.globalState);

  const handlePressPin = async () => {
    const pin = await GetData('pin');

    if (pin !== oldpin) {
      setError('Incorrect Pin, Try again');
      return;
    }

    setError('');
    if (newpin !== confirmpin) {
      setError('Pins are not the same');
      return;
    }

    setLoading(true);

    await StoreData('pin', newpin);
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Pin Changed',
      textBody: 'Pin changed successfully',
      button: 'close',
    });

    setOldPin('');
    setNewPin('');
    setConfirmPin('');
    setLoading(false);
    handleToggleModal();
  };

  return (
    <BottomHalfModal toggleModal={handleToggleModal} isModalVisible={isVisible}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title text="Change Login Pin" header />
        <MyInput
          password
          icon="lock-closed"
          text="Old Pin"
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
