import { FlatList, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import Title from '../../components/global/Title';
import Row from '../../components/global/Row';
import { Image } from 'react-native';
import { Theme } from '../../constants/Theme';
import MyCard from '../../components/global/MyCard';
import Divider from '../../components/global/Divider';
import MyIcon from '../../components/global/MyIcon';

const theme = Theme();
export default function AggretorViewCustomer() {
  const dummyData = [
    { id: 1, name: 'Gladma umar Dahiru', wallet: 0 },
    { id: 2, name: 'Ade Mustpha', wallet: 10 },
    { id: 3, name: 'Ibrahim Yusuf', wallet: 200 },
  ];

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Customers" />
      <Title text="Registered Customers" header />
      <MyCard style={styles.card}>
        <FlatList
          data={dummyData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListItem item={item} />}
        />
      </MyCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  row: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  name: {
    textTransform: 'capitalize',
  },
  card: {
    marginTop: 10,
  },
  listContainer: {
    marginBottom: 10,
  },
});

const ListItem = ({ item }) => {
  return (
    <View style={styles.listContainer}>
      <Row>
        <Row style={styles.row}>
          <Image
            source={require('../../assets/avaters/1.png')}
            style={styles.image}
          />
          <View style={{ marginLeft: 10 }}>
            <Title text={item.name} bold position="start" style={styles.name} />
            <Title
              text={item.wallet}
              bold
              small
              position="start"
              color={theme.palette.grayDark}
            />
          </View>
        </Row>
        <MyIcon name="chevron-forward" color={theme.palette.gray} />
      </Row>
      <Divider />
    </View>
  );
};
