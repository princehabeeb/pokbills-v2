import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

import { GetData } from '../constants/storage';

const useCheckBiometric = () => {
  const [usePin, setUsePin] = useState(false);
  const [pin, setPin] = useState('');

  const checkBio = async () => {
    // check if value pin is enable
    const pin_is_enable = await GetData('use_transaction_pin');
    if (!pin_is_enable) {
      return;
    }

    // check if device has fingerprint
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      return;
    }

    // check if there is any fingerprint saved
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      return;
    }

    setUsePin(true);

    // get pin from storage if there is any pin
    const pass = await GetData('transaction_pin');
    if (pass) {
      setPin(pass);
    }
  };

  useEffect(() => {
    checkBio();
  }, []);

  return {
    usePin,
    pin,
  };
};

export default useCheckBiometric;
