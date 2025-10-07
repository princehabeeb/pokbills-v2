import { StyleSheet, View } from 'react-native';

import React from 'react';
import Row from './Row';
import { Theme } from '../../constants/Theme';

const theme = Theme();
const Dash = ({ style, margin }) => {
  return (
    <Row
      style={[
        styles.container,
        { ...style },
        { marginVertical: margin ? margin : 0 },
      ]}
    >
      <View style={styles.haveCircle} />
      <View style={styles.dash} />
      <View style={styles.haveCircleRight} />
    </Row>
  );
};

export default Dash;

const styles = StyleSheet.create({
  container: {},
  haveCircle: {
    width: 20,
    height: 20,
    borderRadius: 100,
    position: 'absolute',
    left: -30,
    borderRightWidth: 2,
    zIndex: 20,
    backgroundColor: theme.palette.white,
    borderColor: 'gray',
  },
  haveCircleRight: {
    width: 20,
    height: 20,
    borderRadius: 100,
    position: 'absolute',
    right: -30,
    borderLeftWidth: 2,
    zIndex: 20,
    backgroundColor: theme.palette.white,
    borderColor: 'gray',
  },
  dash: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    borderStyle: 'dashed',
  },
});
