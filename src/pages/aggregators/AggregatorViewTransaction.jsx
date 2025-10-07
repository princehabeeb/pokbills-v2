import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import Title from '../../components/global/Title';
import MyInput from '../../components/global/MyInput';
import Row from '../../components/global/Row';
import { Theme } from '../../constants/Theme';
import MyCard from '../../components/global/MyCard';
import formatMoney from '../../constants/FormatNumber';

const theme = Theme();
export default function AggregatorViewTransaction() {
  const dummyData = [
    {
      id: 1,
      name: 'Gladma umar Dahiru',
      message:
        'Data - Purchase of MTN 1GB SME 30 Days Plan for Phone Number +2348100000000',
      wallet: 0,
      ref: 34567890,
      date: '28/04/2023',
      status: 'success',
    },
    {
      id: 2,
      name: 'umar Dahiru',
      message:
        'Data - Purchase of MTN 1GB SME 30 Days Plan for Phone Number +2348100000000',
      wallet: 230,
      ref: 34567890,
      date: '28/04/2023',
      status: 'fail',
    },
    {
      id: 3,
      name: 'Ibrahim Yusuf',
      message:
        'Data - Purchase of MTN 1GB SME 30 Days Plan for Phone Number +2348100000000',
      wallet: 1110,
      ref: 34567890,
      date: '28/04/2023',
      status: 'success',
    },
  ];
  return (
    <View style={styles.container}>
      <SecondaryHeader text=" Transaction" />
      <Title text="Customers Transaction" header />
      <MyInput text="Search..." icon="search" />
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {},
  row: {
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 10,
  },
  textContainer: {
    marginBottom: 10,
    marginLeft: 10,
    flex: 1,
  },
  endContainer: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginLeft: 3,
  },
});

const ListItem = ({ item }) => {
  let color;

  if (item.status === 'success') {
    color = 'green';
  } else {
    color = theme.palette.red;
  }

  return (
    <MyCard style={styles.card}>
      <Row style={styles.row}>
        <View style={styles.textContainer}>
          <Title
            text={item.name}
            color={theme.palette.primary}
            textTransform={'capitalize'}
            position={'start'}
            bold
            style={{ marginTop: 5 }}
          />
          <Title
            text={item.message}
            position={'start'}
            color={theme.palette.grayDark}
          />
          <Title
            text={`Ref: ${item.ref}`}
            position={'start'}
            small
            color={theme.palette.grayDark}
            style={{ marginTop: 5 }}
          />
        </View>
        <View style={styles.endContainer}>
          <Title
            text={`₦${formatMoney(parseInt(item.wallet))}`}
            bold
            color={theme.palette.black}
          />

          <Title
            text={item.date}
            small
            color={theme.palette.grayDark}
            style={{ marginTop: 5 }}
          />
          <Title text={item.status} small bold color={color} />
        </View>
      </Row>
    </MyCard>
  );
};
