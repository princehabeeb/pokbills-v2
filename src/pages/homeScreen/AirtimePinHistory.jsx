import { RefreshControl, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';

import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import PinListItem from '../../components/pinScreens/PinListItem';
import Title from '../../components/global/Title';
import { GetAirtimePins } from '../../store/apis/services';
import { useSelector } from 'react-redux';
import Loader from '../../components/loading/Loading';

const theme = Theme();

const AirtimePinHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.globalState);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await GetAirtimePins({ token });
      setLoading(false);
      if (response.status === 'success') {
        setData(response.response);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <SecondaryHeader text={'Purchased Pins'} />

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Loader />
        </View>
      ) : (
        <FlashList
          data={data}
          renderItem={({ item }) => {
            return <PinListItem item={{ ...item, plan: item.datasize }} />;
          }}
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
};

export default AirtimePinHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.window.windowWidth * 0.05,
  },
});
