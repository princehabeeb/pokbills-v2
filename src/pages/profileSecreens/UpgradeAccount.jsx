import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import UpgradeOption from '../../components/upgradeAccount/UpgradeOption';
import { Theme } from '../../constants/Theme';
import { GetKYCDetails } from '../../store/apis/UpgradeAccount';
import LoadingPage from '../../components/loading/LoadingPage';
import Title from '../../components/global/Title';

const theme = Theme();

export default function UpgradeAccount({ navigation }) {
  const { user } = useSelector((state) => state.globalState);
  const [userLevel, setUserLevel] = useState(parseInt(user?.account_level));
  const [details, setDetails] = useState([]);
  const { token } = useSelector((state) => state.globalState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const getDetails = async () => {
    setLoading(true);
    const response = await GetKYCDetails({ token });

    setLoading(false);

    if (response?.status === 'success') {
      setDetails(response?.response.kyc_details);
      setMessage(response?.message);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (loading) {
    return <LoadingPage show={loading} />;
  }

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Upgrade Account" />
      <ScrollView>
        {message && (
          <Title
            text={message}
            position="left"
            style={{ marginBottom: 10, marginLeft: 10 }}
          />
        )}
        <UpgradeOption
          level={details[0]?.level}
          amount={details[0]?.limit}
          text={details[0]?.requirements}
          isDone={true}
        />
        <UpgradeOption
          level={details[1]?.level}
          amount={details[1]?.limit}
          text={details[1]?.requirements}
          isDone={userLevel >= 2}
          onPress={() =>
            userLevel === 1 ? navigation.navigate('level 2') : null
          }
        />
        <UpgradeOption
          level={details[2]?.level}
          amount={details[2]?.limit}
          text={details[2]?.requirements}
          isDone={userLevel >= 3}
          onPress={() =>
            userLevel === 2 ? navigation.navigate('level 3') : null
          }
        />
        <UpgradeOption
          level={details[3]?.level}
          amount={details[3]?.limit}
          text={details[3]?.requirements}
          isDone={userLevel >= 4}
          onPress={() =>
            userLevel === 3 ? navigation.navigate('level 4') : null
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.window.windowWidth * 0.03,
  },
});
