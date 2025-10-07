import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import NetworkSection from '../../components/buyAirtime/NetworkSection';
import MyButton from '../../components/global/Mybutton';
import Dropdown from '../../components/global/Dropdown';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import {
  GetAirtimePinPlans,
  PurchaseAirtimePin,
} from '../../store/apis/services';
import MyInput from '../../components/global/MyInput';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { StackActions, useNavigation } from '@react-navigation/native';
import PinNetworkSection from '../../components/airtimeAndDataPin/PinNetworkSection';

const theme = Theme();
export default function RechargePinPage() {
  const [network, setNetwork] = useState(0);
  const [amount, setAmount] = useState('');
  const { token, user } = useSelector((state) => state.globalState);
  const [plans, setPlans] = useState([]);
  const [customPlan, setCustomPlan] = useState(``);
  const [quantity, setQuantity] = useState('');
  const [businessName, setBusinessName] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const getPlans = async () => {
    const response = await GetAirtimePinPlans({ token });

    if (response.status !== 'success') {
      return;
    }

    setPlans(response.response);
  };

  useEffect(() => {
    getPlans();
  }, []);

  useEffect(() => {
    const filteredPlans = plans.filter(
      (plan) => plan?.aNetwork.toString() === network.toString()
    );

    const customP = filteredPlans.map((plan) => {
      const role = user?.account_type;
      let price;

      switch (role) {
        case 'user':
          price = plan?.aUserPrice;
          break;
        case 'agent':
          price = plan?.aAgentPrice;
          break;
        case 'vendor':
          price = plan?.aVendorPrice;
          break;
        case 'dealer':
          price = plan?.aDealerPrice;
          break;
        default:
          price = plan?.aUserPrice;
      }

      return `Size: ${plan?.planSize} - Price: ₦${price}`;
    });

    setCustomPlan(customP);
  }, [network, plans]);

  const handlePurchase = async () => {
    if (!amount || !quantity || !businessName || network === 0) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'All fields are required',
        button: 'close',
      });
      return;
    }

    const plan = plans
      .filter((item) => item.planSize === amount.split(' ')[1])
      .find((item) => {
        if (item?.aNetwork.toString() === network.toString()) {
          return item;
        }
      });

    navigation.navigate('airtime pin model', {
      network,
      businessname: businessName,
      quantity,
      plan: plan,
    });
    return;
    setLoading(true);
    const response = await PurchaseAirtimePin({
      token,
      network,
      businessname: businessName,
      quantity,
      plan: plan?.nId,
    });

    setLoading(false);
    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
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

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Airtime Pin" />
      <PinNetworkSection active={network} setActive={setNetwork} />
      {network !== 0 && (
        <Dropdown
          text="Select Plan"
          data={customPlan}
          onSelectItem={setAmount}
        />
      )}
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
      <MyButton text="Continue" onPress={handlePurchase} isLoading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.window.windowWidth > 600 ? 20 : 10,
  },
});
