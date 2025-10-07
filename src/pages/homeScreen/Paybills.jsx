import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';

import Title from '../../components/global/Title';
import ServicesList from '../../constants/ServicesList';
import ServiceItem from '../../components/Services/ServiceItem';

export default function PayBills({ navigation }) {
  const handleClick = (id) => {
    switch (id) {
      case 1:
        navigation.navigate('buyAirtimePage');
        break;

      case 2:
        navigation.navigate('buyDataPage');
        break;

      case 3:
        navigation.navigate('tvSubscriptionsPage');
        break;

      case 4:
        navigation.navigate('electricBillPage');
        break;

      case 6:
        navigation.navigate('examPinPage');
        break;

      case 7:
        navigation.navigate('dataPinPage');
        break;

      case 8:
        navigation.navigate('rechargePinPage');
        break;

      case 9:
        navigation.navigate('alphaCallerPage');
        break;

      case 10:
        navigation.navigate('smileDataPage');
        break;

      case 12:
        navigation.navigate('airtimeToCashPage');
        break;

      case 13:
        navigation.navigate('fundWalletPage');
        break;

      case 14:
        navigation.navigate('withdrawPage');
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Title text="All Our Services" header style={{ marginTop: 20 }} />
      <FlatList
        data={ServicesList}
        renderItem={({ item }) => (
          <ServiceItem item={item} onPress={() => handleClick(item.id)} />
        )}
        numColumns={3}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
