import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import Slide from './Slide';

const { width } = Dimensions.get('window');

function Carousel({ data }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const position = Animated.divide(scrollX, width);
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (data && data.length) {
      const numberOfData = data.length;
      let scrolled = 0;
      let scrollValue = 0;

      intervalRef.current = setInterval(() => {
        scrolled++;
        if (scrolled < numberOfData) {
          scrollValue = scrollValue + width;
        } else {
          scrollValue = 0;
          scrolled = 0;
        }

        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({
            animated: true,
            offset: scrollValue,
          });
        }
      }, 3000);

      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [data]);

  const keyExtractor = useCallback((item, index) => `key${index}`, []);

  if (data && data.length) {
    return (
      <View>
        <FlatList
          data={data}
          ref={flatListRef}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <Slide item={item} />;
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  dotView: { flexDirection: 'row', justifyContent: 'center' },
});

export default Carousel;
