import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { Theme } from '../../constants/Theme';
import MyIcon from './MyIcon';
import Row from './Row';
import Title from './Title';

const theme = Theme();
const LightInput = ({ text, style, value }) => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View style={[styles.input, style]}>
      <Row style={styles.row}>
        <Title text={text} color={theme.palette.grayDark} bold />
        <Title text={value} color={theme.palette.black} />
      </Row>
    </View>
  );
};

export default LightInput;

const styles = StyleSheet.create({
  input: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    borderColor: 'gray',
    paddingLeft: 10,
    backgroundColor: '#f1f2f4',
  },

  row: {
    justifyContent: 'space-between',
  },
});
