import VirtualKeyboard from 'react-native-virtual-keyboard';
import { StyleSheet, View } from 'react-native';
import React from 'react';

import { Theme } from '../../constants/Theme';

const theme = Theme();
const MyVirtualKeyBoard = ({ onPress }) => {
  return (
    <View style={styles.numberPad}>
      <VirtualKeyboard
        pressMode="string"
        onPress={onPress}
        rowStyle={styles.rowStyle}
        cellStyle={styles.cellStyle}
        textStyle={styles.textStyle}
        color={theme.palette.black}
      />
    </View>
  );
};

export default MyVirtualKeyBoard;

const styles = StyleSheet.create({
  numberPad: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    width: theme.window.windowWidth - 40,
    transform: [{ translateX: 5 }],
  },
  cellStyle: {
    borderWidth: 2,
    borderColor: theme.palette.gray,
    height: 60,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: theme.palette.white,
    elevation: 1,
  },
});
