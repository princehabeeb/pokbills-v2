import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import Title from '../../components/global/Title';
import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/Mybutton';
import { useNavigation } from '@react-navigation/native';

export default function SmsOtpPage() {
  const navigation = useNavigation();
  const handleSubmit = () => {
    navigation.navigate('smsOtpVerifyPage');
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/sms.png')} style={styles.image} />
      </View>
      <Title text="OTP VERIFICATION" header />
      <Title text="We will send a one time password to this phone number" />

      <View style={styles.inputContainer}>
        <MyInput text="Phone Number" type="phone-pad" icon="call" />
        <MyButton text="Register" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 5,
  },
  imageContainer: {},
  image: {
    height: 200,
    resizeMode: 'contain',
  },
  inputContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: '10%',
  },
});
