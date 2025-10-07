import { StyleSheet, View } from 'react-native';
import React from 'react';

import Row from '../global/Row';
import MyIcon from '../global/MyIcon';
import { Theme } from '../../constants/Theme';
import Title from '../global/Title';
import Divider from '../global/Divider';

const theme = Theme();
export default function TransactionItem() {
  return (
    <>
      <Divider />
      <Row style={{ justifyContent: 'space-between' }}>
        <Row>
          <View style={styles.iconContainer}>
            <MyIcon name="checkmark" color="green" />
          </View>
          <Title text="Airtime Purchase" />
        </Row>
        <Title text="13:10" />
        <Title text="-₦13:10" />
      </Row>
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: theme.palette.gray,
    padding: 3,
    borderRadius: 50,
    paddingHorizontal: 4,
    marginRight: 10,
  },
});
