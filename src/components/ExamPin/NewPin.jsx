import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import BottomHalfModal from '../global/MyModal';
import { toggleDataModel } from '../../store/globalState';

export default function NewPin() {
  const { dataModel } = useSelector((state) => state.globalState);
  const dispatch = useDispatch();

  const handleToggleModal = () => {
    dispatch(toggleDataModel());
  };

  return (
    <BottomHalfModal
      toggleModal={handleToggleModal}
      isModalVisible={dataModel}
    ></BottomHalfModal>
  );
}

const styles = StyleSheet.create({});
