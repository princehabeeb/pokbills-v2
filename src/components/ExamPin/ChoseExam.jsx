import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import Title from '../global/Title';
import ExamList from '../../constants/ExamList';
import NetworkItem from '../buyAirtime/NetworkItem';
import { Theme } from '../../constants/Theme';

const theme = Theme();
export default function ChoseExam() {
  const [active, setActive] = useState(1);
  return (
    <View style={styles.container}>
      <Title text="Chose exam" header style={{ marginTop: 20 }} />
      <FlatList
        data={ExamList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <NetworkItem
            item={item}
            active={active}
            onPress={() => setActive(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.window.windowWidth > 600 ? 20 : 10,
    alignItems: 'center',
  },
});
