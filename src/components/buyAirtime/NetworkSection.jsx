import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import NetworkItem from './NetworkItem';
import NetWorkLists, {
  AirtimeNetworkLists,
} from '../../constants/NetWorkLists';
import { Theme } from '../../constants/Theme';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Title from '../global/Title';
import { useEffect } from 'react';

const theme = Theme();
const NetworkSection = ({
  active,
  setActive,
  airtimePinStatus,
  airtimeSwap,
}) => {
  const { netWorkSettings } = useSelector((state) => state.globalState);

  const handleClick = ({ item }) => {
    if (airtimeSwap) {
      netWorkSettings?.map((network) => {
        if (parseInt(network.nId) === item.id) {
          if (airtimeSwap.toLowerCase() !== 'on') {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Unavailable',
              textBody: `Airtime to cash is currently unavailable please try again later `,
              button: 'close',
            });
            return;
          }
          setActive(item.id);
        }
      });
    } else {
      netWorkSettings?.map((network) => {
        if (parseInt(network.nId) === item.id) {
          if (
            airtimePinStatus
              ? network.airtimePinStatus
              : network.networkStatus !== 'On'
          ) {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Unavailable',
              textBody: `${network.network} is currently unavailable please try again later `,
              button: 'close',
            });
            return;
          }
          setActive(item.id);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Title text="Select Network" bold color={theme.palette.grayDark} />
      <FlatList
        data={AirtimeNetworkLists}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <NetworkItem
            item={item}
            active={active}
            onPress={() => handleClick({ item })}
          />
        )}
        keyExtractor={(item) => item.id}
        contentCon
        tainerStyle={{
          justifyContent: 'space-between',
        }}
        horizontal
      />
    </View>
  );
};

export default NetworkSection;

const styles = StyleSheet.create({
  container: {
    marginTop: theme.window.windowWidth > 600 ? 20 : 10,
  },
});
