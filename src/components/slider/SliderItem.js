import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Theme } from '../../constants/Theme';

const theme = Theme();

const SliderItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: theme.window.windowWidth,
    backgroundColor: theme.palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    minHeight: 55,
  },
  imageContainer: {
    paddingTop: 20,
  },
  image: {
    width: theme.window.windowWidth,
    resizeMode: 'contain',
    height: theme.window.windowHeight / 2.5,
    justifyContent: 'center',
    maxWidth: '80%',
    borderRadius: 10,
  },
  title: {
    fontWeight: 800,
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
    color: theme.palette.primary,
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 20,
  },
  description: {
    color: '#62656b',
    paddingHorizontal: 64,
    fontWeight: 600,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
