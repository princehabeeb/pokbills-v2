import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import MyCard from '../global/MyCard';
import Title from '../global/Title';
import { Theme } from '../../constants/Theme';
import Row from '../global/Row';
import MyIcon from '../global/MyIcon';
import MyPressable from '../global/MyPressable';

const theme = Theme();
export default function PaymentOptions({ header, title, onclick }) {
  return (
    <MyPressable onPress={onclick}>
      <MyCard style={styles.container}>
        <Title
          text={header}
          bold
          position="start"
          style={{ color: theme.palette.black }}
        />
        <Row>
          <Title text={title} style={styles.text} small />
        </Row>
        <MyIcon
          name="chevron-forward-outline"
          style={styles.icon}
          size={theme.window.windowWidth > 600 ? 50 : 30}
        />
      </MyCard>
    </MyPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    backgroundColor: theme.palette.white,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    color: theme.palette.grayDark,
    marginRight: 'auto',
    maxWidth: '80%',
    marginTop: 5,
    textAlign: 'left',
  },
  icon: {
    position: 'absolute',
    right: 10,
    color: theme.palette.grayDark,
  },
});
