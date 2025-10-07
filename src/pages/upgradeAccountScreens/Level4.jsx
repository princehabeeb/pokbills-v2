import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import MyInput from '../../components/global/MyInput';
import TransparentButton from '../../components/global/TransParentButton';
import MyButton from '../../components/global/Mybutton';
import { UploadKYCLevelFour } from '../../store/apis/UpgradeAccount';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { BaseUrl } from '../../store/apis/api';

const theme = Theme();
const Level4 = ({ navigation }) => {
  const [no, setNo] = useState('');
  const [tin, setTin] = useState('');
  const [address, setAddress] = useState('');
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.globalState);

  const handleUploadCAC = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        setCert(result.assets[0].uri || '');
      } else {
        console.log('Document picking cancelled');
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const HandleSubmit = async () => {
    if (!no || !tin || !cert || !address) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Missing Fields',
        textBody: 'Please fill all the fields.',
        button: 'close',
      });
      return;
    }

    const formData = new FormData();

    formData.append('cac_cert', {
      uri: cert,
      type: 'image/png',
      name: 'cert-image.png',
    });

    formData.append('cac_no', no);
    formData.append('cac_tin', tin);
    formData.append('cac_address', address);

    setLoading(true);

    const res = await fetch(`${BaseUrl}user/kyclevelfour`, {
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
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SecondaryHeader text="Upgrade To Level 4" />
        <MyInput
          text={'Enter CAC Number'}
          value={no}
          onChangeText={(t) => setNo(t)}
          type="number-pad"
          icon="call"
        />
        <MyInput
          text="Enter CAC TIN"
          value={tin}
          onChangeText={(t) => setTin(t)}
          type="number-pad"
          icon="call"
        />
        <MyInput
          text="Enter CAC Address"
          value={address}
          onChangeText={(t) => setAddress(t)}
          icon="home"
        />
        <TransparentButton
          text={cert ? cert : 'Upload CAC Certificate'}
          onPress={handleUploadCAC}
        />
        <MyButton text="Submit" onPress={HandleSubmit} isLoading={loading} />
      </ScrollView>
    </View>
  );
};

export default Level4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.window.windowWidth * 0.05,
  },
});
