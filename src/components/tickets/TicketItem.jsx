import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Theme } from '../../constants/Theme';
import MyIcon from '../global/MyIcon';
import Title from '../global/Title';
import FormatDate from '../../constants/FormatDate';
import { useNavigation } from '@react-navigation/native';

const theme = Theme();
const TicketItem = ({ item }) => {
  let color = 'black';
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ticket details', {
      id: item?.issue_id,
    });
  };

  return (
    <Pressable
      style={({ pressed }) => [pressed && { transform: [{ scale: 0.95 }] }]}
      onPress={handlePress}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Title
            text={item?.query}
            textTransform="capitalize"
            numberOfLines={1}
            bold
            position="left"
            color={theme.palette.black}
            ellipsizeMode="tail"
          />
          <Title
            style={styles.text}
            text={item?.reply}
            small
            color={color}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <Title
            style={styles.text}
            text={FormatDate(item?.reply_date || item?.add_date)}
            small
            color={theme.palette.grayDark}
          />
        </View>
        <MyIcon
          name="chevron-forward"
          size={15}
          color={theme.palette.grayDark}
        />
      </View>
    </Pressable>
  );
};

export default TicketItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.white,
    padding: theme.window.windowWidth * 0.03,
    marginVertical: theme.window.windowWidth * 0.01,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    // alignItems: 'flex-start',
    maxWidth: '80%',
  },
  text: {
    textAlign: 'left',
  },
  pressed: {
    opacity: 0.5,
  },
});
