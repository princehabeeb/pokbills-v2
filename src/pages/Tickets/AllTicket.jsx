import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useRef, useState } from 'react';

import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import TicketItem from '../../components/tickets/TicketItem';
import Title from '../../components/global/Title';
import DraggableModel from '../../components/global/DraggableModel';
import Dropdown from '../../components/global/Dropdown';
import TextArea from '../../components/global/TextArea';
import MyButton from '../../components/global/Mybutton';
import {
  CreateSupportTicket,
  GetSupportTickets,
} from '../../store/apis/Tickets';
import Loader from '../../components/loading/Loading';
import { RefreshControl } from 'react-native';
import { GenerateRandomNumber } from '../../constants/GenerateRandomNumber';

const theme = Theme();
const data = [
  'Airtime & Data',
  'Bill Payment',
  'Feedback and Suggestions',
  'Other',
  'Questions',
  'Wallet Funding',
];
const AllTicket = () => {
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.globalState);
  const draggableModelRef = useRef();
  const [tickets, setTickets] = useState([]);
  const [itemLoading, setItemLoading] = useState(false);
  const handleCreateTicket = async () => {
    if (!category || !question) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Submit Error',
        textBody: 'Please fill in all fields',
        button: 'close',
      });
      return;
    }

    setLoading(true);
    const response = await CreateSupportTicket({
      token,
      message: question,
      subject: `${category} - ${GenerateRandomNumber()}${Date.now()}`,
    });
    setLoading(false);

    if (response.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Submit Error',
        textBody: response.message,
        button: 'close',
      });
      return;
    } else {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Submit Success',
        textBody: response.message,
        button: 'close',
      });
      draggableModelRef.current.closeModel();
      setQuestion('');
      getTickets();
    }
  };

  const getTickets = async () => {
    setItemLoading(true);
    const response = await GetSupportTickets({ token });

    if (response?.status === 'success') {
      setTickets(response?.response);
    }
    setItemLoading(false);
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <SecondaryHeader text="All Tickets" />

        <DraggableModel buttonText="Create A Ticket" ref={draggableModelRef}>
          <Title text="Create A New Ticket" header />
          <Dropdown
            data={data}
            text="Category"
            iconName="filter"
            onSelectItem={setCategory}
          />
          <TextArea
            value={question}
            onChangeText={(t) => setQuestion(t)}
            text="Question"
          />
          <MyButton
            text="Submit"
            onPress={handleCreateTicket}
            isLoading={loading}
          />
        </DraggableModel>

        <View style={styles.ticketsContainer}>
          {itemLoading ? (
            <View style={styles.loadingContainer}>
              <Loader />
            </View>
          ) : (
            <FlashList
              data={tickets}
              estimatedItemSize={100}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <TicketItem item={item} />}
              ListEmptyComponent={() => <Title text="No Tickets" header />}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 200 }}
              refreshControl={
                <RefreshControl
                  refreshing={itemLoading}
                  onRefresh={getTickets}
                />
              }
            />
          )}
        </View>
      </View>
    </>
  );
};

export default AllTicket;

const styles = StyleSheet.create({
  container: {
    padding: theme.window.windowWidth * 0.05,
    minHeight: theme.window.windowHeight,
  },
  ticketsContainer: {
    zIndex: -10,
    minHeight: theme.window.windowHeight,
  },

  loadingContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
