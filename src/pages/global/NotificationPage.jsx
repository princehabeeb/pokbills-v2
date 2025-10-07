import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import MyCard from '../../components/global/MyCard';
import Row from '../../components/global/Row';
import MyIcon from '../../components/global/MyIcon';
import Title from '../../components/global/Title';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { GetNotifications } from '../../store/apis/global';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import FormatDate from '../../constants/FormatDate';
import Loader from '../../components/loading/Loading';

const NotificationPage = () => {
  const { token } = useSelector((state) => state.globalState);
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const getNotification = async () => {
    setLoading(true);
    const not = await GetNotifications({ token });
    setLoading(false);
    if (not?.status === 'success') {
      setNotification(not?.response);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <View style={{ margin: 10, flex: 1 }}>
      <SecondaryHeader text="Notification" />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Loader />
        </View>
      ) : (
        <FlashList
          estimatedItemSize={100}
          data={notification}
          ListEmptyComponent={() => (
            <Title text="No Notifications" style={{ marginTop: 20 }} header />
          )}
          renderItem={({ item }) => (
            <NotificationItem
              header={item?.subject}
              text={item?.message}
              date={FormatDate(item?.dPosted)}
            />
          )}
        />
      )}
    </View>
  );
};

export default NotificationPage;

const NotificationItem = ({ header, text, date }) => {
  return (
    <Pressable style={styles.container}>
      <MyCard style={styles.card}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Row>
            <MyIcon name="information-circle" style={{ marginRight: 10 }} />
            <Title text={header} bold />
          </Row>
          <Title text={date} small />
        </Row>
        <View>
          <Title position="start" text={text} small />
        </View>
      </MyCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
});
