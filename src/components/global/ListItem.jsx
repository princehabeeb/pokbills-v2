import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';

import MyCard from './MyCard';
import Row from './Row';
import Title from './Title';
import MyIcon from './MyIcon';
import { Theme } from '../../constants/Theme';
import MyPressable from './MyPressable';

const theme = Theme();
const ListItem = ({
  header,
  image,
  status,
  date,
  text,
  icon,
  onPress,
  background,
  feater: feather,
}) => {
  return (
    <MyPressable onPress={onPress}>
      <MyCard
        style={[
          styles.container,
          { backgroundColor: background ? background : theme.palette.white },
        ]}
      >
        <Row>
          <View style={styles.imageContainer}>
            {icon || feather ? (
              feather ? (
                feather
              ) : (
                <MyIcon name={icon} color={theme.palette.grayDark} />
              )
            ) : (
              <Image source={image} style={styles.image} />
            )}
          </View>
          <View style={styles.innerContainer}>
            <Title
              text={header}
              header
              color={theme.palette.black}
              style={{ textTransform: 'capitalize' }}
            />
            <Title
              text={status ? status : text}
              small
              color={theme.palette.grayDark}
            />
            {date && <Title text={date} small />}
          </View>
          <MyIcon name="chevron-forward-outline" color="#afbaef" />
        </Row>
      </MyCard>
    </MyPressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 3,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  imageContainer: {
    padding: 20,
  },
  innerContainer: {
    alignItems: 'flex-start',
    flex: 1,
  },
});
