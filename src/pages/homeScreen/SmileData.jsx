import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions, useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/Mybutton';
import Dropdown from '../../components/global/Dropdown';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import { GetSmilePlans, PurchaseSmile } from '../../store/apis/services';
import Title from '../../components/global/Title';
import TransparentButton from '../../components/global/TransParentButton';
import SelectContactButton from '../../components/global/SelectContactButton';
import { resetContactNumber, setContactNumber } from '../../store/globalState';

const theme = Theme();
const dataPlans = ['PhoneNumber', 'AccountNumber'];
export default function SmileDataPage() {
  const [type, setType] = useState('');
  const [plan, setPlan] = useState('');
  const [number, setNumber] = useState('');
  const { token, contact } = useSelector((state) => state.globalState);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //model
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const sheetRef = useRef();
  const [search, setSearch] = useState('');
  const snapPoints = ['50%', '100%'];
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    setSearchData(
      data.filter((item) => item.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, data]);

  const renderItem = useCallback(({ item }) => {
    // const price = GetUserPrice({ user, item });

    return (
      <TouchableOpacity
        style={{
          padding: 10,
          borderBottomColor: theme.palette.gray,
          borderBottomWidth: 1,
        }}
        onPress={() => {
          setType(item);
          sheetRef.current?.close();
        }}
      >
        <Title text={item} position="left" bold />
      </TouchableOpacity>
    );
  }, []);

  const getPlans = async () => {
    const response = await GetSmilePlans({
      token,
    });

    if (response?.status === 'success') {
      const data = [];

      response.response.map((item) => {
        data.push(
          `${item?.description} - ₦${item?.price} (${item?.validity}) `
        );
      });

      setPlans(response.response);
      setData(data);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const handleSmileData = async () => {
    if (!type || !plan || !number) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'All fields are required',
        button: 'close',
      });
      return;
    }

    const currentPlan = plans.find((item) =>
      item?.description.includes(type.split(' - ')[0])
    );

    console.log(currentPlan, plan);
    navigation.navigate('smileModel', {
      phone: number,
      account_type: plan,
      plan: currentPlan,
    });
    return;
  };

  useEffect(() => {
    if (contact) {
      setType(contact?.type);
      setPlan(contact?.plan);
      setNumber(contact?.number);
    }
    dispatch(resetContactNumber());
  }, []);

  function handleSelectContact() {
    dispatch(
      setContactNumber({
        type,
        plan,
      })
    );
    navigation.replace('contact list', { p: 'smile data page' });
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <SecondaryHeader text="Buy Smile Data" />
          <View style={{ alignSelf: 'stretch' }}>
            <Image
              source={require('../../assets/smile.png')}
              style={styles.image}
            />
            <SelectContactButton
              onPress={handleSelectContact}
              text="Select Smile Number"
            />
            <TransparentButton
              text={type ? type : 'Select Plan'}
              onPress={() => {
                setIsBottomSheetVisible(true);
                sheetRef.current?.snapToIndex(1);
              }}
            />

            <Dropdown
              text={plan ? plan : 'Select Account Type'}
              data={dataPlans}
              onSelectItem={setPlan}
            />
            <MyInput
              text="Number"
              icon="call"
              type="number-pad"
              value={number}
              onChangeText={(t) => setNumber(t)}
            />
            <MyButton
              text="Proceed"
              onPress={handleSmileData}
              isLoading={loading}
            />
          </View>
        </ScrollView>
      </View>

      {isBottomSheetVisible && (
        <BottomSheet
          detached
          enablePanDownToClose
          ref={sheetRef}
          animateOnMount
          snapPoints={snapPoints}
          index={0}
          style={styles.contentContainer}
        >
          <MyInput
            text="Search Plan"
            icon="search"
            style={{ marginBottom: 10 }}
            onChangeText={(t) => setSearch(t)}
            value={search}
            maxLength={10}
          />

          <BottomSheetFlatList
            data={searchData}
            keyExtractor={(item) => item.toString()}
            renderItem={renderItem}
          />
        </BottomSheet>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: theme.window.windowWidth * 0.05,
  },
  image: {
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
});
