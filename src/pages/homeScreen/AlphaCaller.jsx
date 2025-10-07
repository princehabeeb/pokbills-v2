import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/Mybutton';
import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { useDispatch, useSelector } from 'react-redux';
import { GetAlphaPlans, PurchaseAlpha } from '../../store/apis/services';
import GetUserPrice from '../../constants/GetUserPrice';
import { GenerateRandomNumber } from '../../constants/GenerateRandomNumber';
import { StackActions, useNavigation } from '@react-navigation/native';
import Title from '../../components/global/Title';
import TransparentButton from '../../components/global/TransParentButton';
import SelectContactButton from '../../components/global/SelectContactButton';
import { resetContactNumber, setContactNumber } from '../../store/globalState';

const theme = Theme();
export default function AlphaCallerPage() {
  const [amount, setAmount] = useState('');
  const [number, setNumber] = useState('');
  const { token, user, contact } = useSelector((state) => state.globalState);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //model
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const sheetRef = useRef();
  const [search, setSearch] = useState('');
  const snapPoints = ['50%', '100%'];
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    setSearchData(
      data.filter((item) => item.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, data]);

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          borderBottomColor: theme.palette.gray,
          borderBottomWidth: 1,
        }}
        onPress={() => {
          setAmount(item);
          sheetRef.current?.close();
        }}
      >
        <Title text={item} position="left" bold />
      </TouchableOpacity>
    );
  }, []);

  const getPlans = async () => {
    const response = await GetAlphaPlans({
      token,
    });

    if (response.status === 'success') {
      const data = [];
      response.response.map((item) => {
        data.push(
          `₦${
            user?.account_type.toLowerCase() === 'subscriber'
              ? item?.sellingPrice
              : user?.account_type.toLowerCase() === 'agent'
              ? item?.agent
              : item?.vendor
          }`
        );
      });

      setPlans(response.response);
      setData(data);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const handlePurchase = async () => {
    if ((!amount || !number, !plans)) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'All fields are required',
        button: 'close',
      });
      return;
    }

    const amt = parseFloat(amount.split('₦')[1]);

    const plan = plans.find(
      (item) =>
        item.sellingPrice === amt || item.agent === amt || item.vendor === amt
    );

    if (!plan) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Select a plan',
        button: 'close',
      });
      return;
    }

    navigation.navigate('alphaModel', {
      number,
      plan,
    });
    return;
    setLoading(true);

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

    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('airtimeReceipt', {
      data: response.response,
    });
  };

  useEffect(() => {
    if (contact) {
      setAmount(contact?.amount);
      setNumber(contact?.number);
    }
    dispatch(resetContactNumber());
  }, []);

  function handleSelectContact() {
    dispatch(
      setContactNumber({
        amount,
      })
    );
    navigation.replace('contact list', { p: 'alpha page' });
  }

  return (
    <>
      <View style={styles.container}>
        <SecondaryHeader text="Alpha Topup" />
        <View style={{ alignSelf: 'stretch' }}>
          <Image
            source={require('../../assets/alpacaller.png')}
            style={styles.image}
          />
          <SelectContactButton
            onPress={handleSelectContact}
            text="Select Alpha Number"
          />
          <TransparentButton
            text={amount ? amount : 'Select Amount'}
            onPress={() => {
              setIsBottomSheetVisible(true);
              sheetRef.current?.snapToIndex(1);
            }}
          />
          <MyInput
            text="Phone Number"
            icon="call"
            type="number-pad"
            value={number}
            style={{ marginTop: -25 }}
            onChangeText={(t) => setNumber(t)}
          />
          <MyButton
            text="proceed"
            onPress={handlePurchase}
            isLoading={loading}
          />
        </View>
      </View>
      {isBottomSheetVisible && (
        <BottomSheet
          detached
          enablePanDownToClose
          ref={sheetRef}
          animateOnMount
          snapPoints={snapPoints}
          index={1}
          style={styles.contentContainer}
        >
          <MyInput
            text="Search Plan"
            icon="search"
            style={{ marginBottom: 10 }}
            onChangeText={(t) => setSearch(t)}
            value={search}
            maxLength={10}
          />

          <BottomSheetFlatList data={searchData} renderItem={renderItem} />
        </BottomSheet>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.window.windowWidth * 0.05,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: 200,
    alignSelf: 'center',
  },
});
