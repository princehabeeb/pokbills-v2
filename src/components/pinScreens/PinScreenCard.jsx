import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ShoppingBag, ShoppingCart } from 'react-native-feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

import MyCard from '../global/MyCard';
import Row from '../global/Row';
import { Theme } from '../../constants/Theme';
import Title from '../global/Title';
import MyIcon from '../global/MyIcon';

const theme = Theme();
export default function PinScreenCard({ header, subheader, onPress, cart }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MyCard style={styles.card}>
        <Row>
          <View style={styles.leftContainer}>
            {cart ? (
              <ShoppingCart
                color={'#366a2c'}
                width={50}
                height={50}
                style={{ marginBottom: 10 }}
              />
            ) : (
              <ShoppingBag
                color={'#0639a6'}
                width={50}
                height={50}
                style={{ marginBottom: 10 }}
              />
            )}
            <Title text={header} uppercase bold />
            <Title
              text={subheader}
              small
              color={theme.palette.grayDark}
              textTransform={'capitalize'}
            />
          </View>
          <View style={{ marginTop: 'auto' }}>
            {
              <MyIcon
                name="chevron-forward-circle-outline"
                color={theme.palette.grayDark}
              />
            }
          </View>
        </Row>
      </MyCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  leftContainer: {
    alignItems: 'flex-start',
    flex: 1,
  },
  card: {
    backgroundColor: theme.palette.gray,
    marginTop: theme.window.windowWidth * 0.05,
  },
});
