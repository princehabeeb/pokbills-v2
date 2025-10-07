import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreData = async (value, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(value, jsonValue);
  } catch (e) {}
};

export const GetData = async (value) => {
  // AsyncStorage.clear();
  try {
    const jsonValue = await AsyncStorage.getItem(value);
    const data = jsonValue != null ? JSON.parse(jsonValue) : null;
    return data;
  } catch (e) {}
};
