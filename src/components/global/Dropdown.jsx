import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { Theme } from '../../constants/Theme';
import MyIcon from './MyIcon';

const theme = Theme();

export default function Dropdown({
  data,
  text,
  style,
  onSelectItem,
  error,
  iconName,
}) {
  const [selectedItem, setSelectedItem] = useState(0);

  const handleSelectItem = (selectItem, index) => {
    setSelectedItem(index);
    onSelectItem(selectItem);
  };

  return (
    <View style={[styles.container, style, iconName]}>
      <MyIcon
        name={iconName ? iconName : 'ellipsis-horizontal-circle'}
        style={styles.icon}
        size={25}
        color={theme.palette.grayDark}
      />
      <SelectDropdown
        data={data}
        onSelect={handleSelectItem}
        defaultButtonText={text ? text : 'Select an option'}
        buttonTextAfterSelection={(selectedItem, index) => selectedItem}
        rowTextForSelection={(item, index) => item}
        dropdownStyle={styles.dropdown}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
        buttonStyle={[
          styles.dropdownButton,
          error && { borderColor: theme.palette.red },
        ]}
        buttonTextStyle={styles.dropdownButtonText}
      />

      <MyIcon name="chevron-down-outline" style={styles.RightIcon} size={25} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  icon: {
    position: 'absolute',
    left: 13,
    top: 14,
  },
  dropdownRow: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  dropdownRowText: {
    fontSize: 16,
  },
  dropdownButton: {
    width: '99.5%',
    padding: 10,
    backgroundColor: 'transparent',
    borderColor: theme.palette.grayDark,
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 20,
    paddingLeft: 45,
    margin: 1,
  },
  dropdownButtonText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'left',
    marginLeft: 38,
  },
  RightIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
});
