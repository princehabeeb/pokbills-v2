import { useSelector } from 'react-redux';
import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/Mybutton';
import Dropdown from '../../components/global/Dropdown';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import {
  GetExamPinProviders,
  PurchaseExamPin,
} from '../../store/apis/services';
import { Theme } from '../../constants/Theme';
import GetUserPrice, {
  GetCurrentUserPrice,
} from '../../constants/GetUserPrice';
import Title from '../../components/global/Title';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { StackActions } from '@react-navigation/native';

// this is the page to buy pin
const theme = Theme();
export default function ExamPinPage({ navigation }) {
  const [providers, setProviders] = useState([]);
  const { token, user } = useSelector((state) => state.globalState);
  const [selectedItem, setSelectedItem] = useState(null);
  const [exams, setExams] = useState([]);
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const getTvs = async () => {
    const response = await GetExamPinProviders({
      token,
    });

    if (response.status === 'success') {
      const data = [];
      response.response.map((item) =>
        item.providerStatus.toLowerCase() === 'on'
          ? data.push(item.provider)
          : null
      );

      setExams(response?.response);
      setProviders(data);
    }
  };

  useEffect(() => {
    const selectedExam = exams.find((item) => item.provider === selectedItem);

    setAmount(selectedExam?.price * parseInt(quantity) || '');
  }, [selectedItem, quantity]);

  useEffect(() => {
    getTvs();
  }, []);

  const handleBuyExamPin = async () => {
    const selectedExam = exams.find((item) => item.provider === selectedItem);

    // navigation.dispatch(StackActions.popToTop());
    navigation.navigate('examModal', {
      exam: selectedExam,
      quantity,
      amount,
    });
  };

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Buy Exam Pin" />
      <ScrollView>
        <Dropdown
          text="Select Exam"
          data={providers}
          onSelectItem={setSelectedItem}
        />
        {amount && (
          <Title
            text={`Amount: ${amount}`}
            position="left"
            small
            bold
            color={theme.palette.grayDark}
          />
        )}
        <MyInput
          text="Quantity"
          icon="wallet"
          value={quantity}
          type="number-pad"
          onChangeText={(text) => setQuantity(text)}
        />
        <MyButton
          text="Proceed"
          onPress={handleBuyExamPin}
          isLoading={loading}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: theme.window.windowWidth < 800 ? 10 : 20,
  },
});
