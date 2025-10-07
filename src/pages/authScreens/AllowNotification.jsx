import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Title from '../../components/global/Title';
import MyButton from '../../components/global/Mybutton';
import TransparentButton from '../../components/global/TransParentButton';
import { Theme } from '../../constants/Theme';
import { StoreData } from '../../constants/storage';

const theme = Theme();
export default function AllowNotification({ navigation }) {
  async function handleAllowNotify() {
    await StoreData('allow_notification', true);
    navigation.navigate('select avatar page', {
      isNew: true,
    });
  }
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <Title text="Receive Notification" header />
        <Title text="Receive regular updates" />
        <Image
          source={require('../../assets/notification2.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.inputContainer}>
        <MyButton
          text="Allow Notification"
          style={styles.button}
          onPress={handleAllowNotify}
        />
        <TransparentButton
          text="Skip For now"
          style={styles.button}
          onPress={() =>
            navigation.navigate('select avatar page', {
              isNew: true,
            })
          }
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
    paddingVertical: 40,
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
