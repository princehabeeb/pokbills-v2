import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';

import MyCard from '../global/MyCard';
import Title from '../global/Title';
import MyIcon from '../global/MyIcon';
import { Theme } from '../../constants/Theme';
import Row from '../global/Row';

const theme = Theme();
const AirtimeToCashCard = ({ header, title, onPress }) => {
  return (
    <MyCard style={styles.container}>
      <Pressable onPress={onPress} android_ripple={{ color: 'grey' }}>
        <Row>
          <Image
            source={require('../../assets/money.png')}
            style={styles.image}
          />
          <View style={styles.innerContainer}>
            <Title text={header} header />
            <Title text={title} small />
          </View>
          <MyIcon
            name="chevron-forward-outline"
            size={50}
            style={{ width: 50 }}
          />
        </Row>
      </Pressable>
    </MyCard>
  );
};

export default AirtimeToCashCard;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: theme.window.windowWidth > 600 ? 25 : 10,
  },
  image: {
    height: theme.window.windowWidth > 600 ? 150 : 100,
    width: theme.window.windowWidth > 600 ? 150 : 100,
    resizeMode: 'contain',
  },
  innerContainer: {
    alignItems: 'flex-start',
    flex: 1,
  },
});
