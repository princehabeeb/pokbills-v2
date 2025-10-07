import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Edit, Trash2 } from 'react-native-feather';

import Row from '../global/Row';
import MyIcon from '../global/MyIcon';
import Title from '../global/Title';
import Divider from '../global/Divider';
import { Theme } from '../../constants/Theme';

const theme = Theme();
export default ContactItem = ({
  item,
  onEditPress,
  onDeletePress,
  onPress,
}) => {
  return (
    <View>
      <Row style={styles.contactRow}>
        <TouchableOpacity onPress={onPress}>
          <Row>
            <MyIcon name="person" />
            <View style={{ alignItems: 'flex-start', marginLeft: 5 }}>
              <Title
                text={item.name}
                style={styles.username}
                color={theme.palette.primary}
                bold
              />
              <Title small text={item.phone} />
            </View>
          </Row>
        </TouchableOpacity>
        <Row>
          {/* <TouchableOpacity onPress={onEditPress}>
            <Edit color={theme.palette.link} />
          </TouchableOpacity> */}
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={onDeletePress}>
            <Trash2 color={theme.palette.red} />
          </TouchableOpacity>
        </Row>
      </Row>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  contactRow: {
    justifyContent: 'space-between',
  },
  username: {
    textTransform: 'capitalize',
  },
});
