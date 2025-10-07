import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import MyButton from '../../components/global/Mybutton';
import TransparentButton from '../../components/global/TransParentButton';
import MyInput from '../../components/global/MyInput';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { UploadKYCLevelThree } from '../../store/apis/UpgradeAccount';
import { useSelector } from 'react-redux';
import { BaseUrl } from '../../store/apis/api';

const theme = Theme();
const Level3 = ({ navigation }) => {
  const [pickedImageName, setPickedImageName] = useState('');
  const [nepaBill, setNepaBill] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.globalState);
  const formData = new FormData();

  const handleUploadIdCard = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        console.log('Picked Document:', result.assets[0].uri);
        setPickedImageName(result.assets[0].uri || '');
      } else {
        console.log('Document picking cancelled');
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const handleUploadNepaBill = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        console.log('Picked Document:', result.assets[0].uri);
        setNepaBill(result.assets[0].uri || '');
      } else {
        console.log('Document picking cancelled');
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const HandleSubmit = async () => {
    if (!name || !phone || !state || !address) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Missing Fields',
        textBody: 'Please fill all the fields.',
        button: 'close',
      });
      return;
    }

    formData.append('nepabill', {
      uri: nepaBill,
      type: 'image/png',
      name: 'nepaBill-image.png',
    });

    formData.append('idcard', {
      uri: pickedImageName,
      type: 'image/png',
      name: 'idCard-image.png',
    });

    formData.append('next_of_kin_name', name);
    formData.append('next_of_kin_phone', phone);
    formData.append('next_of_kin_state', state);
    formData.append('next_of_kin_address', address);

    try {
      setLoading(true);
      // const response = await UploadKYCLevelThree({ formData, token });
      const res = await fetch(`${BaseUrl}user/kyclevelthree`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const response = await res.json();
      setLoading(false);

      if (response.status !== 'success') {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Upgrade Failed',
          textBody: response.message,
          button: 'close',
        });
        return;
      }
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Upgrade Pending',
        textBody: response.message,
        button: 'close',
      });
      navigation.navigate('upgrade account screen');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SecondaryHeader text="Upgrade To Level 3" />
        <MyInput
          text="Next Of Kin Name"
          value={name}
          onChangeText={(t) => setName(t)}
          icon={'person'}
        />
        <MyInput
          text="Next Of Kin Phone"
          value={phone}
          onChangeText={(t) => setPhone(t)}
          type="number-pad"
          icon={'call'}
        />
        <MyInput
          text="Next Of Kin State"
          value={state}
          onChangeText={(t) => setState(t)}
          icon={'podium'}
        />
        <MyInput
          text="Next Of Kin Address"
          value={address}
          onChangeText={(t) => setAddress(t)}
          icon={'home'}
        />
        <TransparentButton
          text={pickedImageName ? pickedImageName : 'Upload ID Card'}
          onPress={handleUploadIdCard}
        />
        <TransparentButton
          text={nepaBill ? nepaBill : 'Upload NEPA Bill'}
          onPress={handleUploadNepaBill}
        />
        <MyButton text="Submit" isLoading={loading} onPress={HandleSubmit} />
      </ScrollView>
    </View>
  );
};

export default Level3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.window.windowWidth * 0.05,
  },
  pickedImageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    ...theme.shadow,
    backgroundColor: theme.palette.gray,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    resizeMode: 'contain',
  },
});
