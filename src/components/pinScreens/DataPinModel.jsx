import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';

import { toggleDataModel } from '../../store/globalState';
import Title from '../global/Title';
import MyInput from '../global/MyInput';
import MyButton from '../global/Mybutton';
import Row from '../global/Row';
import { Theme } from '../../constants/Theme';
import formatMoney from '../../constants/FormatNumber';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { PurchaseDataPin } from '../../store/apis/services';
import { GenerateRandomNumber } from '../../constants/GenerateRandomNumber';
import useCheckBiometric from '../../hooks/CheckBiometric';
import { StoreData } from '../../constants/storage';
import SecondaryHeader from '../global/SecondaryHeader';

const theme = Theme();
export default function DataPinModel() {
  const { dataModel, dataPlans, user, token } = useSelector(
    (state) => state.globalState
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { network, businessname, quantity, plan } = useRoute().params;
  //   const [plan, setPlan] = useState({});
  const [price, setPrice] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [pin, setPin] = useState('');
  const [error, setError] = useState({ pin: '', pay: 'hi' });
  const [loading, setLoading] = useState(false);
  const { pin: currentPin, usePin } = useCheckBiometric();

  useEffect(() => {}, []);
  const handleToggleModal = () => {
    dispatch(toggleDataModel());
  };

  useEffect(() => {
    // console.log({ exam, quantity, amount });
    const DataList = [
      {
        id: 1,
        header: 'Services',
        title: 'Data Pin',
      },
      {
        id: 2,
        header: 'Plan',
        title: `${plan?.name} -  ${plan?.day} Days`,
      },
      {
        id: 3,
        header: 'Quantity',
        title: quantity,
      },

      {
        id: 4,
        header: 'Business Name',
        title: businessname,
      },
    ];
    setDataList(DataList);
  }, []);
  const handleSubmit = async ({ useBio }) => {
    if (pin.trim() === '' && !useBio) {
      return setError((p) => ({ ...p, pin: 'Pin cannot be empty' }));
    }

    if (useBio) {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Confirm payment',
        disableDeviceFallback: true,
        cancelLabel: 'Cancel',
        fallbackLabel: 'Use Pin',
      });

      if (!biometricAuth.success) {
        return;
      }
    }

    setLoading(true);
    const response = await PurchaseDataPin({
      token,
      network,
      businessname,
      quantity,
      plan: plan?.dpId,
      pin: pin.trim() === '' && currentPin ? currentPin : pin.trim(),
      ref: `DataPin_${GenerateRandomNumber()}${Date.now()}`,
    });

    setLoading(false);

    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Payment Fail',
        textBody: response.message,
        button: 'close',
      });
      return;
    }
    setLoading(false);
    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Payment Fail',
        textBody: response.message,
        button: 'close',
      });
      return;
    }
    if (usePin) {
      await StoreData(
        'transaction_pin',
        pin.trim() === '' && currentPin ? currentPin : pin
      );
    }

    handleToggleModal();
    navigation.navigate('transaction status', {
      data: {
        ...response.response,
        message: response.message,
        type: 'data-pin',
      },
    });
  };

  return (
    <ScrollView
      style={styles.outerContainer}
      showsVerticalScrollIndicator={false}
    >
      <SecondaryHeader text="Confirm Transaction" />

      {theme.window.windowWidth > 600 && (
        <Image source={require('../../assets/icon.png')} style={styles.image} />
      )}
      <View style={styles.container}>
        <Title text="Please enter your pin to continue" header />
        {dataList.map((item) => (
          <DataItem header={item.header} title={item.title} key={item.id} />
        ))}

        <MyInput
          password
          icon="lock-closed"
          text="Transaction Pin"
          type="number-pad"
          value={pin}
          onChangeText={(t) => {
            setError('');
            setPin(t);
          }}
          error={error.pin}
        />
        <Row style={{ justifyContent: 'space-between' }}>
          <MyButton
            text="Proceed"
            isLoading={loading}
            style={{
              width: usePin && currentPin.trim() !== '' ? '75%' : '100%',
            }}
            onPress={() => handleSubmit({ useBio: false })}
          />
          {usePin && currentPin.trim() !== '' && (
            <MyButton
              iconButton="finger-print-outline"
              style={{
                width: '20%',
              }}
              onPress={() => handleSubmit({ useBio: true })}
            />
          )}
        </Row>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    marginTop: 20,
  },
  outerContainer: {
    padding: 18,
  },
});

function DataItem({ header, title }) {
  return (
    <Row style={{ justifyContent: 'space-between', marginTop: 10 }}>
      <Title text={header} />
      <Title text={title} style={{ fontWeight: 'bold' }} />
    </Row>
  );
}
