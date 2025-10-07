import { useEffect } from 'react';
import { GetData } from '../../constants/storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const useCheckBiometricSupport = ({
  setHasLoginBefore,
  setDeviceToken,
  setIsBiometricSupported,
  setFingerprint,
  setSupport,
  hasLoggedInBefore,
  isBiometricSupported,
  fingerprint,
  setShowLAP,
  setPhoneNumber,
  setPas,
}) => {
  const { user, token } = useSelector((state) => state.globalState);

  useEffect(() => {
    const checkBiometricSupport = async () => {
      // Check if the user has logged in before
      setHasLoginBefore(!!token);

      // Get data from storage
      const deviceToken = await GetData('deviceToken');
      const useBio = await GetData('use_biometric');

      const pass = await GetData('pas');
      if (pass) {
        setPas(pass);
      }

      if (deviceToken) {
        setDeviceToken(deviceToken);
      }

      // Check if the device has fingerprint sensors
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);

      // Check if there is any fingerprint saved on the device
      const enroll = await LocalAuthentication.isEnrolledAsync();
      setFingerprint(enroll);

      // Set support and show LAP if conditions are met
      if (hasLoggedInBefore && isBiometricSupported && fingerprint && useBio) {
        setSupport(true);
        setShowLAP(true);
        setPhoneNumber(user?.phone);
      }
    };

    checkBiometricSupport();
  }, [token, hasLoggedInBefore, isBiometricSupported, fingerprint, user]);

  return null; // You don't need to return anything from this hook
};

export default useCheckBiometricSupport;
