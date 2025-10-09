import { ScrollView, StyleSheet, View, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Theme } from '../../constants/Theme';
import Login from '../../components/auth/Login';
// Removed expo-status-bar in favor of native StatusBar for translucency
import LoadingPage from '../../components/loading/LoadingPage';

const theme = Theme();
const LoginPage = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const { islogin } = route.params;
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.bottomContainer}>
          <Login islogin={islogin} loading={loading} setLoading={setLoading} />
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: theme.palette.white,
  },

  bottomContainer: {
    flex: 2,
    zIndex: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    transform: [
      {
        translateY: -20,
      },
    ],
  },

  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
});
