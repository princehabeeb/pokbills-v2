import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import NetworkSection from '../../components/buyAirtime/NetworkSection';
import Dropdown from '../../components/global/Dropdown';
import MyButton from '../../components/global/Mybutton';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import { GetDataPinPlans, PurchaseDataPin } from '../../store/apis/services';
import MyInput from '../../components/global/MyInput';
import GetUserPrice from '../../constants/GetUserPrice';
import DataNetworkSection from '../../components/buydata/DataNetworkSection';
import PinNetworkSection from '../../components/airtimeAndDataPin/PinNetworkSection';

const theme = Theme();
const DataPinPage = () => {
  const [network, setNetwork] = useState(0);
  const [plan, setPlan] = useState('');
  const { token, user } = useSelector((state) => state.globalState);
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getPlans = async () => {
    const response = await GetDataPinPlans({
      token,
      // accountstatus: user?.account_status,
      // username: user?.firstname,
      // fullname: `${user?.firstname} ${user?.lastname}`,
      // role: user?.account_type,
    });

    console.log(response);
    // console.log(response.response);
    if (response.status === 'success') {
      setPlans(response.response);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  useEffect(() => {
    const filteredPlans = plans.filter((plan) => plan?.datanetwork === network);

    const p = filteredPlans.map((item) => {
      const price = GetUserPrice({ user, item });
      return `${item?.name} - ₦${price} ${item?.day} Days`;
    });

    setData(p);
  }, [network, plans]);

  const handlePurchaseData = async () => {
    if (network === 0 || !plan || !businessName || !quantity) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'All fields are required',
        button: 'close',
      });
      return;
    }
    const p = plans
      .filter((item) => item.name === plan.split(' - ')[0])
      .find((item) => {
        if (item?.datanetwork.toString() === network.toString()) {
          return item;
        }
      });

    navigation.navigate('data pin model', {
      network,
      businessname: businessName,
      quantity,
      plan: p,
      token,
    });
    return;
  };
  return (
    <View style={styles.container}>
      <SecondaryHeader text="Data Pin" />
      <PinNetworkSection
        isDataPin={true}
        active={network}
        setActive={setNetwork}
      />
      <Dropdown text="Select Plan" data={data} onSelectItem={setPlan} />
      <MyInput
        text="Quantity"
        icon="wallet"
        value={quantity}
        onChangeText={(t) => setQuantity(t)}
        type={'number-pad'}
      />
      <MyInput
        text="Business Name"
        icon="briefcase"
        value={businessName}
        onChangeText={(t) => setBusinessName(t)}
      />
      <MyButton
        text="Continue"
        onPress={handlePurchaseData}
        isLoading={loading}
      />
    </View>
  );
};

export default DataPinPage;

const styles = StyleSheet.create({
  container: {
    margin: theme.window.windowWidth > 600 ? 20 : 10,
  },
});
