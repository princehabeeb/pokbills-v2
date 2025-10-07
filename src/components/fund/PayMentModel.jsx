import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions, useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';

import formatMoney from '../../constants/FormatNumber';
import BottomHalfModal from '../global/MyModal';
import Title from '../global/Title';
import Row from '../global/Row';
import { Theme } from '../../constants/Theme';
import { toggleDataModel } from '../../store/globalState';
import MyButton from '../global/Mybutton';
import useCheckBiometric from '../../hooks/CheckBiometric';
import { useMemo, useState } from 'react';
import MyInput from '../global/MyInput';
import { VerifyTransactionPin } from '../../store/apis/auth';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { StoreData } from '../../constants/storage';
import {
  GiftAUser,
  MakeBankTransfer,
  MakeBankWithdrawal,
} from '../../store/apis/global';
import {
  PurchaseElectricityToken,
  SubscribeCableTv,
} from '../../store/apis/services';
import { GenerateRandomNumber } from '../../constants/GenerateRandomNumber';

const theme = Theme();
export default function PayModel({ data }) {
  const dispatch = useDispatch();
  const { dataModel, user, token } = useSelector((state) => state.globalState);
  const { pin: currentPin, usePin } = useCheckBiometric();
  const [error, setError] = useState();
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleToggleModal = () => {
    dispatch(toggleDataModel());
  };

  let dataList = useMemo(() => [], [data]);

  switch (data?.type?.toLowerCase()) {
    case 'gift user':
      dataList = [
        {
          id: 1,
          header: 'Phone Number',
          title: data.phone,
        },
        {
          id: 2,
          header: 'amount',
          title: data.amount,
        },
      ];
      break;
    case 'tv subscription':
      dataList = [
        {
          id: 2,
          header: 'Name',
          title: data.name,
        },
        {
          id: 4,
          header: 'Provider',
          title: data?.cablename,
        },
        {
          id: 5,
          header: 'Plan',
          title: data?.planName,
        },
        {
          id: 3,
          header: 'Card Number',
          title: data?.cardNumber,
        },
      ];
      break;
    case 'electricity':
      dataList = [
        {
          id: 2,
          header: 'Name',
          title: data.name,
        },
        {
          id: 3,
          header: 'Provider',
          title: data.providerName,
        },
        {
          id: 4,
          header: 'Amount',
          title: data.amount,
        },
        {
          id: 5,
          header: 'Meter Number',
          title: data.meternumber,
        },
      ];
      break;
    default:
      dataList = [
        {
          id: 1,
          header: 'Account Name',
          title: data?.accountname,
        },
        {
          id: 2,
          header: 'Bank Name',
          title: data?.bankname,
        },
        {
          id: 3,
          header: 'Account Number',
          title: data?.accountnumber,
        },
        {
          id: 4,
          header: 'Amount',
          title: `₦${formatMoney(parseFloat(data?.amount))}`,
        },
      ];
  }

  const handleSubmit = async ({ useBio }) => {
    // verify if pin is not empty
    if (pin.trim() === '' && !useBio) {
      return setError((p) => ({ ...p, pin: 'Pin cannot be empty' }));
    }

    // verify if biometric is enabled and pay using biometric
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

    let response;
    switch (data?.type?.toLowerCase()) {
      case 'gift user':
        handleGiftUser();
        break;
      case 'withdraw':
        response = await MakeBankWithdrawal({
          ...data,
          token,
        });
        break;
      case 'tv subscription':
        handleBuyTv();
        return;
      case 'electricity':
        handleBuyElectric();
        return;
      default:
        response = await MakeBankTransfer({
          ...data,
          token,
        });
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

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Payment Fail',
      textBody: 'Transaction Successful',
      button: 'close',
    });

    navigation.dispatch(StackActions.popToTop());
    handleToggleModal();
    navigation.navigate('bottomTabs', { page: 'homePage' });
  };

  async function handleGiftUser() {
    const response = await GiftAUser({
      token,
      amount: data.amount,
      phone: data.phone,
    });
    setLoading(false);

    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Transfer Fail',
        textBody: response.message,
        button: 'close',
      });
      return;
    }
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Transfer successful',
      textBody: response.message,
      button: 'close',
    });

    navigation.replace('bottomTabs', { page: 'homePage' });
  }
  async function handleBuyElectric() {
    const ref = `ELECTRICITY_${GenerateRandomNumber()}_${Date.now()}`;
    const response = await PurchaseElectricityToken({
      amount: data.amount,
      token,
      meternumber: data?.meternumber,
      provider: data?.provider,
      metertype: data.metertype,
      pin: pin.trim() === '' && currentPin ? currentPin : pin.trim(),
      phone: user.phone,
      ref,
    });
    setLoading(false);
    console.log(response);
    if (response.status.toLowerCase() !== 'success') {
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
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('transaction status', {
      data: {
        oldbal: user?.wallet,
        ref,
        date: Date.now(),
        message: response.message,
        type: 'Electricity',
        amount: data.amount,
      },
    });
  }
  async function handleBuyTv() {
    setLoading(true);
    const ref = `TV_${GenerateRandomNumber()}_${Date.now()}`;
    const response = await SubscribeCableTv({
      token,
      provider: data?.cId,
      phone: user.phone,
      iucnumber: data?.cardNumber,
      ref,
      pin: pin.trim() === '' && currentPin ? currentPin : pin.trim(),
      cableplanId: data?.cpId,
      subtype: data?.subType,
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

    if (usePin) {
      await StoreData(
        'transaction_pin',
        pin.trim() === '' && currentPin ? currentPin : pin
      );
    }

    // handleToggleModal();
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('transaction status', {
      data: {
        message: response.message,
        status: response.status,
        oldbal: user?.wallet,
        ref,
        date: Date.now(),
        type: 'Tv Subscription',
        amount: data.amount,
      },
    });
  }

  return (
    <BottomHalfModal toggleModal={handleToggleModal} isModalVisible={dataModel}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title text={'Transaction Details'} header />
        <View style={{ marginTop: 10 }} />
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
          error={error}
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
      </ScrollView>
    </BottomHalfModal>
  );
}

function DataItem({ header, title }) {
  return (
    <Row style={{ justifyContent: 'space-between', marginTop: 10 }}>
      <Title text={header} bold color={theme.palette.grayDark} />
      <Title text={title} style={{ maxWidth: '60%', textAlign: 'right' }} />
    </Row>
  );
}
