import { useDispatch } from 'react-redux';
import { LoginUser, SendSmsOtp } from '../../store/apis/auth';
import { loginUser } from '../../store/globalState';
import { GetData, StoreData } from '../../constants/storage';
import { performSuccessfulLogin } from './useSuccessufulLogin';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { StackActions } from '@react-navigation/native';

const useHandleLogin = ({
  phoneNumber,
  password,
  devicetoken,
  navigation,
  setLoading,
  setLoginError,
  authenticateLoginInputs,
}) => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const hasauthlogin = authenticateLoginInputs({ phoneNumber, password });

    if (!hasauthlogin) {
      return;
    }

    setLoading(true);

    const response = await LoginUser({
      phone: phoneNumber,
      password: password,
      devicetoken,
    });
    console.log(response);

    if (response?.requestotp === 'yes' && response?.status !== 'success') {
      setLoginError(response?.msg);
      navigation.dispatch(StackActions.popToTop());
      navigation.replace('smsOtpVerifyPage', {
        number: phoneNumber,
        type: 'login',
        password,
        ref: response?.reference,
      });
      setLoading(false);
    }

    if (response?.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Login Failed',
        textBody: response?.msg,
        button: 'close',
      });
      setLoading(false);
      return;
    }

    if (response?.requestotp === 'no') {
      const newUser = await performSuccessfulLogin({ response });

      dispatch(loginUser(newUser));
      await StoreData('pas', password);
      setLoading(false);

      navigation.dispatch(StackActions.popToTop());

      const pin = await GetData('pin');

      if (!pin) {
        navigation.replace('enable biometric');
      } else navigation.replace('bottomTabs', { page: 'homePage' });
      return;
    }

    const newUser = await performSuccessfulLogin({ response });
    dispatch(loginUser(newUser));
    await StoreData('pas', password);
    setLoading(false);

    navigation.replace('bottomTabs', { page: 'homePage' });
  };

  return handleLogin;
};

export default useHandleLogin;
