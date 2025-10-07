import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { X } from 'react-native-feather';

import { Theme } from '../../constants/Theme';

const theme = Theme();
const BottomHalfModal = ({ children, toggleModal, isModalVisible }) => {
  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={isModalVisible}
        // onBackdropPress={toggleModal}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.cancelIcon} onPress={toggleModal}>
            <X color={theme.palette.grayDark} />
          </TouchableOpacity>
          {children}
        </View>
      </Modal>
    </View>
  );
};

export default BottomHalfModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  innerContainer: {
    backgroundColor: 'white',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
    width: theme.window.windowWidth > 600 ? 600 : '100%',
    padding: 20,
    paddingTop: 25,
  },
  cancelIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
