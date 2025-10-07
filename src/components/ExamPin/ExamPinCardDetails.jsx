import { StyleSheet, Image, View } from 'react-native';
import React from 'react';

import MyCard from '../global/MyCard';
import Title from '../global/Title';
import { Theme } from '../../constants/Theme';
import Row from '../global/Row';

const theme = Theme();
const ExamPinCardDetails = () => {
  return (
    <MyCard style={styles.container}>
      <Image
        source={require('../../assets/exams/waec.png')}
        style={styles.image}
      />
      <Title text="Mon, Sep 18, 2023 . 9:27:53 AM" small />
      <View style={styles.pinContainer}>
        <Title text="PIN" small bold style={styles.pinText} />
        <Title text="0237-7746-8981-9028-5626" bold style={styles.pin} />
      </View>
      <Row style={styles.row}>
        <Title text="Serial Number" color={'gray'} />
        <Title text="098765s4325HJ" />
      </Row>
      <Row style={styles.row}>
        <Title text="Transaction ID" color={'gray'} />
        <Title text="09874567" />
      </Row>
      <Row style={styles.row}>
        <Title text="Address" color={'gray'} />
        <Title text="Ibrahim@gmail.com" />
      </Row>
    </MyCard>
  );
};

export default ExamPinCardDetails;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -60,
    marginBottom: -10,
  },
  pinContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'dashed',
    padding: 5,
    marginTop: 20,
    borderRadius: 5,
  },
  pinText: {
    backgroundColor: theme.palette.white,
    alignSelf: 'center',
    zIndex: 10,
    paddingHorizontal: 25,
    fontSize: 16,
    transform: [
      {
        translateY: -20,
      },
    ],
  },
  pin: {
    transform: [
      {
        translateY: -10,
      },
    ],
  },
  row: {
    justifyContent: 'space-between',
    paddingTop: 10,
  },
});
