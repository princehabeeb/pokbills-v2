import { BaseUrl, sendRequest } from './api';

export const GetUserDetails = async ({ token }) => {
  const response = await sendRequest({
    method: 'GET',
    url: 'profile',
    token,
  });

  return response;
};

export const UpdatePassword = async ({ token, oldpassword, newpassword }) => {
  const formdata = new FormData();
  formdata.append('oldpass', oldpassword);
  formdata.append('newpass', newpassword);

  try {
    const response = await fetch(`${BaseUrl}update-password`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const UpdateTransactionPin = async ({ token, oldpin, newpin }) => {
  const formdata = new FormData();
  console.log(oldpin);
  formdata.append('vcode', oldpin);
  formdata.append('newpin', newpin);

  try {
    const response = await fetch(`${BaseUrl}update-pin`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const UpdateLoginPin = async ({ token, oldpin, newpin, confirmpin }) => {
  try {
    const response = await sendRequest({
      method: 'POST',
      url: 'user/loginpin',
      token,
      data: {
        oldpin,
        newpin,
        confirmpin,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const UpdateAccountSettings = async ({
  token,
  notification,
  loginpin,
  biometric,
  transactionpin,
}) => {
  try {
    const response = await sendRequest({
      method: 'POST',
      url: 'user/account-setting',
      token,
      data: {
        notification,
        loginpin,
        biometric,
        transactionpin,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
