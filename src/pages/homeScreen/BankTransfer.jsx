import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import MyPressable from '../../components/global/MyPressable';
import Title from '../../components/global/Title';
import { Theme } from '../../constants/Theme';
import {
  GenerateVirtualAccount,
  GetSiteDetails,
} from '../../store/apis/global';
import Loader from '../../components/loading/Loading';
import BankTransferItem from '../../components/fund/BankTransferItem';
import { GetUserDetails } from '../../store/apis/user';
import useSaveUser from '../../hooks/saveUser';

const theme = Theme();
export default function BankTransfer() {
  const { token, user, siteSettings } = useSelector(
    (state) => state.globalState
  );
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const { getUserInfo } = useSaveUser();

  const handleGenerateAccount = async (bank) => {
    try {
      setLoading(true);
      const newUser = await GetUserDetails({ token });
      const siteSettings = await GetSiteDetails({ token });

      if (siteSettings?.response?.kycShouldEnable !== 'no') {
        if (newUser?.response?.kycstatus !== 'verified') {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'KYC not completed',
            textBody: 'Please complete your KYC before generating account',
            button: 'close',
            autoClose: true,
          });
          navigation.navigate('level 2');
          setLoading(false);
          return;
        }
      }
      setLoading(true);
      const response = await GenerateVirtualAccount({ token, bank });

      if (response?.status === 'success') {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Account Generated',
          textBody: response?.message,
          button: 'close',
        });
        getUserInfo();
        setLoading(false);
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Account Generation Failed',
          textBody: response?.message,
          button: 'close',
        });
        setLoading(false);
        getUserInfo();
      }
    } catch (error) {
      console.log(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Account Generation Failed',
        textBody: 'An error occured, please try again',
        button: 'close',
      });
      setLoading(false);
    }
  };

  const [isCopied, setIsCopied] = React.useState(false);
  const handleCopyClick = ({ title }) => {
    setIsCopied(true);
    Clipboard.setString(title);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  console.log(user);
  return (
    <View style={styles.container}>
      <SecondaryHeader text="Bank Transfer" />

      {loading && (
        <View style={styles.innerContainer}>
          <Loader show={true} />
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <Title
          small
          text="Transfer to any of the account numbers below and it would be credited to your account automatically"
        />

        {user?.wemabank?.status?.toLowerCase() === 'on' ? (
          user?.wemabank?.account !== null ? (
            <BankTransferItem
              header={'Wema Bank'}
              title={user?.wemabank?.account}
              name={user?.wemabank?.charges}
              type={user?.wemabank?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.wemabank?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('wema')}
            >
              <Title text="Get Wema Bank" />
            </MyPressable>
          )
        ) : null}

        {user?.moniepointbank?.status?.toLowerCase() === 'on' ? (
          user?.moniepointbank?.account !== null ? (
            <BankTransferItem
              header={'Moniepoint Bank'}
              title={user?.moniepointbank?.account}
              name={user?.moniepointbank?.charges}
              type={user?.moniepointbank?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.moniepointbank?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('moniepoint')}
            >
              <Title text="Get Moniepoint Bank" />
            </MyPressable>
          )
        ) : null}

        {user?.sterlingbank?.status?.toLowerCase() === 'on' ? (
          user?.sterlingbank?.account !== null ? (
            <BankTransferItem
              header={'Sterling Bank'}
              title={user?.sterlingbank?.account}
              name={user?.sterlingbank?.charges}
              type={user?.sterlingbank?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.sterlingbank?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('sterling')}
            >
              <Title text="Get Sterling Bank" />
            </MyPressable>
          )
        ) : null}

        {user?.fidelitybank?.status?.toLowerCase() === 'on' ? (
          user?.fidelitybank?.account !== null ? (
            <BankTransferItem
              header={'Fidelity Bank'}
              title={user?.fidelitybank?.account}
              name={user?.fidelitybank?.charges}
              type={user?.fidelitybank?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.fidelitybank?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('fidelity')}
            >
              <Title text="Get Fidelity Bank" />
            </MyPressable>
          )
        ) : null}

        {user?.gtbank?.status?.toLowerCase() === 'on' ? (
          user?.gtbank?.account !== null ? (
            <BankTransferItem
              header={'GT Bank'}
              title={user?.gtbank?.account}
              name={user?.gtbank?.charges}
              type={user?.gtbank?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.gtbank?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('gt')}
            >
              <Title text="Get GT Bank" />
            </MyPressable>
          )
        ) : null}

        {user?.ninepsbbank?.status?.toLowerCase() === 'on' ? (
          user?.ninepsbbank?.account !== null ? (
            <BankTransferItem
              header={'9PSB Bank'}
              title={user?.ninepsbbank?.account}
              name={user?.ninepsbbank?.charges}
              type={user?.ninepsbbank?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.ninepsbbank?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('ninepsb')}
            >
              <Title text="Get 9psb" />
            </MyPressable>
          )
        ) : null}

        {user?.palmpay?.status?.toLowerCase() === 'on' ? (
          user?.palmpay?.account !== null ? (
            <BankTransferItem
              header={'Palmpay Bank'}
              title={user?.palmpay?.account}
              name={user?.palmpay?.charges}
              type={user?.palmpay?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.palmpay?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('palmpay')}
            >
              <Title text="Get Palmpay" />
            </MyPressable>
          )
        ) : null}

        {user?.palmpay_billstack?.status?.toLowerCase() === 'on' ? (
          user?.palmpay_billstack?.account !== null ? (
            <BankTransferItem
              header={'Palmpay Billstack'}
              title={user?.palmpay_billstack?.account}
              name={user?.palmpay_billstack?.charges}
              type={user?.palmpay_billstack?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.palmpay_billstack?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('palmpay_billstack')}
            >
              <Title text="Get Palmpay" />
            </MyPressable>
          )
        ) : null}

        {user?.ninepsbbank_billstack?.status?.toLowerCase() === 'on' ? (
          user?.ninepsbbank_billstack?.account !== null ? (
            <BankTransferItem
              header={'9psb Billstack'}
              title={user?.ninepsbbank_billstack?.account}
              name={user?.ninepsbbank_billstack?.charges}
              type={user?.ninepsbbank_billstack?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.ninepsbbank_billstack?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('ninepsbbank_billstack')}
            >
              <Title text="Get 9psb" />
            </MyPressable>
          )
        ) : null}

        {user?.palmpay_billstack?.status?.toLowerCase() === 'on' ? (
          user?.palmpay_billstack?.account !== null ? (
            <BankTransferItem
              header={'Palmpay'}
              title={user?.palmpay_billstack?.account}
              name={user?.palmpay_billstack?.charges}
              type={user?.palmpay_billstack?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.palmpay_billstack?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('palmpay_billstack')}
            >
              <Title text="Get Palmpay" />
            </MyPressable>
          )
        ) : null}

        {user?.bankly_billstack?.status?.toLowerCase() === 'on' ? (
          user?.bankly_billstack?.account !== null ? (
            <BankTransferItem
              header={'Bankly'}
              title={user?.bankly_billstack?.account}
              name={user?.bankly_billstack?.charges}
              type={user?.bankly_billstack?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.bankly_billstack?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('bankly_billstack')}
            >
              <Title text="Get Bankly" />
            </MyPressable>
          )
        ) : null}

        {user?.ninepsbbank_payscribe?.status?.toLowerCase() === 'on' ? (
          user?.ninepsbbank_payscribe?.account !== null ? (
            <BankTransferItem
              header={'9psb'}
              title={user?.ninepsbbank_payscribe?.account}
              name={user?.ninepsbbank_payscribe?.charges}
              type={user?.ninepsbbank_payscribe?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.ninepsbbank_payscribe?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('ninepsbbank_payscribe')}
            >
              <Title text="Get 9psb" />
            </MyPressable>
          )
        ) : null}

        {user?.paga_strowallet?.status?.toLowerCase() === 'on' ? (
          user?.paga_strowallet?.account !== null ? (
            <BankTransferItem
              header={'Paga'}
              title={user?.paga_strowallet?.account}
              name={user?.paga_strowallet?.charges}
              type={user?.paga_strowallet?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.paga_strowallet?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('paga_strowallet')}
            >
              <Title text="Get Paga" />
            </MyPressable>
          )
        ) : null}

        {user?.bankly_strowallet?.status?.toLowerCase() === 'on' ? (
          user?.bankly_strowallet?.account !== null ? (
            <BankTransferItem
              header={'Bankly'}
              title={user?.bankly_strowallet?.account}
              name={user?.bankly_strowallet?.charges}
              type={user?.bankly_strowallet?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.bankly_strowallet?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('bankly_strowallet')}
            >
              <Title text="Get Bankly" />
            </MyPressable>
          )
        ) : null}

        {user?.safeheaven_strowallet?.status?.toLowerCase() === 'on' ? (
          user?.safeheaven_strowallet?.account !== null ? (
            <BankTransferItem
              header={'Safeheaven'}
              title={user?.safeheaven_strowallet?.account}
              name={user?.safeheaven_strowallet?.charges}
              type={user?.safeheaven_strowallet?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.safeheaven_strowallet?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('safeheaven_strowallet')}
            >
              <Title text="Get Safeheaven" />
            </MyPressable>
          )
        ) : null}

        {user?.palmpay_topupmatepay?.status?.toLowerCase() === 'on' ? (
          user?.palmpay_topupmatepay?.account !== null ? (
            <BankTransferItem
              header={'Palmpay'}
              title={user?.palmpay_topupmatepay?.account}
              name={user?.palmpay_topupmatepay?.charges}
              type={user?.palmpay_topupmatepay?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.palmpay_topupmatepay?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('palmpay_topupmatepay')}
            >
              <Title text="Get Palmpay" />
            </MyPressable>
          )
        ) : null}

        {user?.kredi_topupmatepay?.status?.toLowerCase() === 'on' ? (
          user?.kredi_topupmatepay?.account !== null ? (
            <BankTransferItem
              header={'Kredi'}
              title={user?.kredi_topupmatepay?.account}
              name={user?.kredi_topupmatepay?.charges}
              type={user?.kredi_topupmatepay?.chargestype}
              isCopied={isCopied}
              onclick={() =>
                handleCopyClick({
                  title: user?.kredi_topupmatepay?.account,
                })
              }
            />
          ) : (
            <MyPressable
              style={styles.button}
              onPress={() => handleGenerateAccount('kredi_topupmatepay')}
            >
              <Title text="Get Kredi" />
            </MyPressable>
          )
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  button: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
  },
  innerContainer: {
    width: theme.window.windowWidth,
    height: theme.window.windowHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.518)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
