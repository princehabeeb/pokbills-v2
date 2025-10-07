import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Row from '../global/Row';
import { Image } from 'react-native';
import { Theme } from '../../constants/Theme';
import Title from '../global/Title';
import FormatDate from '../../constants/FormatDate';

const theme = Theme();
export default function PinListItem({ item, data }) {
  console.log(item);
  const navigation = useNavigation();

  // console.log(item);
  let image;
  switch (item?.network?.toLowerCase()) {
    case 'mtn':
      image = require('../../assets/mtn.jpg');
      break;
    case 'glo':
      image = require('../../assets/glo.png');
      break;
    case 'airtel':
      image = require('../../assets/airtel.png');
      break;
    case '9mobile':
      image = require('../../assets/nmobile.png');
      break;
    default:
      image = require('../../assets/mtn.jpg');
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('pin details screen', {
          item: { ...item, data },
          ref: item?.transref,
          network: item?.network,
        })
      }
    >
      <Row style={{ justifyContent: 'space-between' }}>
        <Row>
          <Image source={image} style={styles.image} />
          <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
            <Title text={data ? 'Data pin' : 'Airtime pin'} small bold />
            <Title
              text={`${data ? '' : '₦'}${data ? item?.plan : item?.amount} ${
                data ? 'Data' : 'Airtime'
              } Pin`}
              small
              color={theme.palette.grayDark}
            />
          </View>
        </Row>
        <View style={{ alignItems: 'flex-end' }}>
          {/* <Title
            text={`${item.quantity} Pin${
              parseInt(item.quantity) > 1 ? 's' : ''
            } `}
            small
            color={theme.palette.grayDark}
          /> */}
          <Title
            text={`${FormatDate(item.date)}`}
            small
            color={theme.palette.grayDark}
          />
        </View>
      </Row>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: theme.window.windowWidth * 0.02,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 50,
  },
});
