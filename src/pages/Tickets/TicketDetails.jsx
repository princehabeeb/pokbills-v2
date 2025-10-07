import { StyleSheet, View } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { Avatar, GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';

import { Theme } from '../../constants/Theme';
import SecondaryHeader from '../../components/global/SecondaryHeader';
import { GetTicketMessages, SendTicketMessage } from '../../store/apis/Tickets';
import Title from '../../components/global/Title';

const theme = Theme();
const TicketDetails = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { id } = route.params;
  const { token } = useSelector((state) => state.globalState);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const getMessages = async () => {
    setLoading(true);
    const response = await GetTicketMessages({ token, ticketid: id });
    if (response.status !== 'success') {
      setLoading(false);
      return;
    }

    const ticket = response?.response[0];
    if (!ticket) {
      setLoading(false);
      return;
    }

    setTitle(ticket.query);

    // Format initial query message
    const queryMessage = {
      _id: ticket.id,
      text: ticket.query,
      createdAt: new Date(ticket.add_date),
      user: {
        _id: 1,
        name: 'User',
        avatar: require('../../assets/avaters/1.png'),
      },
    };

    // Format reply messages
    const replyMessages = ticket.replies.map((reply) => ({
      _id: reply.id,
      text: reply.reply,
      createdAt: new Date(reply.reply_date),
      user: {
        _id: reply.replyby.toLowerCase() === 'user' ? 1 : 2,
        name: reply.replyby,
        avatar: reply.replyby.toLowerCase() === 'user' 
          ? require('../../assets/avaters/1.png')
          : require('../../assets/avaters/2.png'),
      },
    }));

    // Combine and sort messages by date
    const allMessages = [...replyMessages, queryMessage].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    setMessages(allMessages);
    setLoading(false);
  };

  useEffect(() => {
    getMessages();
  }, []);

  const sendMessage = async ({ message }) => {
    const response = await SendTicketMessage({ message, ticketid: id, token });
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => {
      sendMessage({ message: messages[0].text });
      return GiftedChat.append(previousMessages, messages);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <SecondaryHeader text="" />
        <View style={styles.textContainer}>
          <Title text="Loading messages..." header />
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <SecondaryHeader text="" />
        <Title text={title} header />
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        showUserAvatar
        renderChatEmpty={() => (
          <View style={styles.textContainer}>
            <Title text="No messages yet" header style={styles.text} />
          </View>
        )}
        renderAvatar={(props) => renderAvatar(props)}
        onLongPress={() => {}}
        user={{
          _id: 1,
          avatar: require('../../assets/avaters/1.png'),
        }}
      />
    </>
  );
};

export default TicketDetails;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    transform: [
      {
        rotateX: '180deg',
      },
    ],
  },
});

const renderAvatar = (props) => {
  return <Avatar {...props} />;
};
