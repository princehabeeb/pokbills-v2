import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { FlashList } from '@shopify/flash-list';
import Title from '../../components/global/Title';
import MyIcon from '../../components/global/MyIcon';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BaseUrl } from '../../store/apis/api';
import Loader from '../../components/loading/Loading';

const theme = Theme();
export default function HelpPage() {
  const [codes, setCodes] = useState([]);
  const { token } = useSelector((state) => state.globalState);
  const [loading, setLoading] = useState(false);

  const getCodes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}help-codes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      if (response?.data?.status === 'success') {
        setCodes(response?.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCodes();
  }, []);

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Help Codes" />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Loader />
        </View>
      ) : (
        <FlashList
          estimatedItemSize={100}
          numColumns={2}
          data={codes}
          renderItem={({ item }) => (
            <View style={styles.itemcontainer} key={item?.hId}>
              <MyIcon name="call-outline" />
              <Title small text={item?.title} />
              <Title bold text={item?.content} small />
            </View>
          )}
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
  itemcontainer: {
    backgroundColor: theme.palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 5,
    flex: 1,
    paddingVertical: 20,
  },
});
