import { StyleSheet, View, ScrollView, Linking } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import SnackBar from 'react-native-snackbar-component';

import MyCard from '../../components/global/MyCard';
import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import NoticeContainer from '../../components/fund/NoticeContainer';
import PaymentItem from '../../components/fund/PaymentItem';

import {
  GetManualFundingDetails,
  GetSiteDetails,
  submitManualFunding,
} from '../../store/apis/global';
import Loader from '../../components/loading/Loading';
import Row from '../../components/global/Row';
import MyButton from '../../components/global/Mybutton';
import TransparentButton from '../../components/global/TransParentButton';
import Clipboard from '@react-native-clipboard/clipboard';
import MyInput from '../../components/global/MyInput';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const theme = Theme();
export default function ManualFundingPage() {
  const [details, setDetails] = useState({});
  const { token } = useSelector((state) => state.globalState);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [sendLoading, setSendLoading] = useState();
  const [data, setData] = useState({
    amount: '',
    account: '',
    method: '',
  });

  useEffect(() => {
    (async () => {
      // setLoading(true);
      const response = await GetManualFundingDetails({ token });
      setLoading(false);
      if (response.status === 'success') {
        setDetails(response?.response);
      }
    })();
  }, []);

  useEffect(() => {
    const getSiteSettings = async () => {
      try {
        // setLoading(true);
        const siteDetails = await GetSiteDetails({ token });
        setLoading(false);
        if (siteDetails?.status === 'success') {
          // Use the setSettings function to update the state
          setSettings(siteDetails?.response);
        }
      } catch (error) {
        console.error('Error fetching site details:', error);
        setLoading(false);
      }
    };

    getSiteSettings();
  }, [token]);

  const copyAccountNumber = () => {
    Clipboard.setString(settings?.accountno);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleChange = (field, text) => {
    setData((prev) => ({ ...prev, [field]: text }));
  };
  const HandleContactAdmin = async () => {
    console.log(data);
    if (
      data?.amount.length === 0 ||
      data?.account.length === 0 ||
      data?.method.length === 0
    ) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'All fields are required',
        button: 'close',
      });
      return;
    }
    setSendLoading(true);
    const response = await submitManualFunding({
      payaccount: data?.account,
      payamount: data?.amount,
      paymethod: data?.method,
      token,
    });
    setSendLoading(false);

    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: response?.message,
        button: 'close',
      });
    }
    if (response?.status === 'success') {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: response?.message,
        button: 'close',
      });
    }

    setData({ amount: '', account: '', method: '' });

    settings?.whatsapp
      ? Linking.openURL(`https://wa.me/${settings?.whatsapp}`)
      : '';
  };

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Manual Funding" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <NoticeContainer
          text1="Transfer money to the following account"
          text2="Make sure you send the proof of your payment"
        />
        {loading ? (
          <MyCard style={styles.LoaderContainer}>
            <Loader />
          </MyCard>
        ) : (
          <>
            <MyCard style={styles.card}>
              <PaymentItem
                icon="university"
                title="Bank Name:"
                subTitle={settings?.bankname}
                material
              />
              <PaymentItem
                icon="person"
                title="Account Name:"
                subTitle={settings?.accountname}
              />
              <PaymentItem
                icon="phone-portrait"
                title="Account Number:"
                subTitle={settings?.accountno}
              />
              <PaymentItem
                icon="wallet"
                title="Charges:"
                subTitle={settings?.manualfundfee}
              />
              <TransparentButton
                text="Copy Account number"
                style={styles.button}
                onPress={copyAccountNumber}
              />
            </MyCard>

            <MyInput
              text="Amount"
              value={data.amount}
              onChangeText={(e) => handleChange('amount', e)}
              type="number-pad"
            />
            <MyInput
              text="Payment Account Details"
              value={data.account}
              onChangeText={(e) => handleChange('account', e)}
            />
            <MyInput
              text="Payment Method"
              value={data.method}
              onChangeText={(e) => handleChange('method', e)}
              style={{ marginBottom: 40 }}
            />

            <MyButton
              text={sendLoading ? 'Sending...' : 'I have sent the money'}
              style={styles.button}
              onPress={HandleContactAdmin}
            />
          </>
        )}
      </ScrollView>
      {/* <SnackBar
        visible={isCopied}
        textMessage="Account Number copied to clipboard"
        backgroundColor={theme.palette.black}
        messageColor={theme.palette.white}
        bottom={10}
        left={10}
        right={10}
        actionHandler={() => {
          setIsCopied(false);
        }}
        actionText="Ok"
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.window.windowWidth * 0.04,
  },
  card: {
    marginTop: 30,
    alignSelf: 'stretch',
  },
  LoaderContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    // width: '50%',
  },
});
