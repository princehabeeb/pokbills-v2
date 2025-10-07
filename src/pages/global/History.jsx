import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import ModalDropdown from 'react-native-modal-dropdown';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import Row from '../../components/global/Row';
import MyInput from '../../components/global/MyInput';
import MyIcon from '../../components/global/MyIcon';
import { Theme } from '../../constants/Theme';
import { GetTransactions } from '../../store/apis/services';
import Title from '../../components/global/Title';
import Loader from '../../components/loading/Loading';
import HistoryItem from '../../components/History/HistoryItem';
import DatePicker from 'react-native-date-picker';
import { ChevronDown } from 'react-native-feather';
import FormatDate from '../../constants/FormatDate';

const theme = Theme();
const options = [
  'All',
  'Airtime',
  'Data',
  'Electricity',
  'Exam Pin',
  'Airtime swap',
  'Data Pin',
  'Airtime Pin',
  'Smile',
  'Alpha Topup',
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const { token } = useSelector((state) => state.globalState);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);

    await getTransactions();
    setRefreshing(false);
  };

  const getTransactions = async () => {
    setLoading(true);
    try {
      const response = await GetTransactions({
        service: 'All',
        page,
        token,
      });

      if (response.status === 'success') {
        if (response.response.length === 0) {
          setLoading(false);
          return;
        }
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          ...response?.response,
        ]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleLoadMore = () => {
    if (!loading) {
      getTransactions();
    }
  };

  const handleFilteredTransactions = () => {
    let data = [];

    //filter transactions
    if (selectedService !== 'All') {
      const lowerCaseService = selectedService.toLowerCase();
      data = transactions.filter((tran) =>
        tran?.servicename.toLowerCase().includes(lowerCaseService)
      );
    } else {
      data = transactions;
    }

    //remove airtime swap and airtime pin from filtered transactions for airtime
    if (selectedService.toLowerCase() === 'airtime') {
      data = data.filter(
        (tran) =>
          tran?.servicename.toLowerCase() !== 'airtime swap' &&
          tran?.servicename.toLowerCase() !== 'airtime pin'
      );
    }

    //remove data pin from filtered transactions for data
    if (selectedService.toLowerCase() === 'data') {
      data = data.filter(
        (tran) => tran?.servicename.toLowerCase() !== 'data pin'
      );
    }

    // filter by date
    if (date) {
      data = data.filter((tran) =>
        FormatDate(tran?.date).includes(FormatDate(date))
      );
    }

    // filter by search
    const sterm = searchTerm.toLowerCase();
    const trans = data.filter(
      (tran) =>
        tran?.servicedesc.toLowerCase().includes(sterm) ||
        tran?.transref.toLowerCase().includes(sterm) ||
        tran?.amount.toLowerCase().includes(sterm) ||
        // tran?.status.toLowerCase().includes(sterm) ||
        tran?.servicename.toLowerCase().includes(sterm)
    );
    setFilteredTransactions(trans);
  };

  useEffect(() => {
    handleFilteredTransactions();
  }, [searchTerm, transactions, selectedService, date]);

  const handleOptionSelect = (index, value) => {
    setSelectedService(value);
    setShowFilter(false);
  };

  const handleDateSelect = (date) => {
    setOpen(false);
    setDate(date);
  };

  const handleClearFilter = () => {
    setSelectedService('');
    setShowFilter(false);
    setDate('');
  };
  return (
    <View style={styles.container}>
      <SecondaryHeader text="Transactions" />
      <Row>
        <Row style={styles.row}>
          <MyInput
            style={styles.input}
            icon="search"
            text="Search Transaction"
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowFilter((prev) => !prev)}
          >
            <MyIcon name="filter" color={theme.palette.white} />
          </TouchableOpacity>
        </Row>
      </Row>

      {showFilter && (
        <Row style={styles.filter}>
          <ModalDropdown
            options={options}
            defaultValue={options[0]}
            defaultIndex={0}
            style={styles.dropdown}
            onSelect={handleOptionSelect}
            dropdownStyle={styles.dropdownStyle}
            dropdownTextStyle={styles.dropdownText}
            animated
            dropdownTextHighlightStyle={styles.dropdownTextHighlight}
            showsVerticalScrollIndicator={false}
          >
            <Row>
              <Title text={selectedService ? selectedService : 'All'} small />
              <ChevronDown color={theme.palette.black} />
            </Row>
          </ModalDropdown>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Row>
              <Title text={date ? FormatDate(date) : 'Date'} small />
              <ChevronDown color={theme.palette.black} />
            </Row>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date ? date : new Date()}
            onConfirm={handleDateSelect}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearFilter}
          >
            <Title text="Clear Filter" small color={theme.palette.white} />
          </TouchableOpacity>
        </Row>
      )}

      <FlashList
        data={filteredTransactions}
        renderItem={({ item }) => <HistoryItem item={item} />}
        keyExtractor={(item) => item.transref}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        estimatedItemSize={200}
        ListFooterComponent={() =>
          loading ? (
            <View style={styles.loadingContainer}>
              <Loader />
            </View>
          ) : (
            <View>
              <Title
                text="No more transactions"
                style={{ marginVertical: 20 }}
              />
            </View>
          )
        }
        ListEmptyComponent={() =>
          !loading && (
            <Title text="No Transactions" style={{ marginTop: 20 }} header />
          )
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    backgroundColor: theme.palette.white,
  },
  row: {
    marginBottom: 10,
  },
  input: {
    flex: 1,
  },
  icon: {
    marginTop: 20,
    marginLeft: 15,
    backgroundColor: theme.palette.primary,
    padding: 8,
    borderRadius: 10,
    ...theme.shadow,
    paddingLeft: 11,
  },

  loadingContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter: {
    marginBottom: 10,
    height: 40,
    justifyContent: 'space-between',
  },
  dropdown: {
    width: 100,
    padding: 5,
    borderRadius: 5,
  },
  dropdownStyle: {
    width: 150,
    height: 200,
    marginTop: -25,
    elevation: 10,
  },
  dropdownText: {
    fontSize: 18,
  },

  dropdownTextHighlight: {
    backgroundColor: theme.palette.gray,
  },

  clearButton: {
    backgroundColor: theme.palette.primary,
    padding: 5,
    borderRadius: 5,
    ...theme.shadow,
  },
});
