import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

const useCheckFingerPrint = () => {
  const [useFinger, setFinger] = useState(false);

  const checkBio = async () => {
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

    setFinger(true);
  };

  useEffect(() => {
    checkBio();
  }, []);

  return {
    useFinger,
  };
};

export default useCheckFingerPrint;
