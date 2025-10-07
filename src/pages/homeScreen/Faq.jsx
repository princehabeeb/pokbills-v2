import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import Title from '../../components/global/Title';

export default function Faq() {
  const faq = useRoute().params.faq;
  const sortedFaq = faq.sort((a, b) => a.fId - b.fId);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SecondaryHeader text="FAQ" />

        {sortedFaq?.map((item, index) => (
          <View key={index} style={styles.item}>
            <Title position={'left'} bold text={item.title} />
            <Title
              position={'left'}
              small
              style={{ marginTop: 10 }}
              text={item.content}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    alignItems: 'flex-start',
  },
  item: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
});
