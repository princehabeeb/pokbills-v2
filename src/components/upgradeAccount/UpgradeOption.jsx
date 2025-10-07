import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CheckCircle } from 'react-native-feather';

import Row from '../global/Row';
import Title from '../global/Title';
import MyIcon from '../global/MyIcon';
import { Theme } from '../../constants/Theme';

const theme = Theme();
export default function UpgradeOption({
  level,
  amount,
  isDone,
  text,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.upgradeContainer,
          !isDone && { backgroundColor: theme.palette.gray },
        ]}
      >
        <Row style={{ justifyContent: 'space-between' }}>
          <Title
            text={`Level ${level}`}
            bold
            header
            color={!isDone ? theme.palette.black : theme.palette.white}
          />
          <Row>
            <Title
              text={amount}
              bold
              header
              color={!isDone ? theme.palette.black : theme.palette.white}
            />
            <Title
              text={'/day'}
              color={!isDone ? theme.palette.black : theme.palette.white}
            />
          </Row>
        </Row>
        <Row style={{ justifyContent: 'space-between', marginTop: 20 }}>
          <Title
            text={text}
            color={!isDone ? theme.palette.black : theme.palette.white}
            bold
            small
            style={styles.text}
          />
          {isDone ? (
            <CheckCircle color={theme.palette.white} />
          ) : (
            <MyIcon name="chevron-forward-circle-outline" />
          )}
        </Row>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  upgradeContainer: {
    backgroundColor: '#00bf62',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    maxWidth: '80%',
    flexWrap: 'wrap',
    textAlign: 'left',
  },
});
