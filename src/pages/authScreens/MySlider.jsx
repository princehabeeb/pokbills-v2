import { Animated, FlatList, StyleSheet, View, StatusBar } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
// Alternative: import { EdgeToEdge } from 'react-native-edge-to-edge';

import { SlidesList } from '../../constants/SliderList';
import SliderItem from '../../components/slider/SliderItem';
import Paginator from '../../components/slider/Paginator';
import NextButton from '../../components/slider/NextButton';
import { Theme } from '../../constants/Theme';
// Use native StatusBar for translucency

const MySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const slideRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Alternative Edge-to-Edge implementation:
      <EdgeToEdge style={styles.edgeToEdge}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          ... existing content ...
        </View>
      </EdgeToEdge>
      */}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <FlatList
            data={SlidesList}
            renderItem={({ item }) => <SliderItem item={item} />}
            horizontal
            ref={slideRef}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.key}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
          />
        </View>
        <Paginator data={SlidesList} scrollX={scrollX} />
        <NextButton
          percentage={(currentIndex + 1) * (100 / SlidesList.length)}
          scrollRef={slideRef}
        />
      </View>
    </SafeAreaView>
  );
};

export default MySlider;
const theme = Theme();
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.palette.white,
    paddingTop: StatusBar.currentHeight,
  },
  // Alternative edge-to-edge styles:
  edgeToEdge: {
    flex: 1,
    backgroundColor: theme.palette.white,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.palette.white,
  },
});
