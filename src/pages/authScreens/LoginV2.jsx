import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Theme } from '../../constants/Theme';
import { LoginUser } from '../../store/apis/auth';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { StackActions } from '@react-navigation/native';
import { GetData, StoreData } from '../../constants/storage';
import { performSuccessfulLogin } from '../../components/auth/useSuccessufulLogin';
import { loginUser } from '../../store/globalState';
import { useDispatch } from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication';
import MyIcon from '../../components/global/MyIcon';
import Row from '../../components/global/Row';
import useGetAvatar from '../../hooks/useGetAvater';

const theme = Theme();

// Constants
const PHONE_REGEX = /^[0-9]{11}$/;
const MIN_PASSWORD_LENGTH = 4;
const INITIAL_FORM_DATA = {
  phoneNumber: '',
  password: '',
};

const INITIAL_ERRORS = {};

const LoginV2 = ({ navigation }) => {
  const dispatch = useDispatch();
  const avatar = useGetAvatar();

  // State management
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasLoginBefore, setHasLoginBefore] = useState(false);
  const [savedUser, setSavedUser] = useState(null);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Memoized values
  const canUseBiometric = useMemo(
    () => isBiometricSupported && isBiometricEnabled && !loading,
    [isBiometricSupported, isBiometricEnabled, loading]
  );

  const isFormValid = useMemo(() => {
    const hasPhoneNumber =
      formData.phoneNumber && PHONE_REGEX.test(formData.phoneNumber);
    const hasPassword =
      formData.password && formData.password.length >= MIN_PASSWORD_LENGTH;
    return hasPhoneNumber && hasPassword;
  }, [formData.phoneNumber, formData.password]);

  // Initialize component
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        const [user, password, biometricEnabled] = await Promise.all([
          GetData('user'),
          GetData('pas'),
          GetData('use_biometric'),
        ]);

        const [hasHardware, isEnrolled] = await Promise.all([
          LocalAuthentication.hasHardwareAsync(),
          LocalAuthentication.isEnrolledAsync(),
        ]);

        setSavedUser(user?.data);
        setFormData((prev) => ({
          ...prev,
          phoneNumber: user?.data?.phone || '',
        }));
        setHasLoginBefore(!!user && !!password);
        setIsBiometricEnabled(!!biometricEnabled);
        setIsBiometricSupported(hasHardware && isEnrolled);
      } catch (error) {
        console.error('Initialization error:', error);
        // Continue with default values
      } finally {
        setIsInitializing(false);
      }
    };

    initializeComponent();
  }, []);

  // Validation functions
  const validateField = useCallback((field, value) => {
    switch (field) {
      case 'phoneNumber':
        if (!value) return 'Phone number is required';
        if (!PHONE_REGEX.test(value))
          return 'Please enter a valid 11-digit phone number';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < MIN_PASSWORD_LENGTH)
          return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
        return '';
      default:
        return '';
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  // Event handlers
  const handleInputChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: '',
        }));
      }
    },
    [errors]
  );

  const clearForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors(INITIAL_ERRORS);
    setSavedUser(null);
    setHasLoginBefore(false);
  }, []);

  const handleChangeAccount = useCallback(() => {
    clearForm();
  }, [clearForm]);

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Login logic
  const performLogin = useCallback(async (credentials) => {
    try {
      const deviceToken = await GetData('deviceToken');

      const response = await LoginUser({
        phone: credentials.phone,
        password: credentials.password,
        devicetoken: deviceToken,
      });

      return response;
    } catch (error) {
      console.error('Login API error:', error);
      throw new Error(
        'Network error. Please check your connection and try again.'
      );
    }
  }, []);

  const handleLoginSuccess = useCallback(
    async (response, isBiometric = false) => {
      try {
        const user = await GetData('user');
        const newUser = await performSuccessfulLogin({ response });

        dispatch(loginUser(newUser));

        // Save password only for non-biometric login
        if (!isBiometric) {
          await StoreData('pas', formData.password);
        }

        // Navigate based on user state
        const targetScreen = user ? 'bottomTabs' : 'enable biometric';
        navigation.replace(targetScreen);
      } catch (error) {
        console.error('Login success handling error:', error);
        throw new Error('Failed to complete login process');
      }
    },
    [dispatch, formData.password, navigation]
  );

  const handleOtpRequired = useCallback(
    (response) => {
      Alert.alert(response?.msg || 'OTP required');
      navigation.dispatch(StackActions.popToTop());
      navigation.replace('smsOtpVerifyPage', {
        number: formData.phoneNumber,
        type: 'login',
        password: formData.password,
        ref: response?.reference,
      });
    },
    [formData.phoneNumber, formData.password, navigation]
  );

  const loginFunction = useCallback(
    async (isBiometric = false) => {
      if (loading) return;

      setLoading(true);
      try {
        let credentials = {
          phone: formData.phoneNumber,
          password: formData.password,
        };

        if (isBiometric) {
          const savedPassword = await GetData('pas');
          if (!savedPassword) {
            throw new Error(
              'No saved credentials found. Please login with password.'
            );
          }
          credentials.password = savedPassword;
        }

        const response = await performLogin(credentials);

        // Handle OTP requirement
        if (response?.requestotp === 'yes' && response?.status !== 'success') {
          handleOtpRequired(response);
          return;
        }

        // Handle login failure
        if (response?.status !== 'success') {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Login Failed',
            textBody: response?.msg || 'Login failed. Please try again.',
            button: 'close',
          });
          return;
        }

        // Handle successful login
        await handleLoginSuccess(response, isBiometric);
      } catch (error) {
        console.error('Login error:', error);
        Alert.alert(
          'Error',
          error.message || 'Login failed. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    },
    [
      loading,
      formData.phoneNumber,
      formData.password,
      performLogin,
      handleOtpRequired,
      handleLoginSuccess,
    ]
  );

  const handleBiometricLogin = useCallback(async () => {
    if (!canUseBiometric) return;

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Please authenticate to login',
        fallbackLabel: 'Use passcode',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      if (result.success) {
        await loginFunction(true);
      } else {
        Alert.alert(
          'Authentication Failed',
          'Please try again or use password login.'
        );
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      Alert.alert(
        'Error',
        'Biometric authentication failed. Please use password login.'
      );
    }
  }, [canUseBiometric, loginFunction]);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) return;
    await loginFunction(false);
  }, [validateForm, loginFunction]);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate('resetPassword');
  }, [navigation]);

  const handleSignUp = useCallback(() => {
    navigation.navigate('loginPage', { islogin: false });
  }, [navigation]);

  // Render loading state
  if (isInitializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.palette.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Render password-only screen for returning users
  if (hasLoginBefore && savedUser) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image source={avatar} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>
              Welcome Back, {savedUser?.firstname || 'User'}
            </Text>
            <Text style={styles.subtitle}>Enter your password to continue</Text>

            <View style={styles.changeAccountContainer}>
              <TouchableOpacity
                style={styles.changeAccountButton}
                onPress={handleChangeAccount}
              >
                <Text style={styles.changeAccountText}>Change Account?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.inputWrapper,
                  errors.password && styles.inputError,
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={handleTogglePasswordVisibility}
                  disabled={loading}
                >
                  <Text style={styles.eyeIconText}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={handleForgotPassword}
              disabled={loading}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Row>
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  (!isFormValid || loading) && styles.loginButtonDisabled,
                  { flex: 1 },
                ]}
                onPress={handleLogin}
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.loginButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              {canUseBiometric && (
                <TouchableOpacity
                  style={styles.fingerPrintButton}
                  onPress={handleBiometricLogin}
                  disabled={loading}
                >
                  <MyIcon
                    name="finger-print-outline"
                    size={20}
                    color={theme.palette.white}
                  />
                </TouchableOpacity>
              )}
            </Row>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp} disabled={loading}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  // Render full login screen for new users
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <View
              style={[
                styles.inputWrapper,
                errors.phoneNumber && styles.inputError,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChangeText={(value) =>
                  handleInputChange('phoneNumber', value)
                }
                keyboardType="phone-pad"
                maxLength={11}
                autoCapitalize="none"
                editable={!loading}
              />
            </View>
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.inputWrapper,
                errors.password && styles.inputError,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={handleTogglePasswordVisibility}
                disabled={loading}
              >
                <Text style={styles.eyeIconText}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPassword}
            disabled={loading}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.loginButton,
              (!isFormValid || loading) && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={!isFormValid || loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp} disabled={loading}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333333',
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
  eyeIconText: {
    fontSize: 20,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: theme.palette.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: theme.palette.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    height: 55,
  },
  fingerPrintButton: {
    height: 55,
    width: 55,
    alignSelf: 'stretch',
    borderRadius: 8,
    marginLeft: 10,
    backgroundColor: theme.palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  loginButtonText: {
    color: theme.palette.white,
    fontSize: 18,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#666666',
  },
  signUpLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  changeAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  changeAccountButton: {
    padding: 8,
  },
  changeAccountText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '600',
  },
});

export default LoginV2;
