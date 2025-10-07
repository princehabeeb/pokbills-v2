import { StyleSheet, View } from 'react-native';
import React from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';

import Row from '../global/Row';
import QuickActionItem from './QuickActionItem';
import Title from '../global/Title';
import { Theme } from '../../constants/Theme';
import {
  AlignJustify,
  Phone,
  PhoneCall,
  Smile,
  Users,
  Zap,
} from 'react-native-feather';

const theme = Theme();
export default function QuickActions({ hideText }) {
  const navigation = useNavigation();
  function HandleMore() {
    navigation.navigate('payBillsPage');
  }
  return (
    <View style={styles.container}>
      {!hideText && (
        <Title
          text="What Would You Like To Do Today?"
          bold
          color={theme.palette.primary}
          position={'start'}
        />
      )}
      <Row style={styles.row}>
        <QuickActionItem
          title="Airtime"
          onPress={() =>
            navigation.navigate('buyAirtimePage', {
              phone: '',
            })
          }
        >
          <PhoneCall color={theme.palette.primary} />
        </QuickActionItem>
        <QuickActionItem
          title="Data"
          icon="wifi-outline"
          onPress={() => navigation.navigate('buyDataPage', { phone: '' })}
        />
        <QuickActionItem
          title="TV"
          icon="tv-outline"
          onPress={() => navigation.navigate('tvSubscriptionsPage')}
        />
        <QuickActionItem
          title="Electricity"
          onPress={() => navigation.navigate('electricBillPage')}
        >
          <Zap color={theme.palette.primary} />
        </QuickActionItem>
      </Row>
      <Row style={styles.row}>
        <QuickActionItem
          title="Exam Pin"
          onPress={() => navigation.navigate('examPinPage')}
        >
          <AlignJustify color={theme.palette.primary} />
        </QuickActionItem>

        <QuickActionItem
          title="Airtime Swap"
          icon="swap-horizontal"
          onPress={() => navigation.navigate('airtimeToCashPage')}
        />
        <QuickActionItem
          title="Airtime Pin"
          icon="call"
          onPress={() => navigation.navigate('airtime pin option')}
        />
        <QuickActionItem
          title="Data Pin"
          icon="wifi"
          onPress={() => navigation.navigate('data pin option')}
        />
      </Row>
      <Row style={styles.row}>
        <QuickActionItem
          title="Smile"
          onPress={() => navigation.navigate('smile data page')}
        >
          <Smile color={theme.palette.primary} />
        </QuickActionItem>
        <QuickActionItem
          title="Alpha"
          onPress={() => navigation.navigate('alpha page')}
        >
          <Phone color={theme.palette.primary} />
        </QuickActionItem>
        <QuickActionItem
          title="Referrals"
          onPress={() => navigation.navigate('referrals page')}
        >
          <Users color={theme.palette.primary} />
        </QuickActionItem>
        <QuickActionItem
          title="Logout"
          icon="exit-outline"
          onPress={() => {
            StackActions.popToTop();
            navigation.replace('welcomePage');
          }}
        ></QuickActionItem>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  card: {
    alignSelf: 'center',
    paddingHorizontal: 50,
  },
  row: {
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
