import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Row from '../../components/global/Row';
import Title from '../../components/global/Title';
import { Theme } from '../../constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import MyIcon from '../../components/global/MyIcon';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import formatMoney from '../../constants/FormatNumber';
import BottomHalfModal from '../../components/global/MyModal';
import { toggleModal } from '../../store/globalState';
import MyPressable from '../../components/global/MyPressable';
import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/Mybutton';
import { WithdrawCommission } from '../../store/apis/global';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import { GetCommissionList } from '../../store/apis/services';
import Loader from '../../components/loading/Loading';
import useSaveUser from '../../hooks/saveUser';

function TableRow({ t1, t2, t3, t4, t5, header }) {
  return (
    <Row style={styles.tableRow}>
      <Title style={styles.tableTextHead} bold={header} text={t1} />
      <Title style={styles.tableText} bold={header} text={t2} />
      <Title style={styles.tableText} bold={header} text={t3} />
      <Title style={styles.tableText} bold={header} text={t4} />
      <Title style={styles.tableText} bold={header} text={t5} />
    </Row>
  );
}

const handleToggleModal = (dispatch) => {
  dispatch(toggleModal());
};
function WithdrawModel() {
  const dispatch = useDispatch();
  const { isModalVisible, token } = useSelector((state) => state.globalState);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pin, setPin] = useState('');
  const { getUserInfo } = useSaveUser();

  const handleWithdraw = async () => {
    if (amount.trim() === '') {
      setError('Amount cannot be empty');
      return;
    }

    if (pin.trim() === '') {
      setError('Pin cannot be empty');
      return;
    }
    setLoading(true);
    const response = await WithdrawCommission({
      token,
      amount,
      pin,
      ref: 'REFERRAL' + Date.now(),
    });
   

    if (response.status !== 'success') {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Withdraw Fail',
            textBody: response.message,
            button: 'close',
          });
          setLoading(false);
      return;
    }

    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      text1: 'Withdraw Success',
      text2: response.message,
    });
      getUserInfo();
      setLoading(false);
      handleToggleModal(dispatch);
  };

  return (
    <BottomHalfModal
      toggleModal={() => handleToggleModal(dispatch)}
      isModalVisible={isModalVisible}
    >
      <Title
        text="Withdraw Commission"
        bold
        header
        color={theme.palette.black}
      />
      <MyInput
        value={amount}
        onChangeText={(t) => {
          setError('');
          setAmount(t);
        }}
        text="Enter Amount"
        icon="cash"
        error={error}
        type={'number-pad'}
      />
      <MyInput
        value={pin}
        onChangeText={(t) => setPin(t)}
        text="Enter Pin"
        icon="lock-closed"
        type={'number-pad'}
      />
      <MyButton isLoading={loading} text="Withdraw" onPress={handleWithdraw} />
    </BottomHalfModal>
  );
}

const theme = Theme();
export default function Referral() {
  const { user, token } = useSelector((state) => state.globalState);

  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      const res = await GetCommissionList({ token });
      setLoading(false);
      if (res?.status === 'success') {
        setList(res?.response);
      }
    };
    getList();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SecondaryHeader text="Referral" />
        <WithdrawModel />
        <View>
          <LinearGradient
            colors={[theme.palette.primary, theme.palette.secondary]}
            style={styles.card}
          >
            <Row style={styles.row}>
              <Title text="Commission" header color={theme.palette.white} />
              <Title
                text={`₦${formatMoney(parseFloat(user?.refwallet))}`}
                header
                bold
                color={theme.palette.white}
              />
            </Row>

            <View>
              <Row style={styles.row}>
                <Title
                  text="Total referrals"
                  bold
                  color={theme.palette.white}
                />
                <Title text={user?.referrals} color={theme.palette.white} />
              </Row>
            </View>
          </LinearGradient>
          <Row style={styles.buttonRow}>
            <TouchableOpacity style={styles.customButton}>
              <Title text="Referral Number" small bold />
              <Title text={user?.phone} />
            </TouchableOpacity>
            <MyPressable
              style={styles.customButton}
              onPress={() => handleToggleModal(dispatch)}
            >
              <Row style={styles.customButtonRow}>
                <MyIcon name="arrow-down-circle" />
                <Title text={'Withdraw'} bold />
              </Row>
            </MyPressable>
          </Row>
        </View>
        {loading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
            }}
          >
            <Loader />
          </View>
        ) : (
          <View>
            <View style={styles.tableContainer}>
              <Title text="Service" header>
                Service
              </Title>
              <Title text="Bonus" header />
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableText}>Account Type (Agent)</Text>
              <Text style={styles.tableText}>
                ₦{formatMoney(list?.agent_upgrade, 0)}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableText}>Account Type (Vendor)</Text>
              <Text style={styles.tableText}>
                ₦{formatMoney(list?.vendor_upgrade, 0)}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableText}>Airtime Bonus</Text>
              <Text style={styles.tableText}>
                ₦{formatMoney(list?.airtime, 0)}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableText}>Data Bonus</Text>
              <Text style={styles.tableText}>₦{formatMoney(list?.data, 0)}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableText}>Cable Tv Bonus</Text>
              <Text style={styles.tableText}>
                ₦{formatMoney(list?.cabletv, 0)}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableText}>Electricity Bonus</Text>
              <Text style={styles.tableText}>
                ₦{formatMoney(list?.electricity, 0)}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableText}>Exam Pin Bonus</Text>
              <Text style={styles.tableText}>
                ₦{formatMoney(list?.exam, 0)}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.window.windowWidth > 800 ? 20 : 10,
  },
  card: {
    height: 150,
    padding: 10,
    borderRadius: 10,
    ...theme.shadow,
    justifyContent: 'space-between',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  customButton: {
    backgroundColor: theme.palette.gray,
    flex: 1,
    margin: 5,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  customButtonRow: {
    padding: 8,
  },
  tableContainer: {
    marginTop: 20,
    backgroundColor: theme.palette.gray,
    padding: 5,
    borderRadius: 10,
    ...theme.shadow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tableRow: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.palette.gray,
    flexDirection: 'row',
    padding: 15,
  },
  tableText: {
    borderRightWidth: 2,
    borderColor: theme.palette.gray,
    flex: 1,
    marginLeft: 5,
    color: theme.palette.black,
  },
  tableTextHead: {
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: theme.palette.gray,
    flex: 1.5,
    padding: 5,
    height: 50,
  },
  buttonRow: {
    alignItems: 'stretch',
  },
});
