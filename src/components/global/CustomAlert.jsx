import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

import { Theme } from '../../constants/Theme';
import MyButton from './Mybutton';
import Title from './Title';
import TransparentButton from './TransParentButton';
import MyInput from './MyInput';

const theme = Theme();
const CustomAlert = ({
  isVisible,
  message,
  onLogIn,
  onCancel,
  loading,
  pin,
  setPin,
}) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.alertBox}>
          <Title text={message} header color={theme.palette.black} />
          <MyInput
            style={{ width: '95%' }}
            text={'Enter Pin'}
            onChangeText={(text) => setPin(text)}
            icon={'lock-closed'}
            value={pin}
            password
          />
          {loading ? (
            <View style={{ width: '100%' }}>
              <MyButton isLoading={loading} />
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TransparentButton
                style={styles.button}
                text="Continue"
                onPress={onLogIn}
              />
              <TransparentButton
                style={styles.button}
                text="Cancel"
                onPress={onCancel}
                color={theme.palette.red}
                borderColor={theme.palette.red}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginLeft: 10,
  },
});

export default CustomAlert;
