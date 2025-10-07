import { FlatList, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import NetworkItem from '../buyAirtime/NetworkItem';
import Title from '../global/Title';
import { Theme } from '../../constants/Theme';
import TvList from '../../constants/TvsList';

const theme = Theme();
const TvsSection = () => {
  const [active, setActive] = useState(null);
  return (
    <View style={styles.container}>
      <FlatList
        data={TvList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <NetworkItem item={item} active={active} />}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

export default TvsSection;

const styles = StyleSheet.create({
  container: {
    marginTop: theme.window.windowWidth > 600 ? 20 : 10,
    alignItems: 'center',
  },
});
