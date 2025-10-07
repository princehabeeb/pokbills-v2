import { StyleSheet, Switch, View } from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';

import Row from './Row';
import Title from './Title';
import { Theme } from '../../constants/Theme';
import MyIcon from './MyIcon';

const theme = Theme();
export default function MySwitch({ isEnabled, toggleSwitch, text }) {
  return (
    <Row style={styles.container}>
      <Row>
        <View
          style={{
            backgroundColor: '#dfecf7',
            padding: 5,
            borderRadius: 5,
            marginRight: 5,
          }}
        >
          {/* <Icon.Sidebar color={'#91a9e2'} /> */}
        </View>
        <Title
          text={text}
          header
          color={theme.palette.black}
          style={{ textTransform: 'capitalize' }}
        />
      </Row>
      <Switch
        trackColor={{ false: '#767577', true: '#436dfe' }}
        thumbColor={'gray'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: 'space-between',
    backgroundColor: theme.palette.white,
    padding: 10,
    borderRadius: 10,
    overFlow: 'hidden',
  },
});
