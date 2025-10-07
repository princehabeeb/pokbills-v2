import { BaseUrl, sendRequest } from './api';

export const GetKYCDetails = async ({ token }) => {
  const response = await sendRequest({
    url: 'user/kycdetails',
    token,
  });

  return response;
};

export const UploadKYCLevelTwo = async ({ token, number, dob, type }) => {
  const formData = new FormData();
  formData.append('setkycoption', type);
  formData.append('dob', dob);
  formData.append('vernumber', number);

  try {
    const response = await fetch(`${BaseUrl}buy-data`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const UploadKYCLevelThree = async ({ token, formdata }) => {
  const response = await sensdRequest({
    method: 'POST',
    url: 'user/kyclevelthree',
    token,
    data: formdata,
  });

  return response;
};

export const UploadKYCLevelFour = async ({ token, formdata }) => {
  const response = await sendRequest({
    method: 'POST',
    url: 'user/kyclevelfour',
    token,
    data: formdata,
  });

  return response;
};

export const AgentUpgrade = async ({ token, pin }) => {
  const formdata = new FormData();
  formdata.append('kpin', pin);
  try {
    const response = await fetch(`${BaseUrl}agent-upgrade`, {
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

export const vendorUpgrade = async ({ token, pin }) => {
  const formdata = new FormData();
  formdata.append('kpin', pin);
  try {
    const response = await fetch(`${BaseUrl}/vendor-upgrade`, {
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
export const AggregatorUpgrade = async ({ token }) => {
  const response = await sendRequest({
    url: 'user/aggregatorupgrade',
    token,
  });

  return response;
};
