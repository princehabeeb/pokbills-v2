import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';

import MyCard from '../global/MyCard';
import Row from '../global/Row';
import Title from '../global/Title';
import MyIcon from '../global/MyIcon';
import { Theme } from '../../constants/Theme';

const theme = Theme();
const ExamPinCard = ({ title, header, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MyCard style={styles.container}>
        <Row>
          <View style={styles.innerContainer}>
            <Title text={header} header />
            <Title
              text={title}
              position="left"
              color={theme.palette.grayDark}
              style={{ textTransform: 'capitalize' }}
            />
            <Title text="20/05/2023" />
          </View>
          <MyIcon
            name="chevron-forward-outline"
            size={25}
            color={theme.palette.grayDark}
          />
        </Row>
      </MyCard>
    </TouchableOpacity>
  );
};

export default ExamPinCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
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
