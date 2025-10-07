import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';

import DataFormSection from '../../components/buydata/DataFormSection';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';

const theme = Theme();
const BuyDataPage = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[1]}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <>
            <View style={styles.container}>
              <SecondaryHeader text="Buy Data" />
            </View>

            <DataFormSection />
          </>
        )}
      />
    </View>
  );
};

export default BuyDataPage;

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});
