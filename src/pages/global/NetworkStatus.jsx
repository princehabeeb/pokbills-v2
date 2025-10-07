import { View, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import Title from '../../components/global/Title';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

const theme = Theme();

const progress = 90;
const NetworkStatus = () => {
  const { airtimeNetWorkStatus, dataNetworkStatus } = useSelector(
    (state) => state.globalState
  );
  const [networkLists, setNetworkLists] = useState([]);
  const route = useRoute().params;

  useEffect(() => {
    if (route?.type === 'data') {
      setNetworkLists([
        {
          name: 'MTN',
          image: require('../../assets/mtn.jpg'),
          networkProgress: dataNetworkStatus?.mtnCount,
          networkStatus: dataNetworkStatus?.mtnStatus,
        },
        {
          name: 'MTN SME',
          image: require('../../assets/mtn.jpg'),
          networkProgress: dataNetworkStatus?.mtnsmeCount,
          networkStatus: dataNetworkStatus?.mtnsmeStatus,
        },
        {
          name: 'MTN CG',
          image: require('../../assets/mtn.jpg'),
          networkProgress: dataNetworkStatus?.mtncgCount,
          networkStatus: dataNetworkStatus?.mtncgStatus,
        },
        {
          name: 'Airtel',
          image: require('../../assets/airtel.png'),
          networkProgress: dataNetworkStatus?.airtelCount,
          networkStatus: dataNetworkStatus?.airtelStatus,
        },
        {
          name: 'Glo',
          image: require('../../assets/glo.png'),
          networkProgress: dataNetworkStatus?.gloCount,
          networkStatus: dataNetworkStatus?.gloStatus,
        },
        {
          name: '9Mobile',
          image: require('../../assets/nmobile.png'),
          networkProgress: dataNetworkStatus?.nineMobileCount,
          networkStatus: dataNetworkStatus?.nineMobileStatus,
        },
      ]);
    } else {
      setNetworkLists([
        {
          name: 'MTN',
          image: require('../../assets/mtn.jpg'),
          networkProgress: airtimeNetWorkStatus?.mtnCount,
          networkStatus: airtimeNetWorkStatus?.mtnStatus,
        },
        {
          name: 'Airtel',
          image: require('../../assets/airtel.png'),
          networkProgress: airtimeNetWorkStatus?.airtelCount,
          networkStatus: airtimeNetWorkStatus?.airtelStatus,
        },
        {
          name: 'Glo',
          image: require('../../assets/glo.png'),
          networkProgress: airtimeNetWorkStatus?.gloCount,
          networkStatus: airtimeNetWorkStatus?.gloStatus,
        },
        {
          name: '9Mobile',
          image: require('../../assets/nmobile.png'),
          networkProgress: airtimeNetWorkStatus?.nineMobileCount,
          networkStatus: airtimeNetWorkStatus?.nineMobileStatus,
        },
      ]);
    }
  }, [airtimeNetWorkStatus]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <SecondaryHeader text="Network Status" />

        {networkLists.map((network, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={network.image} style={styles.image} />
            <View style={styles.progressContainer}>
              <Title text={network.name} bold />
              <View style={[styles.sliderContainer]}>
                <View
                  style={[
                    styles.sliderItem,
                    {
                      width: `${network?.networkProgress}%`,
                      backgroundColor:
                        network?.networkStatus?.toLowerCase() === 'danger'
                          ? 'red'
                          : network.networkStatus?.toLowerCase() === 'success'
                          ? 'green'
                          : 'orange',
                    },
                  ]}
                ></View>
              </View>
              <Title
                text={`${network?.networkProgress}% ${network?.networkStatus}`}
                small
                color={
                  network?.networkStatus?.toLowerCase() === 'danger'
                    ? 'red'
                    : network.networkStatus?.toLowerCase() === 'success'
                    ? 'green'
                    : 'orange'
                }
                textTransform="capitalize"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NetworkStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.window.windowWidth > 600 ? 20 : 10,
    backgroundColor: '#eee',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    width: theme.window.windowWidth * 0.6,
  },
  sliderContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
    overflow: 'hidden',
  },
  sliderItem: {
    height: 10,
    borderRadius: 5,
  },
});
