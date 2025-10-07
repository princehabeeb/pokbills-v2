import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import MyInput from '../global/MyInput';
import MyButton from '../global/Mybutton';
import { setContactNumber, toggleModal } from '../../store/globalState';
import { Theme } from '../../constants/Theme';
import Dropdown from '../global/Dropdown';
import PaymentModal from './PaymentModal';
import Title from '../global/Title';
import Row from '../global/Row';
import SelectContactButton from '../global/SelectContactButton';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import NetworkStatusButton from '../global/NetworkStatusButton';

const theme = Theme();

const FormSection = ({ network: net }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  const [network, setNetwork] = useState(0);
  const [data, setData] = useState([]);
  const { netWorkSettings, contact } = useSelector(
    (state) => state.globalState
  );

  useEffect(() => {
    // console.log();
    const newType = netWorkSettings
      .filter((dataItem) => parseInt(dataItem.nId) === network)
      .map((dataItem) => {
        const n = [];
        if (dataItem.vtuStatus === 'On') {
          n.push('VTU');
        }
        if (dataItem.sharesellStatus === 'On') {
          n.push('Share And Sell');
        }
        if (dataItem.momoStatus === 'On') {
          n.push('Momo');
        }

        return n;
      })
      .flat();

    setData(newType);
  }, [network, netWorkSettings]);

  const [error, setError] = useState({
    phone: '',
    amount: '',
    option: '',
  });

  const clearError = (field) => {
    setError((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const validateAndToggleModal = () => {
    const errors = {};

    if (amount.trim() === '') {
      errors.amount = 'Amount cannot be empty';
    }

    if (phone.trim() === '') {
      errors.phone = 'Phone Number cannot be empty';
    }

    if (!selectedOption) {
      errors.option = 'Please Select Airtime type';
    }

    if (network === 0) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Payment Fail',
        textBody: 'Please Select Network Provider',
        button: 'close',
      });
      return;
    }
    setError(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(toggleModal());
    }
  };

  useEffect(() => {
    if (selectedOption) {
      clearError('option');
    }
  }, [selectedOption]);

  function handleUtility(item) {
    setAmount(item);
  }

  useEffect(() => {
    setNetwork(net);
  }, [net]);

  useEffect(() => {
    if (contact?.network) {
      setNetwork(contact?.network);
    }
    if (contact?.amount) {
      setAmount(contact?.amount);
    }
    if (contact?.selectedOption) {
      setSelectedOption(contact?.selectedOption);
    }
    if (contact?.number) {
      setPhone(contact?.number);
    }
  }, []);

  function handleSelectContact() {
    dispatch(
      setContactNumber({
        network,
        amount,
        selectedOption,
      })
    );
    navigation.replace('contact list', { p: 'buyAirtimePage' });
  }

  return (
    <View style={styles.container}>
      <SelectContactButton onPress={handleSelectContact} />
      <MyInput
        text="Phone Number"
        icon="call"
        type={'phone-pad'}
        value={phone}
        onChangeText={(text) => {
          clearError('phone');
          setPhone(text);
        }}
        error={error.phone}
      />
      {network >= 1 && (
        <Dropdown
          data={data}
          onSelectItem={setSelectedOption}
          text={selectedOption ? selectedOption : 'Airtime type'}
          error={error.option}
        />
      )}
      {selectedOption && (
        <>
          <View style={{ marginVertical: 20 }}>
            <Row style={styles.utilityRow}>
              <UtilityItem handleUtility={handleUtility} text="50" />
              <UtilityItem handleUtility={handleUtility} text="100" />
              <UtilityItem handleUtility={handleUtility} text="200" />
              <UtilityItem handleUtility={handleUtility} text="500" />
            </Row>
            <Row style={styles.utilityRow}>
              <UtilityItem handleUtility={handleUtility} text="1000" />
              <UtilityItem handleUtility={handleUtility} text="2000" />
              <UtilityItem handleUtility={handleUtility} text="5000" />
              <UtilityItem handleUtility={handleUtility} text="8000" />
            </Row>
          </View>
          <MyInput
            text="Amount"
            icon="wallet"
            value={amount}
            type="number-pad"
            style={styles.input}
            onChangeText={(text) => {
              clearError('amount');
              setAmount(text);
            }}
            error={error.amount}
          />
        </>
      )}
      <NetworkStatusButton />
      <MyButton text="Proceed" onPress={validateAndToggleModal} />
      <PaymentModal
        network={network}
        selectedOption={selectedOption}
        phone={phone}
        amount={amount}
      />
    </View>
  );
};

export default FormSection;

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.window.windowWidth > 600 ? 20 : 0,
  },
  utilityContainer: {
    backgroundColor: theme.palette.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 12,
    width: theme.window.windowWidth / 4.5,
    borderWidth: 2,
    borderColor: theme.palette.gray,
  },
  utilityRow: {
    justifyContent: 'space-between',
  },
  input: {
    marginTop: -40,
    marginBottom: 15,
  },
});

function UtilityItem({ text, handleUtility }) {
  return (
    <TouchableOpacity
      onPress={() => handleUtility(text)}
      style={styles.utilityContainer}
    >
      <Title text={`₦${text}`} bold color={theme.palette.grayDark} />
    </TouchableOpacity>
  );
}
