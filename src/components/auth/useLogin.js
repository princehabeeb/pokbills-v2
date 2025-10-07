import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import useCheckBiometricSupport from './CheckFingerPrint';
import useBiometricAuth from './useBiometricAuth';
import useHandleLogin from './useHandleLogin';
import useHandleSignup from './useHandleSignup';

export default useLogin = ({ islogin, setLoading }) => {
  const route = useRoute();
  const { LoginInfoData } = route.params;

  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  const [loginError, setLoginError] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [login, setLogin] = useState(islogin);
  const [devicetoken, setDeviceToken] = useState('null');

  const [loginWithPin, setLoginWithPin] = useState(LoginInfoData?.usePin);
  const { user: currentUser } = useSelector((state) => state.globalState);
  const [hasLoggedInBefore, setHasLoginBefore] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);
  const [support, setSupport] = useState(false);
  const [showLAP, setShowLAP] = useState(false);
  const [pas, setPas] = useState('');

  const [error, setError] = useState({
    password: '',
    phone: '',
  });

  const [signUpData, setSignUpData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    state: '',
    pin: '',
    referral: '',
    confirmPassword: '',
  });

  const [signUpError, setSignUpError] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    state: '',
    pin: '',
    referral: '',
    confirmPassword: '',
  });

  useCheckBiometricSupport({
    setHasLoginBefore,
    setLoginWithPin,
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
  });

  function handlePasswordChange(text) {
    setLoginError('');
    setPassword(text);
    setError((prv) => ({
      ...prv,
      password: '',
    }));
  }

  function handlePhoneChange(text) {
    setLoginError('');
    setPhoneNumber(text);
    setError((prv) => ({
      ...prv,
      phone: '',
    }));
  }

  function toggleLogin() {
    setLoginError('');
    setLogin((prv) => !prv);
  }

  const handleSignUpChange = (fieldName) => (text) => {
    setLoginError('');
    setSignUpError((prev) => ({ ...prev, [fieldName]: '' }));
    setSignUpData((prev) => ({ ...prev, [fieldName]: text }));
  };

  function authenticateLoginInputs() {
    const errors = {};

    if (password.trim() === '') {
      errors.password = 'Password cannot be empty';
    }

    if (phoneNumber.trim() === '') {
      errors.phone = 'Phone number cannot be empty';
    }

    setError((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));

    return Object.keys(errors).length === 0;
  }

  function authenticateSignup() {
    const errors = {};

    // Define the fields you want to validate
    const fieldsToValidate = [
      'name',
      'phone',
      'email',
      'password',
      'pin',
      'confirmPassword',
    ];

    // Loop through the fields and check for empty values
    for (const field of fieldsToValidate) {
      if (signUpData[field].trim() === '') {
        errors[field] = `${field} cannot be empty`;
      }
    }

    if (signUpData.confirmPassword !== signUpData.password) {
      errors.confirmPassword = 'Password does not match';
    }

    // Set the errors in one batch
    setSignUpError((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));

    // Check if there are any errors
    if (Object.keys(errors).length === 0) {
      // No errors, continue with the signup process
      return true;
    }
  }

  const handleBiometricAuth = useBiometricAuth({
    setLoading,
    devicetoken,
    pas,
    navigation,
    setSupport,
  });

  const handleLogin = useHandleLogin({
    phoneNumber,
    password,
    devicetoken,
    navigation,
    setLoading,
    setLoginError,
    authenticateLoginInputs,
  });

  const handleSignup = useHandleSignup({
    signUpData,
    selectedState,
    setLoading,
    setLoginError,
    navigation,
    toggleLogin,
    authenticateSignup,
  });

  function handleForgetPassword() {
    navigation.navigate('resetPassword');
  }

  const handleSelectItem = (item) => {
    setSelectedState(item);
    setLoginError('');
  };

  const togglePhoneNumber = () => {
    if (loginWithPin) {
      setLoginWithPin(false);
    }
    setSupport((prev) => !prev);
    setShowLAP((prev) => !prev);
  };

  return {
    password,
    phoneNumber,
    error,
    signUpData,
    signUpError,
    loginError,
    login,
    showLAP,
    support,
    currentUser,
    loginWithPin,
    useBiometric: LoginInfoData?.useBio,
    togglePhoneNumber,
    handleBiometricAuth,
    toggleLogin,
    handleSelectItem,
    handleForgetPassword,
    handleSignUpChange,
    handleSignup,
    handleLogin,
    handlePasswordChange,
    handlePhoneChange,
  };
};
