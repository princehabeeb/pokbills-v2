import { FlatList, StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import MyInput from '../global/MyInput';
import MyButton from '../global/Mybutton';
import { Theme } from '../../constants/Theme';
import Dropdown from '../global/Dropdown';
import DataModal from './Buydatamodel';
import SelectContactButton from '../global/SelectContactButton';
import Title from '../global/Title';
import UtilityItem from './DataUtilityItem';
import { useData } from './useData';
import { useCallback } from 'react';
import NetworkSection from '../buyAirtime/NetworkSection';
import TransparentButton from '../global/TransParentButton';
import GetUserPrice from '../../constants/GetUserPrice';
import DataNetworkSection from './DataNetworkSection';
import NetworkStatusButton from '../global/NetworkStatusButton';
import SecondaryHeader from '../global/SecondaryHeader';
import Row from '../global/Row';
import Divider from '../global/Divider';

const theme = Theme();



const DataFormSection = () => {
  const {
    setSelectedOption,
    handleToggleModal,
    setPhone,
    handleUtility,
    clearError,
    handleSheetChange,
    setNetwork,
    handleSnapPress,
    handleSelectContact,
    isBottomSheetVisible,
    network,
    snapPoints,
    selectedData,
    phone,
    error,
    sheetRef,
    data,
    navigation,
    user,
    selectedOption,
    searchedPlan,
    searchedPlans,
    setSearchedPlan,
    setBottomSheetVisible,
  } = useData({ network });

  const renderItem = useCallback(
    ({ item }) => (
      <UtilityItem
        item={item}
        onPress={() => handleUtility(item)}
        active={selectedData === item?.planid}
        user={user}
      />
    ),
    []
  );

  if(isBottomSheetVisible){

  return (
    <View style={{flex:1,}}>
    <Row>
      <Title text="Select Data Plan" header />
      <TransparentButton text="Close" onPress={() => setBottomSheetVisible(false)} style={{borderWidth:0,}} color={theme.palette.black} />
    </Row>
    <MyInput text="Search" icon="search" value={searchedPlan} onChangeText={setSearchedPlan} />
      <Divider />
      <FlatList
        data={searchedPlans}
        keyExtractor={(item) => item.planid}
        renderItem={renderItem}
      />
    </View>
  );
}

  return (
    <>
      <View style={styles.container}>
        <DataNetworkSection active={network} setActive={setNetwork} />
        <SelectContactButton
          onPress={handleSelectContact}
          style={{ marginBottom: -10 }}
        />
        <MyInput
          text="Phone Number"
          icon="call"
          error={error.phone}
          type={'phone-pad'}
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            clearError('phone');
          }}
        />
        {network !== 0 && (
          <Dropdown
            data={data}
            text={selectedData?.type ? selectedData?.type : 'Select Type'}
            error={error.option}
            onSelectItem={setSelectedOption}
          />
        )}

        {selectedOption && (
          <TransparentButton
            text={
              selectedData
                ? `${selectedData?.name} ${
                    selectedData?.type
                  } - ₦${GetUserPrice({
                    user,
                    item: selectedData,
                  })} (${selectedData?.day} days)`
                : 'Select Data plans'
            }
            onPress={handleSnapPress}
            transparent
          />
        )}
        <NetworkStatusButton type="data" />
        {error.data && <Title text={error.data} color={theme.palette.red} />}
        <MyButton text="Purchase" onPress={handleToggleModal} />
        <DataModal network={network} data_plan={selectedData} phone={phone} />
      </View>

      
    </>
  );
};

export default DataFormSection;

const styles = StyleSheet.create({
  container: {
    marginTop: theme.window.windowWidth > 600 ? 20 : 0,
    padding: 10,
    minHeight: theme.window.windowHeight / 1.15,
  },
  utilityRow: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    padding: 10,
  },
  util: {
    marginTop: 15,
  },
  cancelIcon: {
    position: 'absolute',
    top: -30,
    right: 10,
    zIndex: 1000,
  },
  input: {
    marginBottom: 10,
  },
});
