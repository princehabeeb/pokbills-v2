import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from '../../components/global/Title';
import MyButton from '../../components/global/Mybutton';
import TransparentButton from '../../components/global/TransParentButton';
import { Theme } from '../../constants/Theme';
import { StoreData } from '../../constants/storage';

const theme = Theme();
export default function EnableBiometric({ navigation }) {
  const insets = useSafeAreaInsets();
  async function handleEnableBiometric() {
    await StoreData('use_biometric', true);
    navigation.navigate('allow notification');
  }
  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom + 20, 40) }]}>
      <View style={{ paddingHorizontal: 10 }}>
        <Title text="Enable Biometric" header />
        <Title text="Setup Biometric to login fast" />
        <Image
          source={require('../../assets/finger.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.inputContainer}>
        <MyButton
          text="Set Biometric"
          style={styles.button}
          onPress={handleEnableBiometric}
        />
        <TransparentButton
          text="Skip For now"
          style={styles.button}
          onPress={() => navigation.navigate('allow notification')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  image: {
    height: theme.window.windowWidth < 800 ? '60%' : '80%',

    resizeMode: 'contain',
    marginTop: 20,
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
