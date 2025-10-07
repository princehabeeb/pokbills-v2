import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import Title from '../../components/global/Title';
import { Theme } from '../../constants/Theme';
import Row from '../../components/global/Row';
import MyCard from '../../components/global/MyCard';
import Divider from '../../components/global/Divider';
import { Copy } from 'react-native-feather';

const theme = Theme();
export default function AggregatorViewComission() {
  return (
    <View style={styles.container}>
      <SecondaryHeader text="Commission" />
      <ScrollView>
        <Row style={styles.row}>
          <MyCard elevation={0} style={styles.numberContainer}>
            <Title text="Customers" color={theme.palette.primary} bold />
            <Title text={3} bold />
          </MyCard>
          <MyCard elevation={0} style={styles.numberContainer}>
            <Title text="Customers" color={theme.palette.primary} bold />
            <Title text={3} bold />
          </MyCard>
        </Row>

        <MyCard elevation={0} style={styles.linkContainer}>
          <Title text="Aggregator Link" color={theme.palette.primary} bold />
          <Divider />
          <Title
            text="https://primebiller.com/devsandbox404/api/v1/user/aggregatorbonus"
            style={styles.link}
          />
          <Row style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'red' }]}
            >
              <Title text="Copy" color={theme.palette.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'green' }]}
            >
              <Title text="Withdraw" color={theme.palette.white} />
            </TouchableOpacity>
          </Row>
        </MyCard>

        <MyCard elevation={0} style={styles.linkContainer}>
          <Title text="Commission List" />
        </MyCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  numberContainer: {
    width: theme.window.windowWidth / 2.2,
  },
  row: {
    justifyContent: 'space-around',
    marginTop: 20,
  },
  linkContainer: {
    marginTop: 20,
  },
  link: {
    backgroundColor: theme.palette.gray,
    padding: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 100,
    margin: 10,
  },
  buttonRow: {
    justifyContent: 'center',
  },
});
