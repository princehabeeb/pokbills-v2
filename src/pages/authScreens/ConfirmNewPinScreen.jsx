import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import Title from '../../components/global/Title';
import OtpInput from '../../components/global/OtpInput';
import { useNavigation } from '@react-navigation/native';
import MyVirtualKeyBoard from '../../components/global/VirtualKeyBoard';
import MyButton from '../../components/global/Mybutton';
import { StoreData } from '../../constants/storage';
import useCheckFingerPrint from '../../hooks/CheckFingerPrint';

export default ConfirmNewPinScreen = ({ route }) => {
  const { password } = route.params;
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const { useFinger } = useCheckFingerPrint();
  const handleCodeChange = (newCode) => {
    setError('');
    setCode(newCode);
  };

  const handleSubmit = async () => {
    if (code.length < 5) {
      setError('Please enter the 5 digits code');
      return;
    }

    if (password !== code) {
      setError('Passwords do not match');
      return;
    }

    await StoreData('pin', code);
    await StoreData('use_transaction_pin', true);

    navigation.navigate(useFinger ? 'enable biometric' : 'allow notification');
  };

  useEffect(() => {
    if (code.length === 5) {
      handleSubmit();
    }
  }, [code]);

  return (
    <View style={styles.container}>
      <View>
        <Title text="Confirm Pin" header />
        <Title text="Confirm your new pin" />
      </View>
      <View style={styles.inputContainer}>
        <OtpInput
          password
          onChange={handleCodeChange}
          code={code}
          onFilled={handleSubmit}
        />
        <Title text={error} style={{ color: 'red' }} />
      </View>
      <View style={{ width: '100%' }}>
        <MyVirtualKeyBoard onPress={(val) => setCode(val)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 15,
  },
  inputContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
  },
  button: {},
});
