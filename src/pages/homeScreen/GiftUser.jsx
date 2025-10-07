import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/Mybutton';
import { GiftAUser } from '../../store/apis/global';
import PayModel from '../../components/fund/PayMentModel';
import { toggleDataModel } from '../../store/globalState';

const theme = Theme();
export default function GiftUser() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.globalState);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const handleSubmit = async () => {
    if (!phone || !amount) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'All fields are required',
        button: 'close',
      });
      return;
    }
    setData({ token, amount, phone, type: 'gift user' });
    dispatch(toggleDataModel());

    return;
  };

  const handleToggleModal = () => {};
  return (
    <View style={styles.container}>
      <SecondaryHeader text="Gift User" />
      <MyInput
        text="Phone Number"
        type="phone-pad"
        icon="call"
        value={phone}
        onChangeText={(t) => setPhone(t)}
      />
      <MyInput
        text="Amount"
        type="number-pad"
        icon="cash"
        value={amount}
        onChangeText={(t) => setAmount(t)}
      />
      <MyButton text="Send" isLoading={loading} onPress={handleSubmit} />
      <PayModel data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.window.windowWidth * 0.05,
  },
});
