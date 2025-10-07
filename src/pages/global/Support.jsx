import { ScrollView, StyleSheet, View, Image, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Title from '../../components/global/Title';
import ListItem from '../../components/global/ListItem';
import Row from '../../components/global/Row';
import MyIcon from '../../components/global/MyIcon';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { Theme } from '../../constants/Theme';
import { GetFaq, GetSiteDetails } from '../../store/apis/global';
import Loader from '../../components/loading/Loading';
import MyPressable from '../../components/global/MyPressable';

const theme = Theme();
const SupportPage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.globalState);
  const [settings, setSettings] = useState({});
  const [faq, setFaq] = useState([]);

  const getFaq = async () => {
    setLoading(true);
    const response = await GetFaq({ token });
    setLoading(false);
    if (response?.status === 'success') {
      setFaq(response?.response);
    }
  };

  useEffect(() => {
    const getSiteSettings = async () => {
      try {
        // setLoading(true);
        const siteDetails = await GetSiteDetails({ token });
        setLoading(false);

        if (siteDetails?.status === 'success') {
          // Use the setSettings function to update the state
          setSettings(siteDetails?.response);
        }
      } catch (error) {
        console.error('Error fetching site details:', error);
        setLoading(false);
      }
    };

    // Call the async function inside the useEffect
    getSiteSettings();
    getFaq();
  }, [token]);
  // console.log(settings);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SecondaryHeader text="CONTACT US" />

        <Image source={require('../../assets/call.png')} style={styles.image} />
        <Title text="Get in touch with us today" bold style={styles.text} />
        {loading ? (
          <View style={styles.loader}>
            <Loader />
          </View>
        ) : (
          <View>
            <ListItem
              header="FAQ"
              icon="help-circle-outline"
              text={'Frequently Asked Questions'}
              onPress={() => {
                navigation.navigate('faq', { faq });
              }}
              background={theme.palette.gray}
            />
            <ListItem
              header="Phone Number"
              icon="call-outline"
              text={settings?.phone}
              onPress={() => {
                settings?.phone
                  ? Linking.openURL(`tel:${settings?.phone}`)
                  : null;
              }}
              background={theme.palette.gray}
            />
            <ListItem
              background={theme.palette.gray}
              header="Email Address"
              icon="mail-outline"
              text={settings?.email}
              onPress={() => {
                settings?.email
                  ? Linking.openURL(`mailto:${settings?.email}`)
                  : null;
              }}
            />

            <ListItem
              background={theme.palette.gray}
              header="Whatsapp Group"
              icon="logo-whatsapp"
              text="Join our group for updates on activities"
              onPress={() => {
                settings?.whatsappgroup
                  ? Linking.openURL(settings?.whatsappgroup)
                  : null;
              }}
            />
            <ListItem
              background={theme.palette.gray}
              header="Submit A Ticket"
              icon="chatbubbles-outline"
              text="Report an issue by sending us ticket"
              onPress={() => navigation.navigate('all tickets')}
            />
            <Row center style={styles.socioContainer}>
              <MyPressable
                onPress={() => {
                  setSettings?.whatsapp
                    ? Linking.openURL(settings?.whatsapp)
                    : '';
                }}
              >
                <MyIcon
                  name="logo-whatsapp"
                  style={styles.icon}
                  color="green"
                />
              </MyPressable>
              <MyPressable
                onPress={() => {
                  settings?.facebook
                    ? Linking.openURL(settings?.facebook)
                    : null;
                }}
              >
                <MyIcon
                  name="logo-facebook"
                  style={styles.icon}
                  color="#4586ea"
                />
              </MyPressable>
              <MyPressable
                onPress={() => {
                  settings?.instagram
                    ? Linking.openURL(settings?.instagram)
                    : null;
                }}
              >
                <MyIcon
                  name="logo-instagram"
                  style={styles.icon}
                  color="#cf267b"
                />
              </MyPressable>
              <MyPressable
                onPress={() => {
                  settings?.twitter ? Linking.openURL(settings?.twitter) : null;
                }}
              >
                <MyIcon
                  name="logo-twitter"
                  style={styles.icon}
                  color="#1da1f2"
                />
              </MyPressable>
            </Row>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SupportPage;

const styles = StyleSheet.create({
  container: {
    padding: theme.window.windowWidth * 0.03,
    backgroundColor: theme.palette.white,
    minHeight: theme.window.windowHeight / 1.5,
  },
  icon: {
    marginRight: 20,
    marginBottom: 50,
  },
  text: {
    marginVertical: 20,
  },
  socioContainer: {
    marginTop: 10,
  },
  image: {
    width: 250,
    height: 150,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
  },
});
