import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import { FlashList } from '@shopify/flash-list';
import PinListItem from '../../components/pinScreens/PinListItem';
import Title from '../../components/global/Title';
import { useSelector } from 'react-redux';
import Loader from '../../components/loading/Loading';
import { GetDataPins } from '../../store/apis/services';

const theme = Theme();

export default function DataPinHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.globalState);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await GetDataPins({ token });

      setLoading(false);
      if (response.status === 'success') {
        setData(response.response);
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <SecondaryHeader text={'Purchased Pins'} />

      <View style={styles.list} />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Loader />
        </View>
      ) : (
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <PinListItem item={{ ...item, plan: item.datasize }} data />
          )}
          estimatedItemSize={10}
          ListEmptyComponent={() => (
            <View
              style={{
                minHeight: theme.window.windowHeight / 1.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Title text={'No Pin Purchased'} header />
            </View>
          )}
          keyExtractor={(item) => item?.tId}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.window.windowWidth * 0.05,
  },
  list: {
    marginTop: theme.window.windowWidth * 0.02,
  },
});
