import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Title from '../../components/global/Title';
import { AvatarList } from '../../constants/AvaterList';
import { Theme } from '../../constants/Theme';
import MyCard from '../../components/global/MyCard';
import Divider from '../../components/global/Divider';
import MyButton from '../../components/global/Mybutton';
import TransparentButton from '../../components/global/TransParentButton';
import { GetData, StoreData } from '../../constants/storage';

const theme = Theme();
export default function SelectAvaterPage({ navigation, route }) {
  const { isNew } = route.params;
  const [bgColor, setBgColor] = useState(theme.palette.white);
  const [active, setActive] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      const avater = await GetData('avatar');
      if (avater) {
        setActive(avater);
      }
    })();
  }, []);

  async function handlePress(item) {
    setBgColor(item.color);
    setActive(item.id);
    await StoreData('avatar', item.id);
  }

  const handleBackPress = () => {
    isNew
      ? navigation.replace('welcome success page')
      : navigation.replace('bottomTabs', { screen: 'profilePage' });
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={{ flex: 1 }}>
        <Title text="Select Your Avatar" position="left" header />
        <Divider />
        <FlatList
          contentContainerStyle={styles.avatarContainer}
          keyExtractor={(item) => item.id}
          data={AvatarList}
          numColumns={theme.window.windowWidth > 800 ? 4 : 2}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.card, active === item.id && { borderWidth: 5 }]}
              onPress={() => handlePress(item)}
            >
              <Image source={item.image} style={styles.image} />
            </Pressable>
          )}
        />
      </View>
      <View style={{ paddingBottom: Math.max(insets.bottom, 10) }}>
        <MyButton text="Continue" onPress={handleBackPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },

  avatarContainer: {
    marginTop: 20,
    flexGrow: 1,
    alignItems: 'center',
  },
  card: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: theme.palette.gray,
    width: 140,
    height: 140,
    margin: 10,
  },
  image: {
    width: 120,
    resizeMode: 'contain',
  },
});
