import { ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import BottomHalfModal from '../global/MyModal';
import Title from '../global/Title';
import MyInput from '../global/MyInput';
import MyButton from '../global/Mybutton';
import { UpdatePassword } from '../../store/apis/user';
import { useSelector } from 'react-redux';
import { StoreData } from '../../constants/storage';
import { useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export default function ChangePasswordModel({ handleToggleModal, isVisible }) {
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.globalState);
  const navigation = useNavigation();

  const handleChangePassword = async () => {
    setError('');
    if (newpassword !== confirmpassword) {
      setError('passwords are not the same');
      return;
    }

    setLoading(true);
    const response = await UpdatePassword({
      confirmpassword,
      newpassword,
      oldpassword,
      token,
    });

    if (response.status !== 'success') {
      setError(response.message);
      setLoading(false);
      return;
    }

    await StoreData('pas', newpassword);
    setLoading(false);
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Password Changed',
      textBody: response.message,
      button: 'close',
    });
    navigation.push('loginPage', {
      islogin: true,
    });
    handleToggleModal();
  };

  return (
    <BottomHalfModal toggleModal={handleToggleModal} isModalVisible={isVisible}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title text="Change Password" header />
        <MyInput
          password
          icon="lock-closed"
          text="Old Password"
          value={oldpassword}
          onChangeText={(text) => setOldPassword(text)}
        />
        <MyInput
          password
          icon="lock-closed"
          text="New Password"
          value={newpassword}
          onChangeText={(text) => setNewPassword(text)}
        />
        <MyInput
          password
          icon="lock-closed"
          text="Confirm Password"
          value={confirmpassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Title text={error} color={'brown'} />
        <MyButton
          text="Confirm"
          onPress={handleChangePassword}
          isLoading={loading}
        />
      </ScrollView>
    </BottomHalfModal>
  );
}

const styles = StyleSheet.create({});
