import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';

import DropDown from '../../components/global/Dropdown';
import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/Mybutton';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import GetUserPrice from '../../constants/GetUserPrice';
import Title from '../../components/global/Title';
import { Theme } from '../../constants/Theme';
import TransparentButton from '../../components/global/TransParentButton';
import PayModel from '../../components/fund/PayMentModel';
import SelectContactButton from '../../components/global/SelectContactButton';
import {
  resetContactNumber,
  setContactNumber,
  toggleDataModel,
} from '../../store/globalState';
import {
  GetCablePlans,
  GetCableProviders,
  VerifyCableNumber,
} from '../../store/apis/services';
import Row from '../../components/global/Row';

const theme = Theme();

const TvSubscriptionsPage = () => {
  const { token, user, contact } = useSelector((state) => state.globalState);
  const navigation = useNavigation();
  const [cableProviders, setCableProviders] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [plan, setPlan] = useState([]);
  const [data, setData] = useState({ cableProviders: [], plan: [] });
  const [cardNumber, setCardNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState([]);
  const [transferData, setTransferData] = useState(null);
  const dispatch = useDispatch();
  const [subType, setSubType] = useState('');

  const [verifiedNumber, setVerifiedNumber] = useState({
    verified: false,
    message: '',
    loading: false,
    fail: false,
  });

  const bottomSheetRef = useRef(null);
  const snapPointsFromTop = useMemo(() => ['50%', '90%'], []);
  const [showModel, setShowModel] = useState(false);
  const [search, setSearch] = useState('');
  const [filterPlans, setFilterPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tvProviders, setTvProviders] = useState([]);

  const fetchData = async (apiFunction, setDataCallback) => {
    try {
      const response = await apiFunction({
        token,
      });

      if (response.status === 'success') {
        setDataCallback(response.response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getCableProviders = () =>
    fetchData(GetCableProviders, (response) => {
      const cableProviderNames = response.map((item) => {
        // console.log(item);
        setTvProviders((prev) => [...prev, item]);
        return item.provider;
      });
      setCableProviders(cableProviderNames);
      setData((prev) => ({ ...prev, cableProviders: response }));
    });

  const getCablePlans = () =>
    fetchData(GetCablePlans, (response) => {
      setData((prev) => ({ ...prev, plan: response }));
    });

  useEffect(() => {
    getCableProviders();
    getCablePlans();
  }, []);

  useEffect(() => {
    if (!selectedItem) {
      setPlan([]);
      return;
    }

    const plans = data.plan.filter(
      (it) => it.provider.toLowerCase() === selectedItem.toLowerCase()
    );

    setPlan(plans);
  }, [selectedItem, data]);

  useEffect(() => {
    setVerifiedNumber((prev) => ({
      ...prev,
      verified: false,
      message: '',
      fail: false,
    }));
  }, [cardNumber]);

  useEffect(() => {
    const filteredPlans = plan.filter((item) => {
      const s = search.toLocaleLowerCase();
      return (
        item?.name.toLowerCase().includes(s) ||
        item?.day.toLowerCase().includes(s)
      );
    });
    setFilterPlans(filteredPlans);
  }, [search, plan]);

  function handleChange(t) {
    setCardNumber(t);
  }

  const handleProceed = async () => {
    if (!selectedItem || !cardNumber || !subType) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'All fields are require',

        button: 'close',
      });
      return;
    }

    setLoading(true);

    const cableId = tvProviders.find(
      (item) => item.provider === selectedItem
    )?.cId;
    const cardVerification = await VerifyCableNumber({
      token,
      cablename: cableId,
      iucnumber: cardNumber,
    });
    setLoading(false);

    if (cardVerification.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Validation Fail',
        textBody: cardVerification.message,
        button: 'close',
      });
      return;
    }

    const userInfo = cardVerification.response;
    console.log(selectedPlan);
    setTransferData({
      type: 'tv subscription',
      ref: userInfo?.ref,
      name: userInfo?.name,
      cardNumber,
      cablename: selectedItem,
      plan: selectedPlan?.planid,
      planName: selectedPlan?.name,
      cableId,
      setSubType,
      cpId: selectedPlan?.cpId,
      cId: selectedPlan.cId,
    });

    dispatch(toggleDataModel());
  };

  const renderItem = useCallback(({ item }) => {
    const price = GetUserPrice({ user, item });
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          borderBottomColor: theme.palette.gray,
          borderBottomWidth: 1,
        }}
        onPress={() => {
          setSelectedPlan(item);
          bottomSheetRef.current?.close();
        }}
      >
        <Title
          text={`${item?.name} - ₦${price} ${item?.day} Days`}
          position="left"
          bold
        />
      </TouchableOpacity>
    );
  }, []);

  useEffect(() => {
    if (contact?.selectedItem) {
      setSelectedItem(contact?.selectedItem);
    }

    if (contact?.selectedPlan) {
      setSelectedPlan(contact?.selectedPlan);
    }

    if (contact?.number) {
      setCardNumber(contact?.number);
    }

    dispatch(resetContactNumber());
  }, []);

  function handleSelectContact() {
    dispatch(
      setContactNumber({
        selectedItem,
        selectedPlan,
      })
    );
    navigation.replace('contact list', { p: 'tvSubscriptionsPage' });
  }

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Tv Subscriptions" />
      {/* <TvsSection /> */}
      {/* <Title text="📺" style={{ fontSize: 100 }} /> */}
      <Row style={styles.imageContainer}>
        <Image
          source={require('../../assets/tvs/dstv.png')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/tvs/gotv.png')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/tvs/startimes.png')}
          style={styles.image}
        />
      </Row>
      <SelectContactButton
        onPress={handleSelectContact}
        text="Select Card Number"
      />
      <DropDown
        text={selectedItem ? selectedItem : 'Cable Providers'}
        data={cableProviders}
        onSelectItem={setSelectedItem}
        iconName="tv-outline"
      />
      <DropDown
        text={subType ? subType : 'Subscription Type'}
        data={['Renew', 'Change']}
        onSelectItem={setSubType}
      />
      <TransparentButton
        text={
          selectedPlan.name
            ? `${selectedPlan?.name} - ${selectedPlan?.day} Days`
            : 'Select Plan'
        }
        onPress={() => {
          setShowModel(true);
          bottomSheetRef.current?.snapToIndex(1);
        }}
      />

      <View>
        <MyInput
          text="Card Number"
          icon="wallet"
          value={cardNumber}
          onChangeText={handleChange}
          type="numeric"
          style={{ zIndex: -1, marginTop: -25 }}
        />
      </View>

      <MyButton
        text="Proceed"
        style={styles.button}
        onPress={handleProceed}
        isLoading={loading}
      />
      {showModel && (
        <BottomSheet
          detached
          enablePanDownToClose
          ref={bottomSheetRef}
          animateOnMount
          snapPoints={snapPointsFromTop}
          index={1}
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
            data={filterPlans}
            renderItem={renderItem}
            keyExtractor={(item) => item.planid}
          />
        </BottomSheet>
      )}
      <PayModel data={transferData} />
    </View>
  );
};

export default TvSubscriptionsPage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minHeight: theme.window.windowHeight,
    backgroundColor: theme.palette.white,
  },
  fail: {
    borderColor: 'red',
  },
  contentContainer: {
    backgroundColor: '#fefefe',
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
  button: {
    zIndex: -1,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  imageContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
