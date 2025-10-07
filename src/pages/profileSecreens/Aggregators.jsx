import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';

import Row from '../../components/global/Row';
import MyCard from '../../components/global/MyCard';
import Title from '../../components/global/Title';
import { Theme } from '../../constants/Theme';
import MyIcon from '../../components/global/MyIcon';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import formatMoney from '../../constants/FormatNumber';

const theme = Theme();
export default function AggregatorsPage() {
  const { user } = useSelector((state) => state.globalState);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SecondaryHeader text="Aggregators" />
      <LinearGradient
        colors={[theme.palette.primary, theme.palette.secondary]}
        style={styles.linearGradient}
      >
        <Title
          text={`Hi, ${user?.firstname} ${user?.lastname}`}
          color={theme.palette.white}
          header
        />
        <Title
          text={`₦${formatMoney(parseFloat(user?.refwallet))}`}
          color={theme.palette.white}
          header
          style={{ marginTop: 20 }}
        />
        <Title text={`Commission Balance`} color={theme.palette.white} />
      </LinearGradient>

      <View style={styles.bottomContainer}>
        <Row style={styles.row}>
          <ListItem
            name="Add Customer"
            icon="person"
            onPress={() => navigation.navigate('aggregators add customer')}
          />
          <ListItem
            name="View Customer"
            icon="person"
            // onPress={() => navigation.navigate('aggregators view customer')}
          />
        </Row>
        <Row>
          <ListItem
            icon="person"
            name="View Transaction"
            // onPress={() => navigation.navigate('aggregators view transaction')}
          />
          <ListItem
            icon="person"
            name="View Commission"
            // onPress={() => navigation.navigate('aggregators view commission')}
          />
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  linearGradient: {
    padding: 10,
    borderRadius: 10,
  },
  topContainer: {},
  bottomContainer: {
    marginTop: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    alignItems: 'center',
  },
  button: {
    flex: 1,
    margin: 10,
  },
});

const ListItem = ({ icon, name, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MyCard style={styles.card}>
        <MyIcon name={icon} />
        <Title text={name} bold />
      </MyCard>
    </TouchableOpacity>
  );
};
