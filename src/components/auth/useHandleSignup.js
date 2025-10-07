import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { LoginUser, SignUpUser } from '../../store/apis/auth';
import { StackActions } from '@react-navigation/native';
import { performSuccessfulLogin } from './useSuccessufulLogin';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/globalState';
import { StoreData } from '../../constants/storage';

const useHandleSignup = ({
  signUpData,
  selectedState,
  setLoading,
  setLoginError,
  navigation,
  toggleLogin,
  authenticateSignup,
}) => {
  const dispatch = useDispatch();
  const handleSignup = async () => {
    authenticateSignup();

    if (selectedState === null) {
      setLoginError('Please select state');
      return;
    }

    if (signUpData.pin.length !== 5) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Pin Error',
        textBody: 'Pin must be 5 digits',
        button: 'close',
      });
      return;
    }
    if (signUpData.name.split(' ')[1] === undefined) {
      setLoginError('Please enter your last name');
      return;
    }

    setLoading(true);
    const response = await SignUpUser({
      firstname: signUpData.name.split(' ')[0],
      lastname: signUpData.name.split(' ')[1],
      email: signUpData.email,
      phone: signUpData.phone,
      password: signUpData.password,
      pin: signUpData.pin,
      state: selectedState,
      referral: signUpData.referral,
    });

    if (response?.status !== 'success') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Account Creation Failed',
        textBody: response?.response?.msg,
        button: 'close',
      });
      setLoading(false);
      return;
    }

    navigation.dispatch(StackActions.popToTop());
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Account Created',
      textBody: 'Account created successfully',
      button: 'close',
    });

    if (response?.requestotp === 'yes' && response?.status !== 'success') {
      navigation.replace('smsOtpVerifyPage', {
        number: signUpData.phone,
        type: 'login',
        password,
        ref: response?.reference,
      });
      setLoading(false);
    } else if (response?.status === 'success') {
      const user = await LoginUser({
        phone: signUpData.phone,
        password: signUpData.password,
        devicetoken: '',
      });
      const newUser = await performSuccessfulLogin({ response: user });
      dispatch(loginUser(newUser));
      await StoreData('pas', signUpData.password);
      navigation.replace('enable biometric');
      setLoading(false);
    }

    toggleLogin();
  };

  return handleSignup;
};

export default useHandleSignup;
