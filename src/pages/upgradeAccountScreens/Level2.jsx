import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';

import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/Mybutton';
import TransparentButton from '../../components/global/TransParentButton';
import FormatDate from '../../constants/FormatDate';
import { UploadKYCLevelTwo } from '../../store/apis/UpgradeAccount';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';
import Dropdown from '../../components/global/Dropdown';
import axios from 'axios';
import { BaseUrl } from '../../store/apis/api';
import Title from '../../components/global/Title';

const theme = Theme();
export default function Level2() {
  const [bvn, setBvn] = useState('');
  const [dob, setDob] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token, siteSettings } = useSelector((state) => state.globalState);
  const navigation = useNavigation();
  const [type, setType] = useState('');
  const [kycOptions, setkycoptions] = useState(['']);

  const handleDateSelect = (date) => {
    setOpen(false);
    setDob(date);
  };

  useEffect(() => {
    let options = [];

    if (siteSettings.kycOption === 'nin') {
      options.push('NIN');
    } else if (siteSettings.kycOption === 'bvn') {
      options.push('BVN');
    } else {
      options.push('NIN');
      options.push('BVN');
    }
    setkycoptions(options);
  }, []);

  const handlePress = async () => {
    if (!bvn || !dob) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Missing Fields',
        textBody: 'Please fill all the fields.',
        button: 'close',
      });

      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('setkycoption', type.toLowerCase());
    formData.append('dob', `${dob}`);
    formData.append('vernumber', bvn);

    let response;
    try {
      const res = await axios.post(`${BaseUrl}verify-kyc`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      response = res.data;
    } catch (error) {
      console.log(error.response.body);
    } finally {
      setLoading(false);
    }

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
      type: ALERT_TYPE.SUCCESS,
      title: 'KYC Verified',
      textBody: response.message,
      button: 'close',
    });
    navigation.goBack();
  };

  const handleSelectItem = (item) => {
    setType(item);
  };

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Verify Account" />
      <Dropdown
        style={{ marginTop: 8 }}
        data={kycOptions}
        text="Select KYC type"
        onSelectItem={handleSelectItem}
      />
      {type && (
        <MyInput
          text={'Enter ' + type}
          value={bvn}
          onChangeText={(t) => setBvn(t)}
          type="number-pad"
          icon="call"
        />
      )}
      <TransparentButton
        text={dob ? FormatDate(dob) : 'Select Date of Birth'}
        onPress={() => setOpen(true)}
      />
      <DatePicker
        modal
        mode="date"
        open={open}
        date={dob ? dob : new Date()}
        onConfirm={handleDateSelect}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {type && (
        <Title
          text={`Kyc charges N${
            type === 'NIN'
              ? siteSettings.kycNinCharges
              : siteSettings.kycBvnCharges
          }`}
          small
          bold
        />
      )}
      <MyButton text="Submit" onPress={handlePress} isLoading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.window.windowWidth * 0.05,
  },
});
