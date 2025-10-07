import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import Title from '../../components/global/Title';
import MyButton from '../../components/global/Mybutton';
import TransparentButton from '../../components/global/TransParentButton';
import Divider from '../../components/global/Divider';

const theme = Theme();
const TransactionStatus = ({ route, navigation }) => {
  const data = route?.params?.data;
  const [text, setText] = useState('Processing');
  const [imageurl, setImageurl] = useState(require('../../assets/pending.png'));
  const [color, setColor] = useState('orange');
  useEffect(() => {
    if (data?.status?.toLowerCase() === 'fail') {
      setColor('red');
      setImageurl(require('../../assets/fail.png'));
      setText('Failed');
    }
    if (data?.status?.toLowerCase() === 'success') {
      setImageurl(require('../../assets/success.png'));
      setText('Successful');
      setColor('green');
    }
    if (data?.status?.toLowerCase() === 'processing') {
      setColor('orange');
      setText('Processing');
      setImageurl(require('../../assets/pending.png'));
    }
  }, []);

  return (
    <View style={styles.container}>
      <SecondaryHeader hideBack />
      <View style={styles.innerContainer}>
        <Image source={imageurl} style={styles.image} />
        <Title text={`Transaction ${text}`} header color={color} />
        <Title text={data?.message} style={{ marginTop: 5 }} small />
        <View style={styles.row}>
          <MyButton
            text="Buy Again"
            style={styles.button}
            onPress={() => navigation.goBack()}
          />
          <TransparentButton
            text="No Thanks"
            style={styles.button}
            onPress={() => navigation.replace('bottomTabs')}
          />
        </View>
        {/* {data?.type === 'airtime-pin' && (
          <TransparentButton
            style={{ borderWidth: 0 }}
            text="View Pins"
            onPress={() => navigation.navigate('airtime pin history')}
          />
        )}

        {data?.type === 'data-pin' && (
          <TransparentButton
            style={{ borderWidth: 0 }}
            text="View Pins"
            onPress={() => navigation.navigate('data pin history')}
          />
        )} */}
      </View>
    </View>
  );
};

export default TransactionStatus;

const styles = StyleSheet.create({
  container: {
    padding: theme.window.windowWidth * 0.05,
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  row: {
    width: '100%',
    marginTop: 20,
  },
  button: {},
});
