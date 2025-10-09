import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from '../../components/global/Title';
import MyButton from '../../components/global/Mybutton';
import TransparentButton from '../../components/global/TransParentButton';
import { Theme } from '../../constants/Theme';
import { StoreData } from '../../constants/storage';
import useCheckFingerPrint from '../../hooks/CheckFingerPrint';

const theme = Theme();
export default function SetUpPinPage({ navigation }) {
  const { useFinger } = useCheckFingerPrint();
  const insets = useSafeAreaInsets();
  async function handlePinLogin() {
    await StoreData('use_login_pin', true);
    navigation.navigate('setting pin page');
  }

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom + 20, 40) }]}>
      <View style={{ paddingHorizontal: 10 }}>
        <Title text="Setup Pin Login" header />
        <Title text="Setup Pin for fast login" />
        <Image source={require('../../assets/lock.jpg')} style={styles.image} />
      </View>
      <View style={styles.inputContainer}>
        <MyButton
          text="Allow Pin Login"
          style={styles.button}
          onPress={handlePinLogin}
        />
        <TransparentButton
          text="Skip For now"
          style={styles.button}
          onPress={() =>
            navigation.navigate(
              useFinger ? 'enable biometric' : 'allow notification'
            )
          }
        />
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
    paddingTop: 40,
  },
  image: {
    height: theme.window.windowWidth < 800 ? '60%' : '80%',
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginLeft: 10,
  },
  button: {
    width: '83%',
  },
});
