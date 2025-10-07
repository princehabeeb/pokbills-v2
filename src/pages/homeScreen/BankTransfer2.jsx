import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SnackBar from 'react-native-snackbar-component';
import Clipboard from '@react-native-community/clipboard';
import { useSelector } from 'react-redux';

import Title from '../../components/global/Title';
import { Theme } from '../../constants/Theme';
import BankTransferItem from '../../components/fund/BankTransferItem';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import MyCard from '../../components/global/MyCard';
import {
  GenerateKudaVirtualAccount,
  GenerateMonnifyVirtualAccount,
  GetSiteDetails,
} from '../../store/apis/global';
import Loader from '../../components/loading/Loading';

const theme = Theme();
export default function BankTransferPage() {
  const [isCopied, setIsCopied] = useState(false);
  const [bankDetails, setBankDetails] = useState([]);
  const { token, user } = useSelector((state) => state.globalState);
  const [loading, setLoading] = useState(false);
  const [banksSettings, setBanksSettings] = useState({});
  const handleCopyClick = ({ title }) => {
    Clipboard.setString(title);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const getBankList = async () => {
    setLoading(true);
    const virtualAccountsResponse = await GenerateMonnifyVirtualAccount({
      token,
    });

    const siteDetails = await GetSiteDetails({ token });
    setLoading(false);

    const banks = [];
    const bankSettings = siteDetails?.response;
    console.log(bankSettings);
    setBanksSettings(bankSettings);
    if (virtualAccountsResponse?.status === 'success') {
      const virtualAccounts = virtualAccountsResponse?.response;
      // Check and add Fidelity Bank
      if (bankSettings?.fidelity_bank_status?.toLowerCase() === 'On') {
        banks.push({
          id: banks.length + 1,
          header: 'Fidelity Bank',
          title: virtualAccounts.fidelity_bank,
          name: bankSettings?.monnify_charges,
        });
      }

      // Check and add Sterling Bank
      if (bankSettings?.sterling_bank_status?.toLowerCase() === 'On') {
        banks.push({
          id: banks.length + 1,
          header: 'Sterling Bank',
          title: virtualAccounts.sterling_bank,
          name: bankSettings?.monnify_charges,
        });
      }

      // Check and add Wema Bank
      if (bankSettings?.wema_bank_status?.toLowerCase() === 'On') {
        banks.push({
          id: banks.length + 1,
          header: 'Wema Bank',
          title: virtualAccounts.wema_bank,
          name: bankSettings?.monnify_charges,
        });
      }

      // Check and add Moniepoint Bank
      if (bankSettings?.moniepoint_bank_status?.toLowerCase() === 'On') {
        banks.push({
          id: banks.length + 1,
          header: 'Moniepoint Bank',

          title: virtualAccounts.moniepoint_bank,
          name: bankSettings?.monnify_charges,
        });
      }

      // Check and add Providus Bank
      if (bankSettings?.providus_bank_status?.toLowerCase() === 'On') {
        banks.push({
          id: banks.length + 1,
          header: 'Providus Bank',

          title: virtualAccounts.providus_bank,
          name: bankSettings?.providus_bank_charges,
        });
      }

      // Check and add 9 Payment Bank
      if (bankSettings?.nine_payment_bank_status?.toLowerCase() === 'On') {
        banks.push({
          id: banks.length + 1,
          header: '9 Payment Bank',
          title: user?.nine_payment_bank,
          name: bankSettings?.nine_payment_bank_charges,
          type: bankSettings?.nine_payment_bank_charges_type,
        });
      }
    }

    // Add Kuda Bank if it exists
    setLoading(true);
    const kudaBankResponse = await GenerateKudaVirtualAccount({ token });
    setLoading(false);

    if (kudaBankResponse?.status === 'success') {
      const kudaVirtualAccount = kudaBankResponse?.response?.kuda_bank;

      // Check and add Kuda Bank

      if (
        kudaVirtualAccount &&
        bankSettings?.kuda_bank_status?.toLowerCase() === 'On'
      ) {
        banks.push({
          id: banks.length + 1,
          header: 'Kuda Bank',
          title: kudaVirtualAccount,
          name: bankSettings?.kuda_bank_charges,
          type: bankSettings?.kuda_bank_charges_type,
        });
      }
    }

    setBankDetails(banks);
  };

  useEffect(() => {
    getBankList();
  }, []);

  return (
    <View style={styles.container}>
      <SecondaryHeader text="Bank Transfer" />
      <View>
        {loading ? (
          <View style={styles.loader}>
            <Loader />
          </View>
        ) : (
          <FlatList
            data={bankDetails}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => (
              <Title
                text="No Bank Available At The Moment"
                header
                style={{ marginTop: 20 }}
              />
            )}
            ListHeaderComponent={() => (
              <MyCard>
                <Title
                  text="Note! Transfer to any of the following bank account to automatically fund your wallet"
                  position="left"
                  bold
                  small
                  color={theme.palette.red}
                />
              </MyCard>
            )}
            ListHeaderComponentStyle={styles.listHeader}
            renderItem={({ item }) => (
              <BankTransferItem
                header={item.header}
                title={item.title}
                name={item.name}
                key={item.id}
                type={item?.type}
                onclick={() =>
                  handleCopyClick({
                    header: item.header,
                    title: item.title,
                    name: item.name,
                  })
                }
              />
            )}
          />
        )}
      </View>
      <SnackBar
        visible={isCopied}
        textMessage="Account Number copied to clipboard"
        backgroundColor={theme.palette.black}
        messageColor={theme.palette.white}
        bottom={10}
        left={10}
        right={10}
        actionHandler={() => {
          setIsCopied(false);
        }}
        actionText="Ok"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  innerContainer: {},
  row: {
    alignItems: 'flex-start',
  },
  listHeader: {
    marginBottom: 10,
  },
  loader: {
    height: theme.window.windowHeight / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
