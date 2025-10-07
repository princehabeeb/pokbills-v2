import { StyleSheet } from 'react-native';
import React from 'react';

import Title from '../global/Title';
import MyIcon from '../global/MyIcon';
import MyCard from '../global/MyCard';
import { Theme } from '../../constants/Theme';
import Row from '../global/Row';
import MyPressable from '../global/MyPressable';

const theme = Theme();
export default function BankTransferItem({
  header,
  type,
  title,
  onclick,
  name,
  isCopied,
}) {
  return (
    <MyCard style={styles.container}>
      <Title
        text={header}
        position="left"
        bold
        style={{ color: theme.palette.black }}
      />

      <Row style={styles.rowContainer}>
        <Title text={title} style={styles.copyText} small />
        <MyPressable onPress={onclick} style={styles.icon}>
          <MyIcon
            name={isCopied ? 'checkmark-outline' : 'copy-outline'}
            size={20}
            color={theme.palette.grayDark}
          />
        </MyPressable>
      </Row>
      {name && (
        <Title
          text={`Transaction fee ${type === 'flat' ? 'N' : ''}${name} ${
            type === 'flat' ? '' : '%'
          }`}
          small
          color={theme.palette.grayDark}
        />
      )}
    </MyCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.window.windowWidth * 0.02,
    backgroundColor: theme.palette.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  text: {
    color: theme.palette.grayDark,
    marginTop: 5,
    fontWeight: 'bold',
  },
  icon: {},
  copyText: {},
  rowContainer: {
    backgroundColor: theme.palette.gray,
    padding: 10,
    paddingVertical: 5,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
