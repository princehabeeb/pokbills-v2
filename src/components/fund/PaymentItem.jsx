import { StyleSheet, View } from 'react-native';
import React from 'react';

import Row from '../global/Row';
import MyIcon from '../global/MyIcon';
import Title from '../global/Title';
import { Theme } from '../../constants/Theme';

const theme = Theme();
export default function PaymentItem({ icon, subTitle, title, material }) {
  return (
    <Row style={styles.container}>
      <Row>
        <MyIcon name={icon} material={material} />
        <Title text={title} style={{ marginLeft: 5 }} small bold />
      </Row>

      <Title
        text={subTitle}
        bold
        color={theme.palette.grayDark}
        small
        style={{ maxWidth: '60%' }}
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'space-between',
  },
});
