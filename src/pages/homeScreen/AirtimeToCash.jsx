import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import NetworkSection from '../../components/buyAirtime/NetworkSection';
import Title from '../../components/global/Title';
import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/Mybutton';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import {
  GetAirtimeSwapDetails,
  SendAirtimeSwapRequest,
} from '../../store/apis/services';
import calculatePercent from '../../constants/calculatePercentage';
import formatMoney from '../../constants/FormatNumber';
import MyCard from '../../components/global/MyCard';
import Row from '../../components/global/Row';
import NetworkLists from '../../constants/NetWorkLists';
import Dropdown from '../../components/global/Dropdown';

const theme = Theme();
const AirtimeToCash = () => {
  const [network, setNetwork] = useState(0);
  const [amount, setAmount] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.globalState);
  const navigation = useNavigation();
  const [details, setDetails] = useState([]);
  const [transferInfo, setTransferInfo] = useState({});
  const [info, setInfo] = useState({});
  const [paytype, setPaytype] = useState(null);
  const [description, setDescription] = useState('');

  const HandleGetAirtimeSwapDetails = async () => {
    const response = await GetAirtimeSwapDetails({ token });

    if (response?.status === 'success') {
      setDetails(response?.response);
    }
  };

  useEffect(() => {
    HandleGetAirtimeSwapDetails();
  }, []);

  useEffect(() => {
    if (network === 0 && Object.keys(details).length === 0) {
      return;
    }

    let networkName;
    NetworkLists.forEach((item) => {
      if (item.id.toString() === network.toString()) {
        networkName = item.name;
      }
    });

    // console.log(details);
    if (!networkName) {
      return;
    }

    switch (network) {
      case 1:
        setTransferInfo({
          networkName,
          pinsetcode: details?.mtnpinsetcode,
          discount: details?.mtndiscount,
          transfercode: details?.mtntransfercode,
          number: details?.mtn,
        });
        break;
      case 2:
        setTransferInfo({
          networkName,
          pinsetcode: details?.airtelpinsetcode,
          discount: details?.airteldiscount,
          transfercode: details?.airteltransfercode,
          number: details?.airtel,
        });
        break;
      case 3:
        setTransferInfo({
          networkName,
          pinsetcode: details?.glopinsetcode,
          discount: details?.glodiscount,
          transfercode: details?.glotransfercode,
          number: details?.glo,
        });
        break;
      case 4:
        setTransferInfo({
          networkName,
          pinsetcode: details?.ninemobilepinsetcode,
          discount: details?.ninemobilediscount,
          transfercode: details?.ninemobiletransfercode,
          number: details?.ninemobile,
        });
        break;
      default:
        setTransferInfo({
          networkName: '',
          pinsetcode: '',
          discount: '',
          transfercode: '',
        });
        break;
    }
    // console.log(transferInfo);
  }, [network, details]);

  const handleProceed = async () => {
    if (!amount || !number) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'All fields are required',
        button: 'close',
      });
    }

    if (paytype === 'BANK' && !description) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Description is required',
        button: 'close',
      });
      return;
    }
    let networkName;
    NetworkLists.forEach((item) => {
      if (item.id.toString() === network.toString()) {
        networkName = item.name;
      }
    });

    navigation.navigate('airtimeSwapModel', {
      amount,
      network,
      number,
      paytype,
      description,
      networkName,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SecondaryHeader text="Airtime Swap" />
        <NetworkSection
          airtimeSwap={details?.status}
          active={network}
          setActive={setNetwork}
        />
        <MyInput
          text="Sender Number"
          icon="call"
          value={number}
          type="number-pad"
          onChangeText={(t) => setNumber(t)}
        />
        {/* <Dropdown
          data={['WALLET', 'BANK']}
          text="Pay Type"
          onSelectItem={setPaytype}
        /> */}
        <MyInput
          text="Amount"
          icon="wallet"
          type="number-pad"
          value={amount}
          onChangeText={(t) => setAmount(t)}
        />
        {amount && (
          <Title
            text={`Amount To Be Credited ₦${formatMoney(
              calculatePercent(parseFloat(amount))
            )}`}
            position="left"
            small
            bold
          />
        )}
        {paytype === 'BANK' && (
          <MyInput
            text="Description"
            icon={'document-text'}
            value={description}
            onChangeText={(t) => setDescription(t)}
          />
        )}

        <MyButton text="Proceed" onPress={handleProceed} isLoading={loading} />
        {network !== 0 && (
          <View style={styles.itemContainer}>
            <Title
              text="Transfer Information"
              bold
              header
              color={theme.palette.black}
            />

            <AirtimeItem
              header={'Network'}
              // image={info?.image}
              title={transferInfo?.networkName}
            />
            <AirtimeItem header={'Phone Number'} title={transferInfo?.number} />
            <AirtimeItem
              header={'Set New Pin'}
              title={transferInfo?.pinsetcode}
            />
            <AirtimeItem
              header={'Transfer code'}
              title={transferInfo?.transfercode}
            />
          </View>
        )}

        <MyCard style={{ marginTop: 10 }}>
          <Title
            text="Note!"
            bold
            position="left"
            header
            color={theme.palette.red}
          />
          <Title
            text="Click on submit only when you have transfer the airtime."
            position="left"
            color={theme.palette.red}
          />
          <Title
            text="When verified, your wallet would be credited which you can further withdraw to your bank using the transfer option."
            position="left"
            color={theme.palette.red}
          />
        </MyCard>
      </ScrollView>
    </View>
  );
};
const AirtimeItem = ({ header, title, image }) => {
  return (
    <MyCard style={{ marginVertical: 2 }}>
      <Row style={styles.itemRow}>
        <Title text={header} bold small />
        <Row style={{ justifyContent: 'flex-end', maxWidth: '58%' }}>
          {image && <Image source={image} style={styles.image} />}
          <Title text={title} style={styles.title} />
        </Row>
      </Row>
    </MyCard>
  );
};
export default AirtimeToCash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: theme.window.windowWidth > 600 ? 20 : 10,
  },
  itemContainer: {
    marginTop: theme.window.windowWidth * 0.02,
  },
  itemRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 5,
  },
  title: {
    textAlign: 'right',
  },
});
