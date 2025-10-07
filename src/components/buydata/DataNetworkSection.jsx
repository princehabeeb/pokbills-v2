import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import NetWorkLists, { DataNetworkLists } from '../../constants/NetWorkLists';
import { Theme } from '../../constants/Theme';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Title from '../global/Title';
import { useEffect } from 'react';
import NetworkItem from '../buyAirtime/NetworkItem';
import NetworkLists from '../../constants/NetWorkLists';

const theme = Theme();
const DataNetworkSection = ({ active, setActive, airtimePinStatus }) => {
  const { netWorkSettings } = useSelector((state) => state.globalState);

  const handleClick = ({ item }) => {
    netWorkSettings?.map((network) => {
      if (parseInt(network.nId) === item.id) {
        if (
          airtimePinStatus
            ? network.airtimePinStatus
            : network.networkStatus.toLowerCase() !== 'on'
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
  };

  return (
    <View style={styles.container}>
      <Title text="Select Network" bold color={theme.palette.grayDark} />
      <FlatList
        data={DataNetworkLists}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <NetworkItem
            item={item}
            active={active}
            onPress={() => handleClick({ item })}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          width: '100%',
          justifyContent: 'space-between',
        }}
        horizontal
      />
    </View>
  );
};

export default DataNetworkSection;

const styles = StyleSheet.create({
  container: {
    marginTop: theme.window.windowWidth > 600 ? 20 : 10,
  },
});
