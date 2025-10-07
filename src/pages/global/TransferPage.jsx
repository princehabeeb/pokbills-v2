import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../constants/Theme';
import { GetBankList, VerifyAccountNumber } from '../../store/apis/global';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import MyInput from '../../components/global/MyInput';
import DraggableModel from '../../components/global/DraggableModel';
import Title from '../../components/global/Title';
import MyButton from '../../components/global/Mybutton';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { toggleDataModel } from '../../store/globalState';
import PayModel from '../../components/fund/PayMentModel';

const theme = Theme();

const TransferPage = () => {
  const [bankNames, setBankNames] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.globalState);
  const [filterBanks, setFilterBanks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedBank, setSelectedBank] = useState({});
  const draggableModelRef = useRef();
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchBankList = async () => {
      try {
        const response = await GetBankList({ token });
        if (response.status === 'success') {
          setBankNames(response.response);
        }
      } catch (error) {
        console.error('Error fetching bank list:', error);
      }
    };

    fetchBankList();
  }, [token]);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity
          style={styles.renderItemContainer}
          onPress={() => {
            setSelectedBank(item);
            draggableModelRef.current.closeModel();
          }}
        >
          <Title text={item?.name} position="left" />
        </TouchableOpacity>
      );
    },
    [searchText, bankNames]
  );

  useEffect(() => {
    const filteredBanks = bankNames.filter((bank) => {
      return bank?.name?.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilterBanks(filteredBanks);
  }, [searchText, bankNames]);

  const handlePress = async () => {
    if (!selectedBank?.id || !amount || !accountNumber) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Submit Error',
        textBody: 'Please fill in all fields',
        button: 'close',
      });
      return;
    }
    setLoading(true);
    const response = await VerifyAccountNumber({
      accountnumber: accountNumber,
      bankcode: selectedBank?.code,
      token,
      bankname: selectedBank?.name,
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

    setData({
      accountname: response?.data?.accountname,
      bankname: selectedBank?.name,
      accountnumber: accountNumber,
      bankcode: selectedBank?.code,
      amount,
      type: 'bank transfer',
    });

    dispatch(toggleDataModel());
  };

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Bank Transfer" />

      <DraggableModel
        buttonText={selectedBank?.name ? selectedBank?.name : 'Bank Name'}
        ref={draggableModelRef}
      >
        <MyInput
          text="Search"
          icon="search"
          onChangeText={(t) => setSearchText(t)}
        />

        <BottomSheetFlatList
          data={filterBanks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </DraggableModel>

      <View style={{ zIndex: -1 }}>
        <MyInput
          text="Amount"
          type="number-pad"
          style={styles.input}
          icon={'cash'}
          value={amount}
          onChangeText={(t) => setAmount(t)}
        />
        <MyInput
          style={styles.input}
          text="Account Number"
          type="number-pad"
          icon="bank"
          material
          value={accountNumber}
          onChangeText={(t) => setAccountNumber(t)}
        />
        <MyButton text="continue" onPress={handlePress} isLoading={loading} />
      </View>
      <PayModel data={data} />
    </View>
  );
};

export default TransferPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.window.windowWidth * 0.05,
  },
  renderItemContainer: {
    padding: theme.window.windowWidth * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.gray,
  },
  input: {
    transform: [{ translateY: -15 }],
  },
});
