import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BottomHalfModal from '../global/MyModal';
import Title from '../global/Title';
import MyInput from '../global/MyInput';
import MyButton from '../global/Mybutton';
import { toggleModal } from '../../store/globalState';
import { AddToContactList, UpdateContactList } from '../../store/apis/contact';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export default function ContactsModel({ showModel, edit }) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.globalState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModel) {
      fetchData();
    }
  }, [showModel]);

  const fetchData = async () => {
    try {
      if (edit) {
        setPhone(edit?.phone || '');
        setName(edit?.name || '');
      }
    } catch (error) {}
  };

  const handleSave = async () => {
    if (phone.trim() === '' || name.trim() === '') return;

    setLoading(true);

    if (edit?.phone && edit.id && edit.name) {
      await UpdateContactList({
        contact: phone,
        id: edit.id,
        name,
        token,
      });
      setLoading(false);

      handleToggleModal();
      return;
    }

    const response = await AddToContactList({
      contact: phone,
      name: name,
      token,
    });

    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Fail',
        textBody: response.message,
        button: 'close',
      });
      setLoading(false);

      return;
    }
    setLoading(false);

    handleToggleModal();
  };

  const handleToggleModal = () => {
    dispatch(toggleModal());
  };

  return (
    <BottomHalfModal isModalVisible={showModel} toggleModal={handleToggleModal}>
      <View style={styles.container}>
        <View>
          <Title text={'Number Details'} header />

          <MyInput
            text="Name"
            icon="person"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <MyInput
            text="Number"
            icon="call"
            value={phone}
            type="phone-pad"
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <MyButton text="Save Number" isLoading={loading} onPress={handleSave} />
      </View>
    </BottomHalfModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
