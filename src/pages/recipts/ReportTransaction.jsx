import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import MyButton from '../../components/global/Mybutton';
import { ReportTransactionApi } from '../../store/apis/global';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import TextArea from '../../components/global/TextArea';

const theme = Theme();
export default function ReportTransaction({ route, navigation }) {
  const { des, ref } = route.params;
  const { token } = useSelector((state) => state.globalState);
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!report) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Submit Fail',
        textBody: 'Please fill in all fields',
        button: 'close',
      });
      return;
    }

    setLoading(true);
    const response = await ReportTransactionApi({
      token,
      description: report,
      transref: ref,
      report,
    });
    setLoading(false);

    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Fail',
        textBody: response.message,
        button: 'close',
      });
      return;
    }

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: response.message,
      button: 'close',
    });

    navigation.replace('bottomTabs', { page: 'homePage' });
  };

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Report Transaction" />

      <TextArea
        value={report}
        onChangeText={(t) => setReport(t)}
        text="Enter Your Report"
        props={{ autoFocus: true }}
      />

      <MyButton text="Submit" onPress={handleSubmit} isLoading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.window.windowWidth * 0.05,
  },

  textContainer: {
    textAlign: 'left',
    marginBottom: 10,
  },
});
