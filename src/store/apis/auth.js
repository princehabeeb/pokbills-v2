import { BaseUrl, sendRequest } from './api';

//auth
export const LoginUser = async ({ phone, password, devicetoken }) => {
  const FormData = require('form-data');
  let data = new FormData();
  data.append('phone', phone);
  data.append('password', password);
  data.append('device', devicetoken);

  const res = await fetch(`${BaseUrl}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  });
  const response = await res.json();

  return response.response;
};

export const SignUpUser = async ({
  firstname,
  lastname,
  email,
  phone,
  state,
  password,
  pin,
  referral,
}) => {
  const FormData = require('form-data');
  let data = new FormData();
  data.append('fname', firstname);
  data.append('lname', lastname);
  data.append('email', email);
  data.append('phone', phone);
  data.append('state', state);
  data.append('account', '1');
  data.append('referal', referral);
  data.append('password', password);
  data.append('transpin', pin);
  try {
    const res = await fetch(`${BaseUrl}register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
    const response = await res.json();
    return response;
  } catch (error) {
    return error;
  }
};

export const LoginWithPin = async ({ phone, password, pin, devicetoken }) => {
  const response = await sendRequest({
    method: 'POST',
    url: 'account/loginpin',
    data: {
      phone,
      password,
      pin,
      devicetoken,
    },
  });

  return response;
};

export const SendSmsOtp = async ({ phone }) => {
  const response = await sendRequest({
    method: 'POST',
    url: 'account/phone/otp/send',
    data: {
      phone,
    },
  });

  return response;
};

export const SendEmailOtp = async ({ email }) => {
  const FormData = require('form-data');
  let data = new FormData();
  data.append('email', email);
  console.log(data);

  try {
    const res = await fetch(`${BaseUrl}forget-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const ConfirmSmsOtp = async ({ phone, otp, ref }) => {
  const FormData = require('form-data');
  let data = new FormData();
  data.append('phone', phone);
  data.append('code', otp);
  data.append('ref', ref);

  console.log(data);
  try {
    const res = await fetch(`${BaseUrl}verify-smsotp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const ConfirmEmailOtp = async ({ email, otp }) => {
  const FormData = require('form-data');
  let data = new FormData();
  data.append('email', email);
  data.append('code', otp);
  try {
    const res = await fetch(`${BaseUrl}verify-emailotp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });

    const response = await res.json();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const ResetPassword = async ({ email, otp, password }) => {
  const FormData = require('form-data');
  let data = new FormData();
  data.append('email', email);
  data.append('code', otp);
  data.append('password', password);
  try {
    const res = await fetch(`${BaseUrl}set-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });

    const response = await res.json();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const VerifyTransactionPin = async ({ token, pin }) => {
  return await sendRequest({
    method: 'POST',
    url: 'user/vpin',
    token,
    data: {
      pin,
    },
  });
};
