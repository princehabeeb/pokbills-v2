import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../store/globalState';
import { performSuccessfulLogin } from './useSuccessufulLogin';
import { LoginUser } from '../../store/apis/auth';
import { StackActions } from '@react-navigation/native';

const useBiometricAuth = ({
  setLoading,
  devicetoken,
  pas,
  navigation,
  setSupport,
}) => {
  const { user } = useSelector((state) => state.globalState);
  const dispatch = useDispatch();

  const handleBiometricAuth = async () => {
    try {
      // Authenticate the user using the fingerprint sensor
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Fingerprint',
        disableDeviceFallback: true,
        cancelLabel: 'Cancel',
      });

      if (biometricAuth.success) {
        setLoading(true);

        const response = await LoginUser({
          phone: user?.phone,
          password: pas,
          devicetoken,
        });

        if (response.status === 'success') {
          const newUser = await performSuccessfulLogin({ response });
          dispatch(loginUser(newUser));
          navigation.dispatch(StackActions.popToTop());
          navigation.replace('bottomTabs', { page: 'homePage' });
          setLoading(false);
        } else {
          setLoading(false);
          setSupport(false);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      setLoading(false);
    }
  };

  return handleBiometricAuth;
};

export default useBiometricAuth;
