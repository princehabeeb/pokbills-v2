import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setContactNumber, toggleDataModel } from '../../store/globalState';

export const useData = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const [network, setNetwork] = useState(0);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [searchedPlan, setSearchedPlan] = useState('');
  const [searchedPlans, setSearchedPlans] = useState([]);
  const [error, setError] = useState({
    data: '',
    phone: '',
    option: '',
  });

  const phoneNumber = route.params.phone;
  const { dataPlans, netWorkSettings, user, contact } = useSelector(
    (state) => state.globalState
  );
  const [utilityItems, setUtilityItems] = useState([]);
  const [data, setData] = useState([]);
  const sheetRef = useRef(null);

  useEffect(() => {
    const newType = netWorkSettings
      .filter((dataItem) => parseInt(dataItem.nId) === network)
      .map((dataItem) => {
        const n = [];
        console.log(dataItem);
        if (dataItem.smeStatus === 'On') {
          // Use dynamic plan name if available, otherwise fall back to hardcoded name
          n.push(dataItem.smeplanName || 'SME');
        }
        if (dataItem.corporateStatus === 'On') {
          n.push(dataItem.corporateplanName || 'Corporate');
        }
        if (dataItem.giftingStatus === 'On') {
          n.push(dataItem.giftingplanName || 'Gifting');
        }
        if (dataItem.directDataStatus === 'On') {
          n.push(dataItem.directDataplanName || 'Direct Data');
        }
        if (dataItem.specialDataOneStatus === 'On') {
          n.push(dataItem.extraplanoneName || 'Special Data One');
        }
        if (dataItem.specialDataTwoStatus === 'On') {
          n.push(dataItem.extraplantwoName || 'Special Data Two');
        }
        if (dataItem.extraplanthreeStatus === 'On') {
          n.push(dataItem.extraplanthreeName || 'Extra Plan Three');
        }
        if (dataItem.extraplanfourStatus === 'On') {
          n.push(dataItem.extraplanfourName || 'Extra Plan Four');
        }

        return n;
      })
      .flat();

    setData(newType);
  }, [network, netWorkSettings]);

  useEffect(() => {
    setError((prevErrors) => ({ ...prevErrors, option: false }));
    const filteredPlans = dataPlans.filter((dataItem) => {
      const isMatchingNetwork = parseInt(dataItem.datanetwork) === network;
      const isMatchingType = dataItem.type === selectedOption;
      return isMatchingNetwork && isMatchingType;
    });

    setUtilityItems(filteredPlans);
  }, [selectedOption, dataPlans, network]);

  useEffect(() => {
    setSelectedOption(null);
    setSelectedData(null);
  }, [network]);

  useEffect(() => {
    if (utilityItems.length === 0) {
      return;
    }
    const sterm = searchedPlan.toLowerCase();
    const filteredPlans = utilityItems.filter(
      (dataItem) =>
        dataItem?.name.toLowerCase().includes(sterm) ||
        dataItem?.userprice.toLowerCase().includes(sterm) ||
        dataItem?.agentprice.toLowerCase().includes(sterm) ||
        dataItem?.vendorprice.toLowerCase().includes(sterm)
    );

    setSearchedPlans(filteredPlans);
  }, [utilityItems, searchedPlan]);

  const clearError = (field) => {
    setError((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handleToggleModal = () => {
    const errors = {};

    if (phone.trim() === '') {
      errors.phone = 'Phone Number cannot be empty';
    }

    if (!selectedOption) {
      errors.option = 'Please Select Data type';
    }

    if (!selectedData) {
      errors.data = 'Please Select data plan';
    }

    setError(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(toggleDataModel());
    }
  };

  function handleUtility(item) {
    clearError('data');
    setSelectedData(item);
    setBottomSheetVisible(false);
  }

  const snapPoints = useMemo(() => ['20%', '90%'], []);

  // callbacks
  const handleSheetChange = useCallback(
    (index) => {
      if (index === 0) {
        setBottomSheetVisible(false);
      }
    },
    [sheetRef]
  );

  const handleSnapPress = useCallback((index) => {
    setBottomSheetVisible(true);
    sheetRef.current?.snapToIndex(1);
    setError((prevErrors) => ({ ...prevErrors, data: false }));
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  useEffect(() => {
    if (contact?.network) {
      setNetwork(contact?.network);
    }

    if (contact?.selectedOption) {
      setSelectedOption(contact?.selectedOption);
    }
    if (contact?.selectedData) {
      setSelectedData(contact?.selectedData);
    }
    if (contact?.number) {
      setPhone(contact?.number);
    }
  }, []);

  function handleSelectContact() {
    dispatch(
      setContactNumber({
        selectedOption,
        selectedData,
        network,
      })
    );
    navigation.replace('contact list', { p: 'buyDataPage' });
  }

  return {
    handleSheetChange,
    handleSnapPress,
    handleClosePress,
    setSelectedOption,
    setPhone,
    handleToggleModal,
    handleUtility,
    clearError,
    setNetwork,
    handleSnapPress,
    handleSelectContact,
    isBottomSheetVisible,
    network,
    selectedOption,
    snapPoints,
    phone,
    error,
    selectedData,
    utilityItems,
    data,
    navigation,
    sheetRef,
    user,
    selectedOption,
    searchedPlan,
    searchedPlans,
    setSearchedPlan,
    setBottomSheetVisible,
  };
};
