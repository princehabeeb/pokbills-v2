import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';

import Row from './Row';
import Title from './Title';
import { Theme } from '../../constants/Theme';
import MyIcon from './MyIcon';
import Divider from './Divider';
import useGetAvatar from '../../hooks/useGetAvater';

const theme = Theme();

export default function Header({ back }) {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.globalState);
  const avater = useGetAvatar();

  return (
    <>
      <Row style={{ justifyContent: 'space-between' }}>
        <Row style={{ alignItems: 'center' }}>
          {back && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MyIcon
                name="chevron-back-outline"
                size={60}
                style={{ marginLeft: -19 }}
              />
            </TouchableOpacity>
          )}
          <Pressable
            style={[styles.dpContainer, back && { marginLeft: -10 }]}
            onPress={() => navigation.navigate('profilePage')}
          >
            <Image
              source={avater}
              resizeMode="contain"
              style={styles.dpImage}
            />
          </Pressable>
          <View>
            <Title text="Agent" small bold style={styles.agent} />
            <Title
              text={`${user?.firstname} ${user?.lastname}`}
              header
              style={{ textTransform: 'capitalize' }}
            />
          </View>
        </Row>
        <Row>
          <TouchableOpacity onPress={() => navigation.navigate('settingPage')}>
            <MyIcon name="cog" color={theme.palette.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('notificationPage')}
          >
            <MyIcon
              name="notifications"
              size={25}
              color={theme.palette.primary}
            />
          </TouchableOpacity>
        </Row>
      </Row>
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  dpContainer: {
    overflow: 'hidden',
    borderRadius: 50,
    width: theme.window.windowWidth > 600 ? 80 : 50,
    height: theme.window.windowWidth > 600 ? 80 : 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.window.windowWidth > 400 ? 10 : 5,
  },
  dpImage: {
    width: '100%',
    resizeMode: 'contain',
  },
  agent: {
    textAlign: 'left',
    color: 'gray',
    fontSize: 16,
  },
});
