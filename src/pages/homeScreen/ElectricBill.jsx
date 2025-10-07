import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import Dropdown from '../../components/global/Dropdown';
import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/Mybutton';
import {
  GetElectricityProviders,
  VerifyMeterNumber,
} from '../../store/apis/services';
import { useEffect } from 'react';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import TransparentButton from '../../components/global/TransParentButton';
import Title from '../../components/global/Title';
import PayModel from '../../components/fund/PayMentModel';
import {
  resetContactNumber,
  setContactNumber,
  toggleDataModel,
} from '../../store/globalState';
import SelectContactButton from '../../components/global/SelectContactButton';

const theme = Theme();
export default function ElectricBill() {
  const [providers, setProviders] = useState([]);
  const { token, user, contact } = useSelector((state) => state.globalState);
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setSelectedType] = useState(null);
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [states, setStates] = useState([]);
  const navigation = useNavigation();
  const typaData = ['Postpaid', 'Prepaid'];
  const [transferData, setTransferData] = useState({ type: 'electricity' });
  const dispatch = useDispatch();

  //model
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const sheetRef = useRef();
  const [search, setSearch] = useState('');
  const snapPoints = ['50%', '70%', '100%'];
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      states.filter((item) => item.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, states]);

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          borderBottomColor: theme.palette.gray,
          borderBottomWidth: 1,
        }}
        onPress={() => {
          setSelectedItem(item);
          sheetRef.current?.close();
        }}
      >
        <Title text={item} position="left" bold />
      </TouchableOpacity>
    );
  }, []);

  const getTvs = async () => {
    const response = await GetElectricityProviders({
      token,
    });

    if (response.status === 'success') {
      const data = [];
      response.response.map((item) => {
        data.push(item.provider);
      });

      setProviders(response?.response);
      setStates(data);
    }
  };

  useEffect(() => {
    getTvs();
  }, []);

  const handleMeterNumberChange = (text) => {
    setMeterNumber(text);
  };

  const handlePurchase = async () => {
    if (!amount || !selectedItem || !type || !meterNumber) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'All fields are required',
        button: 'close',
      });
      return;
    }
    const st = providers.find((item) => item.provider === selectedItem);
    setLoading(true);
    const response = await VerifyMeterNumber({
      token,
      meternumber: meterNumber,
      provider: st.eId,
      metertype: type.toLowerCase(),
    });
    setLoading(false);

    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Validation Fail',
        textBody: response.message,
        button: 'close',
      });
      return;
    }

    const userInfo = response.response;

    setTransferData({
      type: 'electricity',
      amount,
      meternumber: meterNumber,
      provider: st.eId,
      metertype: type.toLowerCase(),
      ref: userInfo?.ref,
      name: userInfo?.name,
      providerName: st?.provider,
    });

    dispatch(toggleDataModel());

    return;
  };

  useEffect(() => {
    if (contact) {
      setAmount(contact?.amount);
      setSelectedItem(contact?.selectedItem);
      setSelectedType(contact?.type);
      setMeterNumber(contact?.number);
    }
    dispatch(resetContactNumber());
  }, []);

  function handleSelectContact() {
    dispatch(
      setContactNumber({
        amount,
        selectedItem,
        type,
      })
    );
    navigation.replace('contact list', { p: 'electricBillPage' });
  }

  return (
    <>
      <View style={styles.container}>
        <SecondaryHeader text={'Electric Bill'} />
        <SelectContactButton
          onPress={handleSelectContact}
          text="Select Meter Number"
        />
        <TransparentButton
          text={selectedItem ? selectedItem : 'Select Plan'}
          onPress={() => {
            setIsBottomSheetVisible(true);
            sheetRef.current?.snapToIndex(1);
          }}
        />

        <Dropdown
          text={type ? type : 'Select Type'}
          data={typaData}
          onSelectItem={setSelectedType}
        />
        <MyInput
          text="Meter Number"
          icon="call"
          value={meterNumber}
          onChangeText={handleMeterNumberChange}
          type={'number-pad'}
        />
        <MyInput
          text="Amount"
          icon="wallet"
          value={amount}
          onChangeText={(t) => setAmount(t)}
          type={'number-pad'}
        />
        <MyButton
          text="Confirm"
          icon="call"
          onPress={handlePurchase}
          isLoading={loading}
        />
      </View>
      {isBottomSheetVisible && (
        <BottomSheet
          detached
          enablePanDownToClose
          ref={sheetRef}
          animateOnMount
          snapPoints={snapPoints}
          index={2}
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

          <BottomSheetFlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={renderItem}
          />
        </BottomSheet>
      )}
      <PayModel data={transferData} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.window.windowWidth * 0.05,
  },
  error: {
    borderColor: theme.palette.red,
  },
  contentContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
});
