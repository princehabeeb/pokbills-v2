import { StyleSheet, View } from 'react-native';

import MyCard from '../global/MyCard';
import Title from '../global/Title';
import { Theme } from '../../constants/Theme';

const theme = Theme();
const NoticeContainer = ({ text1, text2 }) => {
  return (
    <View style={styles.innerContainer}>
      <MyCard style={styles.card}>
        <Title
          text={text1}
          small
          bold
          position="left"
          style={styles.TopTitle}
        />
        <Title
          text={'Note! ' + text2}
          small
          bold
          position="left"
          color={theme.palette.red}
        />
      </MyCard>
    </View>
  );
};

const styles = StyleSheet.create({
  TopTitle: {
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    marginBottom: 5,
    paddingBottom: 5,
  },
  innerContainer: {
    marginTop: 15,
  },
});

export default NoticeContainer;
