import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import * as Print from 'expo-print';
import Share from 'react-native-share';
import Clipboard from '@react-native-community/clipboard';

import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../global/SecondaryHeader';
import Row from '../global/Row';
import Title from '../global/Title';
import { Check, Copy } from 'react-native-feather';
import MyCard from '../global/MyCard';
import MyIcon from '../global/MyIcon';
import {
  GetAirtimePinDetails,
  GetDataPinDetails,
} from '../../store/apis/services';
import { useSelector } from 'react-redux';
import { set } from 'react-native-reanimated';
import Loader from '../loading/Loading';

const theme = Theme();

const PinDetailsScreen = () => {
  const { ref, network, data, item } = useRoute().params;
  const { token } = useSelector((state) => state.globalState);

  // const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    return;
    const getDetails = async () => {
      setLoading(true);
      let response;
      if (data) response = await GetDataPinDetails({ ref, token });
      else response = await GetAirtimePinDetails({ ref, token });
      console.log(response);
      if (response?.status === 'success') {
        setItem(response?.response);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    getDetails();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </View>
    );
  }

  let color;
  switch (network.toLowerCase()) {
    case 'mtn':
      color = '#fdcc06';
      break;
    case 'glo':
      color = '#54ae46';
      break;
    case 'airtel':
      color = '#ff0000';
      break;
    case '9mobile':
      color = '#006e53';
      break;
    default:
      color = theme.palette.gray;
  }

  const serials = item?.serial && item?.serial?.split(',');
  const tokens = item?.tokens && item?.tokens?.split(',');
  const html = `
<html>
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
    />
    <style>
      .body {
        min-height: 100dvh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      section {
        display: flex;
        justify-content: center;
        background-color: rgba(158, 154, 149, 0.418);
        border-radius: 10px;
        overflow: hidden;
        margin: 10px;
      }
      .section-1 {
        background-color: ${color};
        padding: 10px;
      }
      p {
        margin: 0;
        text-align: center;
        margin-top: 5px;
        font-family: sans-serif;
        letterspacing: 1.5;
        font-size: 30px;
      }
      .p1 {
        /* color: white; */
      }
      .section-2 {
        padding: 10px;
      }
      .small {
        font-size: 20px;
        letter-spacing: 0px;
      }
      .bold {
        font-weight: bold;
      }
      .pin {
        background-color: rgb(187, 177, 177);
        padding: 8px;
        border-radius: 15px;
      }
      .gray {
        color: gray;
      }
    </style>
  </head>
  <body class="body">
    ${serials.map((serial, index) => {
      return `<section>
      <div class="section-1">
        <p class="p1" style="color:#fff">${item?.network}</p>
        <p class="p1">${item?.data ? 'Data' : 'Airtime'} Pin</p>
        <p class="p1 bold">${
          item?.data ? item?.datasize : `₦${item?.amount}`
        }</p>
        <p class="p1 small">${serial}</p>
      </div>
      <div class="section-2">
        <p class="small bold" style="color: ${theme.palette.primary}">${
        item?.business
      }</p>
        <p class="pin small bold">${tokens[index]}</p>
        <p class="small">${`Load ${item?.loadpin}  Balance ${item?.checkbalance}`}</p>
     
      </div>
    </section>`;
    })}
  </body>
</html>

`;

  const renderItem = ({ item: { serial, tokens } }) => (
    <ListItem
      color={color}
      network={item?.network}
      isData={item?.data}
      datasize={item?.datasize}
      serial={serial}
      tokens={tokens}
      loadpin={item?.loadpin}
      checkbalance={item?.checkbalance}
      amount={item?.amount}
      business={item?.business}
    />
  );

  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
      pageSize: 'A4',
      orientation: 'portrait',
    });

    const shareResponse = await Share.open({ url: uri });
  };

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Pin Details" />
      <View>
        <TouchableOpacity style={styles.shareButton} onPress={printToFile}>
          <Row>
            <MyIcon name="share-social" />
            <Title text="Share" bold />
          </Row>
        </TouchableOpacity>
      </View>
      <FlashList
        data={
          serials
            ? serials?.map((serial, index) => ({
                serial,
                tokens: tokens[index],
              }))
            : []
        }
        estimatedItemSize={100}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const ListItem = ({
  color,
  network,
  isData,
  datasize,
  serial,
  tokens,
  loadpin,
  checkbalance,
  amount,
  business,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = ({ title }) => {
    Clipboard.setString(title);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Row style={styles.innerContainer}>
      <View style={[styles.leftContainer, { backgroundColor: color }]}>
        <Title text={network} color={theme.palette.white} small bold />
        <Title
          text={`${isData ? 'Data' : 'Airtime'} PIN`}
          color={theme.palette.white}
          bold
        />
        <Title
          text={isData ? datasize : `₦${amount}`}
          color={theme.palette.white}
        />
        <Title text={serial} color={theme.palette.white} small bold />
      </View>
      <View style={styles.rightContainer}>
        <Title
          text={business}
          color={theme.palette.primary}
          bold
          style={{ marginBottom: 5 }}
        />
        <MyCard style={styles.copyContainer}>
          <Title text={tokens} style={{ maxWidth: '90%' }} small />
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => handleCopyClick({ title: tokens })}
          >
            {isCopied ? (
              <Check color={theme.palette.black} />
            ) : (
              <Copy color={theme.palette.black} />
            )}
          </TouchableOpacity>
        </MyCard>
        <Title text={`Load ${loadpin}  Balance ${checkbalance}`} small />
        
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.window.windowWidth * 0.05,
  },
  innerContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    minHeight: 100,
    alignItems: 'stretch',
    marginTop: theme.window.windowWidth * 0.04,
  },
  leftContainer: {
    flex: 1.2,
    justifyContent: 'center',
    padding: 10,
  },
  rightContainer: {
    flex: 2,
    backgroundColor: theme.palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  copyContainer: {
    backgroundColor: theme.palette.gray,
    borderRadius: 10,
    padding: 5,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 3,
  },
  copyButton: {
    // Add styles for the copy button if needed
  },
  shareButton: {
    backgroundColor: theme.palette.gray,
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 3,
    marginTop: 10,
  },
});

export default PinDetailsScreen;
