import * as Icon from 'react-native-feather';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { ScrollView } from 'react-native';

import { Theme } from '../../constants/Theme';
import Title from '../../components/global/Title';
import ListItem from '../../components/global/ListItem';
import MyButton from '../../components/global/Mybutton';
import { useSelector } from 'react-redux';
import useGetAvatar from '../../hooks/useGetAvater';
import CustomAlert from '../../components/global/CustomAlert';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AgentUpgrade,
  AggregatorUpgrade,
  vendorUpgrade,
} from '../../store/apis/UpgradeAccount';
import formatMoney from '../../constants/FormatNumber';
import { GetSiteDetails } from '../../store/apis/global';
import useSaveUser from '../../hooks/saveUser';

const theme = Theme();
export default function ProfilePage() {
  const navigation = useNavigation();
  const { user, token } = useSelector((state) => state.globalState);
  const avatar = useGetAvatar();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAggregatorAlert, setShowAggregatorAlert] = useState(false);
  const [pin, setPin] = useState('');
  const [showUpgradetoVendor, setShowUpgradeVendor] = useState(false);
  const [siteSettings, setSiteSettings] = useState({});
  const { getUserInfo } = useSaveUser();

  const upgradeToAgent = async () => {
    if (!pin) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Missing Fields',
        textBody: 'Please provide pin',
        button: 'close',
      });
      return;
    }
    setLoading(true);
    const response = await AgentUpgrade({ token, pin });
    setLoading(false);
    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Upgrade Fail',
        textBody: response.message,
        button: 'close',
      });
      return;
    }
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Upgrade Successful',
      textBody: response.message,
      button: 'close',
    });
    getUserInfo();
    setShowAlert(false);
  };

  const upgradeToAggregator = async () => {
    if (!pin) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Missing Fields',
        textBody: 'Please provide pin',
        button: 'close',
      });
      return;
    }

    setLoading(true);
    const response = await AggregatorUpgrade({ token, pin });
    setLoading(false);
    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Upgrade Fail',
        textBody: response.message,
        button: 'close',
      });
      setShowAlert(false);
      return;
    }
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Upgrade Successful',
      textBody: response.message,
      button: 'close',
    });
    getUserInfo();
    setShowAlert(false);
  };
  const handleUpgradeToVendor = async () => {
    if (!pin) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Missing Fields',
        textBody: 'Please provide pin',
        button: 'close',
      });
      return;
    }

    setLoading(true);
    const response = await vendorUpgrade({ token, pin });
    setLoading(false);
    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Upgrade Fail',
        textBody: response.message,
        button: 'close',
      });
      setShowAlert(false);
      return;
    }
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Upgrade Successful',
      textBody: response.message,
      button: 'close',
    });
    setShowAlert(false);
  };

  const getSiteSettings = async () => {
    const response = await GetSiteDetails({ token });
    if (response.status === 'success') {
      setSiteSettings(response.response);
    }
  };
  useEffect(() => {
    getSiteSettings();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View style={styles.container}>
      <CustomAlert
        isVisible={showAlert}
        message={`Are you sure you want to upgrade To an Agent, you will be charge a sum of NGN${formatMoney(
          parseInt(siteSettings?.agentupgrade || 0)
        )} for this action`}
        onCancel={() => setShowAlert(false)}
        onLogIn={upgradeToAgent}
        loading={loading}
        pin={pin}
        setPin={setPin}
      />
      <CustomAlert
        isVisible={showAggregatorAlert}
        message="Are you sure you want to upgrade To an Aggregator,"
        onCancel={() => setShowAggregatorAlert(false)}
        onLogIn={upgradeToAggregator}
        loading={loading}
        pin={pin}
        setPin={setPin}
      />
      <CustomAlert
        isVisible={showUpgradetoVendor}
        message={`Are you sure you want to upgrade To Vendor, you will be charge a sum of NGN${formatMoney(
          parseInt(siteSettings?.vendorupgrade)
        )} for this action`}
        onCancel={() => setShowUpgradeVendor(false)}
        onLogIn={handleUpgradeToVendor}
        loading={loading}
        pin={pin}
        setPin={setPin}
      />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Title text="My Account" header color={theme.palette.black} />
        <View style={styles.imageContainer}>
          {avatar ? (
            <Image source={avatar} style={styles.image} />
          ) : (
            <ActivityIndicator size="large" color={theme.palette.primary} />
          )}
          <Pressable
            style={styles.iconCard}
            onPress={() =>
              navigation.navigate('select avatar page', {
                isNew: false,
              })
            }
          >
            <Icon.Edit3 color={theme.palette.black} />
          </Pressable>
        </View>
        <Title
          text={`${user?.firstname} ${user?.lastname}`}
          header
          color={theme.palette.black}
          style={{ textTransform: 'capitalize' }}
        />
        {/* <Title
          text={`${user?.account_type} (Level ${user?.account_level})`}
          small
          style={{ textTransform: 'capitalize' }}
          color="gray"
        /> */}
        <View style={{ marginTop: 30 }}>
          <ListItem
            header="Personal info"
            text="View account details"
            feater={<Icon.User color={theme.palette.black} />}
            onPress={() => navigation.navigate('personal info screen')}
          />
          <ListItem
            header="Settings"
            text="Account, Biometric, Notification"
            feater={<Icon.Settings color={theme.palette.black} />}
            onPress={() => navigation.navigate('settingPage')}
          />
          <ListItem
            header="security"
            text="Transaction Pin, Password"
            feater={<Icon.Shield color={theme.palette.black} />}
            onPress={() => navigation.navigate('Security screen')}
          />

          <ListItem
            header="Agent"
            text="Become an agent for less charges"
            feater={<Icon.UserPlus color={theme.palette.black} />}
            onPress={() =>
              user?.account_type.toLowerCase() === 'agent'
                ? Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Upgrade Fail',
                    textBody: 'You are already an agent',
                    button: 'close',
                  })
                : setShowAlert(true)
            }
          />
          <ListItem
            header="Vendor"
            text="Become an Vendor for less charges"
            feater={<Icon.UserPlus color={theme.palette.black} />}
            onPress={() =>
              user?.account_type.toLowerCase() === 'vendor'
                ? Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Upgrade Fail',
                    textBody: 'You are already an agent',
                    button: 'close',
                  })
                : setShowUpgradeVendor(true)
            }
          />

          <ListItem
            header="Referrals"
            text="Earn passive referral commission"
            icon="people-outline"
            onPress={() => navigation.navigate('referrals page')}
          />
          {/* <ListItem
            header="Aggregators"
            text="Manage customer, earn commission"
            icon="analytics"
            onPress={() => {
              user?.is_aggregator !== 'yes'
                ? setShowAggregatorAlert(true)
                : navigation.navigate('aggregatorsPage');
            }}
          /> */}
          <ListItem
            header="Perform KYC"
            text="Verify your account"
            feater={<Icon.ArrowUpCircle color={theme.palette.black} />}
            onPress={() => {
              if (user?.kycstatus) {
                Dialog.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'KYC Fail',
                  textBody: 'You have already done KYC',
                  button: 'close',
                });
              }
              navigation.navigate('level 2');
            }}
          />
          <MyButton
            text="Logout"
            style={{ backgroundColor: 'brown' }}
            onPress={() => {
              navigation.navigate('welcomePage');
            }}
          />
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  imageContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconCard: {
    height: 35,
    width: 35,
    position: 'absolute',
    backgroundColor: theme.palette.gray,
    bottom: 0,
    right: 0,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow,
  },
  scroll: {
    marginTop: 20,
  },
});
