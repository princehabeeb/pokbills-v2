import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

import * as RootNavigation from './../../utilities/RootNavigation';

export const BaseUrl = 'https://alfadatasub.com.ng/apiserver/';
// export const BaseUrl = 'https://sample.topupmate.com/apiserver/';

export const sendRequest = async ({
  url,
  data,
  method,
  token,
  removeTokenValidation,
  formData,
}) => {
  try {
    const response = await fetch(`${BaseUrl}${url}`, {
      method: method ? method : 'get',
      headers: {
        'Content-Type': formData ? 'multipart/form-data' : 'application/json',
        [token && 'Authorization']: token && `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response) {
      const newData = await response.json();
      if (newData?.code === '401' && !removeTokenValidation) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'please login again',
          textBody: 'session expired, please login again',
          button: 'close',
        });

        RootNavigation.navigate('welcomePage');

        return;
      }
      return newData;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendOtpFunction = async ({ email }) => {
  try {
    const response = await sendRequest({
      method: 'POST',
      url: '/',
      data: {
        service: 'forgetpassword',
        email,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await sendRequest({
      method: 'POST',
      url: '/',
      data: {
        service: 'confirmemailotp',
        email,
        otp,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changePassword = async ({ email, otp, password }) => {
  try {
    const response = await sendRequest({
      method: 'POST',
      url: '/',
      data: {
        service: 'resetpassword',
        email,
        otp,
        password,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
