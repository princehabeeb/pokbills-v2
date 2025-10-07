import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Frown, Meh, Smile } from 'react-native-feather';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

import Title from '../../components/global/Title';
import RowText from '../../components/global/RowText';
import Row from '../../components/global/Row';
import MyButton from '../../components/global/Mybutton';
import { Theme } from '../../constants/Theme';
import MyIcon from '../../components/global/MyIcon';
import formatMoney from '../../constants/FormatNumber';
import FormatDate from '../../constants/FormatDate';
import Divider from '../../components/global/Divider';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { GetUserDetails } from '../../store/apis/user';
import { loginUser } from '../../store/globalState';
import MyPressable from '../../components/global/MyPressable';
import { GetTransactionDetails } from '../../store/apis/services';
import Loader from '../../components/loading/Loading';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import FormatTime from '../../constants/FormatTime';

const theme = Theme();
export default function AirtimeReceipt({ route, navigation }) {
  const { data } = route?.params;
  const [showMore, setShowMore] = useState(false);
  const { user, token } = useSelector((state) => state.globalState);
  const dispatch = useDispatch();
  const viewShotRef = useRef();
  const [hideObject, setHideObject] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getNewUser() {
    const userData = await GetUserDetails({
      token,
    });
    if (userData.status === 'success') {
      const newUser = {
        token,
        data: userData?.response,
      };
      dispatch(loginUser(newUser));
    }
  }

  const getTransactionDetails = async () => {
    setLoading(true);
    try {
      const response = await GetTransactionDetails({
        ref: data?.ref ? data?.ref : data?.transref,
        token,
      });

      if (response.status === 'success') {
        setTransactionDetails(response?.response);
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.ERROR,
        text1: 'Error',
        text2: error?.message || 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewUser();
    getTransactionDetails();
  }, []);

  let color;
  if (
    data?.status?.toLowerCase() === 'fail' ||
    data?.status?.toLowerCase() === 'failed'
  ) {
    color = 'red';
  }
  if (data?.status?.toLowerCase() === 'success') {
    color = 'green';
  }
  if (
    data?.status?.toLowerCase() === 'processing' ||
    data?.status?.toLowerCase() === 'pending'
  ) {
    color = 'orange';
  }

  const onCapture = async () => {
    setHideObject(true);
    try {
      const uri = await viewShotRef.current.capture();
      const shareResponse = await Share.open({ url: uri });
    } catch (error) {
      console.error('Error capturing view:', error);
    }
    // setHideObject(false);
  };

  const handleViewHelp = () => {
    navigation.navigate('helpPage');
  };

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Transaction Details" hideBack />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Loader />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 30 }}
        >
          <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
            <View style={styles.innerContainer}>
              <View style={{ alignItems: 'center' }}>
                {data?.status?.toLowerCase() === 'success' && (
                  <Smile color={'green'} width={60} height={60} />
                )}
                {data?.status?.toLowerCase() === 'fail' ||
                  (data?.status?.toLowerCase() === 'failed' && (
                    <Frown color={'red'} width={60} height={60} />
                  ))}
                {data?.status?.toLowerCase() === 'processing' ||
                  (data?.status?.toLowerCase() === 'pending' && (
                    <Meh color={'orange'} width={60} height={60} />
                  ))}
                <Title text="Transaction Receipt" bold />
              </View>
              <View style={{ marginVertical: 20 }}>
                <RowText
                  header="Ref No:"
                  title={data?.ref ? data?.ref : data?.transref}
                />
                <RowText
                  header="Date:"
                  title={FormatDate(transactionDetails?.date)}
                />
                <RowText
                  header="Time:"
                  title={FormatTime(transactionDetails?.date)}
                />
                <RowText
                  header="Service:"
                  title={
                    transactionDetails?.type || transactionDetails?.servicename
                  }
                />
                <RowText
                  header="Description:"
                  title={transactionDetails?.servicedesc}
                />
                <Divider />
                <Row style={{ justifyContent: 'space-between' }}>
                  <Title
                    text={`Status: ${data?.status}`}
                    bold
                    small
                    color={theme.palette.black}
                    style={{ backgroundColor: color, ...styles.success }}
                  />
                  {!hideObject && (
                    <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                      <Row style={styles.moreBu}>
                        <Title
                          text={showMore ? 'Less Details' : 'More Details'}
                          bold
                          small
                          color={theme.palette.black}
                          style={{ marginRight: 5 }}
                        />
                        <MyIcon name="chevron-forward" size={20} />
                      </Row>
                    </TouchableOpacity>
                  )}
                </Row>
                {showMore && (
                  <View style={{ marginTop: 10 }}>
                    <RowText
                      header="Amount:"
                      title={`₦${formatMoney(
                        parseFloat(transactionDetails?.amount)
                      )}`}
                    />
                    <RowText
                      header="Old Balance:"
                      title={formatMoney(
                        parseFloat(transactionDetails?.oldbal)
                      )}
                    />
                    <RowText
                      header="New Balance:"
                      title={formatMoney(
                        parseFloat(transactionDetails?.newbal)
                      )}
                    />
                    {data?.apiresponse && (
                      <RowText
                        header="API Response:"
                        title={data?.apiresponse}
                      />
                    )}
                    <Divider />
                  </View>
                )}
              </View>
            </View>
          </ViewShot>

          <View style={styles.row}>
            <MyPressable style={styles.helpCode} onPress={handleViewHelp}>
              <Title text="View help code" small link />
              <Title text="Help code to check your balance" small />
            </MyPressable>
            <MyButton
              style={styles.button}
              text="Share"
              background={'green'}
              onPress={onCapture}
            />
            <MyButton
              style={styles.button}
              background="red"
              text="Report"
              onPress={() =>
                navigation.navigate('report transaction screen', {
                  ref: data?.ref ? data?.ref : data?.transref,
                  des: data?.message,
                })
              }
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  row: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
  button: {
    transform: [{ translateX: 2 }],
  },
  success: {
    color: theme.palette.white,
    padding: 10,
    textTransform: 'capitalize',
    borderRadius: 8,
  },
  moreBu: {
    backgroundColor: theme.palette.gray,
    padding: 10,
    borderRadius: 8,
    ...theme.ShadowLight,
  },
  innerContainer: {
    backgroundColor: theme.palette.white,
    padding: 10,
    borderRadius: 8,
  },
  helpCode: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: theme.palette.gray,
    borderRadius: 10,
    width: '100%',
  },
});
