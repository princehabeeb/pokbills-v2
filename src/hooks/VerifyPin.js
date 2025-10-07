import { Dialog } from 'react-native-alert-notification';
import { useSelector } from 'react-redux';

import { VerifyTransactionPin } from '../store/apis/auth';

export const useVerifyPin = ({ pin }) => {
  const { token } = useSelector((state) => state.globalState);
  async function verify() {
    const pinResponse = await VerifyTransactionPin({ pin, token });
    if (pinResponse.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Payment Fail',
        textBody: pinResponse.message,
        button: 'close',
      });
      return true;
    }
    return false;
  }
  return verify;
};
