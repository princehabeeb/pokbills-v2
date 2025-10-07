import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';

import Title from '../../components/global/Title';
import { Theme } from '../../constants/Theme';
import LightInput from '../../components/global/LightInput';
import MyButton from '../../components/global/Mybutton';
import { useSelector } from 'react-redux';
import FormatDate from '../../constants/FormatDate';
import SecondaryHeader from '../../components/global/SecondaryHeader';

const theme = Theme();
const PersonalInfoScreen = () => {
  const { user } = useSelector((state) => state.globalState);
  return (
    <View style={styles.container}>
      <ScrollView>
        <SecondaryHeader text="Personal Info" />
        <LightInput
          value={`${user?.firstname} ${user?.lastname}`}
          text="Full Name"
        />
        <LightInput value={user?.email} text="Email" />
        <LightInput value={user?.phone} text="Mobile Number" />
        <LightInput value={user?.state} text="State" />
        <LightInput value={user?.account_type} text="Account Category" />
        <LightInput value={'N' + user?.airtime_limit} text="Airtime Limit" />
        <LightInput
          value={'N' + user?.transaction_limit}
          text="Transaction Limit"
        />
        <LightInput value={user?.kycstatus} text="Kyc Status" />
      </ScrollView>
    </View>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.palette.white,
    flex: 1,
  },
});
