import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Theme } from '../constants/Theme';

import HomeScreen from '../pages/homeScreen/Home';
import MyIcon from '../components/global/MyIcon';
import HistoryPage from '../pages/global/History';
import SupportPage from '../pages/global/Support';
import FundWalletPage from '../pages/homeScreen/FundWallet';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ProfilePage from '../pages/global/ProfilePage';

const BottomTab = createBottomTabNavigator();
const theme = Theme();

export function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.palette.primary,
        tabBarStyle: {
          borderTopEndRadius: 10,
          borderTopLeftRadius: 10,
          paddingBottom: 10,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'homePage') {
            iconName = 'home';
          } else if (route.name === 'historyPage') {
            iconName = 'history';
          } else if (route.name === 'profilePage') {
            return <MyIcon name="person" size={size} color={color} />;
          } else if (route.name === 'supportPage') {
            iconName = 'comments';
          } else if (route.name === 'fundWalletPage') {
            return (
              <TouchableOpacity
                style={styles.addIcon}
                onPress={() => navigation.navigate('services')}
              >
                <MyIcon name="add" size={30} color="white" />
              </TouchableOpacity>
            );
          }
          return <MyIcon name={iconName} size={size} color={color} material />;
        },
      })}
    >
      <BottomTab.Screen
        name="homePage"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <BottomTab.Screen
        name="historyPage"
        component={HistoryPage}
        options={{
          title: 'History',
        }}
      />
      <BottomTab.Screen
        name="fundWalletPage"
        component={FundWalletPage}
        options={() => ({
          tabBarLabel: () => null,
        })}
      />
      <BottomTab.Screen
        name="profilePage"
        component={ProfilePage}
        options={{
          title: 'Profile',
        }}
      />
      <BottomTab.Screen
        name="supportPage"
        component={SupportPage}
        options={{
          title: 'Support',
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  addIcon: {
    backgroundColor: theme.palette.primary,
    ...theme.shadow,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // transform: [{ translateY: -20 }],
    zIndex: 10,
  },
});
