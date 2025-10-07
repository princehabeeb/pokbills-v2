import {
  BackHandler,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import SecondaryHeader from '../../components/global/SecondaryHeader';
import Row from '../../components/global/Row';
import MyInput from '../../components/global/MyInput';
import MyIcon from '../../components/global/MyIcon';
import Title from '../../components/global/Title';
import { Theme } from '../../constants/Theme';
import Divider from '../../components/global/Divider';
import ContactItem from '../../components/contact/ContactItem';
import ContactsModel from '../../components/contact/contactModel';
import { useDispatch, useSelector } from 'react-redux';
import { setContactNumber, toggleModal } from '../../store/globalState';
import { DeleteContactList, GetContactList } from '../../store/apis/contact';
import Loader from '../../components/loading/Loading';

const theme = Theme();
export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const { isModalVisible, token, contact } = useSelector(
    (state) => state.globalState
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const routes = useRoute();
  const { p, n = n ? n : '' } = routes.params;
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState({ phone: '', name: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const getContacts = async () => {
    setLoading(true);
    const response = await GetContactList({ token });
    if (response.status === 'success') {
      setContacts(response?.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.replace(p, {
        phone: '',
      });

      return;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    getContacts();
  }, [isModalVisible]);

  const handleToggleModal = () => {
    setEdit({
      name: '',
      phone: '',
      id: '',
    });
    dispatch(toggleModal());
  };

  const handleContactPress = (item) => {
    console.log(item);
    dispatch(setContactNumber({ ...contact, number: item.phone }));
    navigation.replace(p, {
      phone: item.phone,
      n,
    });
  };

  const handleDeletePress = useCallback(async (item) => {
    setLoading(true);
    await DeleteContactList({ id: item.id, token });
    getContacts();
  }, []);

  const handleEdit = useCallback(
    (item) => {
      setEdit({
        name: item.name,
        phone: item.contact,
        id: item.contactId,
      });
      dispatch(toggleModal());
    },
    [setEdit, handleToggleModal, edit]
  );

  // Filter contacts based on the search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SecondaryHeader text={'Number List'} />

      <Row style={styles.inputContainer}>
        <MyInput
          icon="search"
          style={styles.input}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleToggleModal}>
          <Row style={styles.buttonRow}>
            <MyIcon name="add" color={theme.palette.white} />
            <Title text="Add" color={theme.palette.white} />
          </Row>
        </TouchableOpacity>
      </Row>

      <Divider />

      {loading ? (
        <View style={styles.loading}>
          <Loader />
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactItem
              key={item.id}
              item={item}
              onPress={() => handleContactPress(item)}
              onEditPress={() => handleEdit(item)}
              onDeletePress={() => handleDeletePress(item)}
            />
          )}
          ListEmptyComponent={() => <Title text="No Contacts" header />}
        />
      )}
      <ContactsModel showModel={isModalVisible} edit={edit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
  },
  button: {
    backgroundColor: theme.palette.primary,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    ...theme.shadow,
  },
  buttonRow: {
    alignItems: 'center',
  },
  loading: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.window.windowHeight / 2,
  },
});
