import {
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import Constants from 'expo-constants';

import { Theme } from '../../constants/Theme';
import InfoCard from '../../components/homePage/InfoCard';
import QuickActions from '../../components/homePage/QuickActions';
import {
  GetAirtimeNetworkStatus,
  GetDataNetworkStatus,
  GetDataPlans,
  GetHomeNotification,
  GetNetworkSettings,
} from '../../store/apis/services';
import LoadingPage from '../../components/loading/LoadingPage';
import useSaveUser from '../../hooks/saveUser';
import Carousel from '../../components/Carousel/Carousel';
import { HomeBanner } from '../../constants/HomeBannerList';
import {
  resetContactNumber,
  saveSiteSettings,
  setAirtimeNetwork,
  setContact,
  setDataNetwork,
  setDataPlans,
  setHasShowNotification,
} from '../../store/globalState';
import { GetSiteDetails } from '../../store/apis/global';
import Title from '../../components/global/Title';
import MyButton from '../../components/global/Mybutton';
import TransparentButton from '../../components/global/TransParentButton';
import { StackActions, useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const theme = Theme();

const HomeScreen = () => {
  const { token, hasShowNotification, user } = useSelector(
    (state) => state.globalState
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { getUserInfo } = useSaveUser();
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const navigation = useNavigation();

  const onRefresh = async () => {
    // Set refreshing to true
    setRefreshing(true);

    // Fetch data again
    await getDataPlans();
    await getNSettings();
    await getUserInfo();
    await GetAirtimeNetwork();
    await GetDataNetwork();

    // Set refreshing to false after data fetching is complete
    setRefreshing(false);
  };

  const getDataPlans = async () => {
    // setLoading(true);
    try {
      const response = await GetDataPlans({ token });
      dispatch(setDataPlans(response?.response));
    } catch (error) {
      console.error('Error fetching data plans:', error);
      // Handle the error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Session Expire',
        textBody: 'Please login again',
        button: 'close',
      });
      navigation.dispatch(StackActions.popToTop());
      navigation.replace('welcomePage');
    }
  }, [user]);
  const getNSettings = async () => {
    // setLoading(true);
    try {
      const response = await GetNetworkSettings({ token });
      if (response?.status === 'success') {
        dispatch(setContact(response?.response));
      }
    } catch (error) {
      console.error('Error fetching network settings:', error);
      // Handle the error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  const GetAirtimeNetwork = async () => {
    try {
      const response = await GetAirtimeNetworkStatus({ token });
      if (response?.status === 'success') {
        dispatch(setAirtimeNetwork(response?.response));
      }
    } catch (error) {
      console.error('Error fetching network settings:', error);
      // Handle the error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  const GetDataNetwork = async () => {
    try {
      const response = await GetDataNetworkStatus({ token });
      if (response?.status === 'success') {
        dispatch(setDataNetwork(response?.response));
      }
    } catch (error) {
      console.error('Error fetching network settings:', error);
      // Handle the error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  const getHomeNotification = async () => {
    try {
      const response = await GetHomeNotification({ token });
      if (response?.status === 'success') {
        const noti = response?.response;
        setNotification(noti);
        if (noti?.display.toLowerCase() === 'on' && !hasShowNotification) {
          setShowNotification(true);
          dispatch(setHasShowNotification());
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(resetContactNumber());
  }, []);

  useEffect(() => {
    getDataPlans();
    getUserInfo();
    getNSettings();
    GetAirtimeNetwork();
    GetDataNetwork();
  }, []);

  useEffect(() => {
    if (Object.keys(notification).length !== 0) return;
    getHomeNotification();
  }, []);

  useEffect(() => {
    const getNetworkSettings = async () => {
      const response = await GetSiteDetails({ token });
      if (response?.status !== 'success') return;
      dispatch(saveSiteSettings(response?.response));
    };
    getNetworkSettings();
  }, []);

  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <Modal visible={showNotification} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.alertBox}>
            <Title text={notification?.subject} header />
            <Title style={{ marginTop: 10 }} text={notification?.message} />

            <MyButton
              text="Ok"
              style={{ marginTop: 10 }}
              onPress={() => setShowNotification(false)}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={isVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.alertBox}>
            <Title text="New Update Available" header />
            <Title
              style={{ marginTop: 10 }}
              position="left"
              text={`Please update to the latest version to enjoy the best experience and access new features.`}
            />
            <Title
              style={{ marginTop: 10 }}
              position="left"
              text='Click the "Update" button to install the latest version.'
            />
            <MyButton text="Update" style={{ marginTop: 20 }} />
            <TransparentButton
              text="cancel"
              style={{ marginTop: 5 }}
              onPress={() => setIsVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <LoadingPage show={loading} />
      <StatusBar
        backgroundColor={theme.palette.primary}
        barStyle="light-content"
        translucent
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <InfoCard />
        <View style={styles.container}>
          <QuickActions />
          <Carousel data={HomeBanner} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: theme.window.windowWidth * 0.05,
    backgroundColor: '#F5F1F7',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});
