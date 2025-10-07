import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import Title from '../../components/global/Title';
import OtpInput from '../../components/global/OtpInput';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../../constants/Theme';
import MyVirtualKeyBoard from '../../components/global/VirtualKeyBoard';
import MyButton from '../../components/global/Mybutton';

const theme = Theme();
export default function SettingPinPage() {
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');

  const handleCodeChange = (newCode) => {
    setError('');
    setCode(newCode);
  };

  useEffect(() => {
    if (code.length === 5) {
      navigation.navigate('confirm new pin page', { password: code });
    }
  }, [code]);

  const handleSubmit = () => {
    if (code.length < 5) {
      setError('Please enter the 5 digits code');
      return;
    }

    navigation.navigate('confirm new pin page', { password: code });
  };
  return (
    <View style={styles.container}>
      <View>
        <Title text="Setup Pin Login" header />
        <Title text="Create a new pin to login fast" />
      </View>
      <View>
        <View style={styles.inputContainer}>
          <OtpInput
            password
            onChange={handleCodeChange}
            code={code}
            onFilled={handleSubmit}
          />
          <Title text={error} style={{ color: 'red' }} />
        </View>
      </View>
      <View style={{ width: '100%' }}>
        <MyVirtualKeyBoard onPress={(val) => setCode(val)} />
        {/* <MyButton
          text="Continue"
          style={styles.button}
          onPress={handleSubmit}
        /> */}
      </View>
    </View>
  );
}

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
