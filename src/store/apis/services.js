import axios from 'axios';
import { BaseUrl, sendRequest } from './api';
export const GetAirtimeDiscounts = async ({ token }) => {
  return await sendRequest({
    method: 'POST',
    url: 'user/airtime-discounts',
    token,
  });
};

export const GetNetworkSettings = async ({ token }) => {
  return await sendRequest({
    url: 'networks',
    token,
  });
};

export const GetHomeNotification = async ({ token }) => {
  return await sendRequest({
    url: 'home-notification',
    token,
  });
};
export const GetAirtimeNetworkStatus = async ({ token }) => {
  return await sendRequest({
    url: 'airtime-status',
    token,
  });
};

export const GetDataNetworkStatus = async ({ token }) => {
  return await sendRequest({
    url: 'data-status',
    token,
  });
};
export const PurchaseAirtime = async ({
  token,
  network,
  phone,
  amount,
  ported_number,
  airtime_type,
  ref,
  pin,
}) => {
  const formData = new FormData();
  formData.append('network', network);
  formData.append('amount', amount);
  formData.append('phone', phone);
  formData.append('networktype', airtime_type);
  formData.append('transref', ref);
  formData.append('transkey', pin);

  try {
    const response = await fetch(`${BaseUrl}buy-airtime`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const PurchaseData = async ({
  token,
  network,
  phone,
  ref,
  data_plan,
  pin,
}) => {
  const formData = new FormData();
  formData.append('network', network);
  formData.append('phone', phone);
  formData.append('dataplan', data_plan);
  formData.append('transref', ref);
  formData.append('transkey', pin);

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

export const GetDataPlans = async ({ token }) => {
  return await sendRequest({
    url: 'data-plans',
    token,
  });
};

export const GetCableProviders = async ({ token }) => {
  return await sendRequest({
    url: 'cable-providers',
    token,
  });
};

export const GetCablePlans = async ({ token }) => {
  return await sendRequest({
    url: 'cable-plans',
    token,
  });
};

export const VerifyCableNumber = async ({ token, iucnumber, cablename }) => {
  const formdata = new FormData();
  formdata.append('provider', cablename);
  formdata.append('iucnumber', iucnumber);

  try {
    const response = await fetch(`${BaseUrl}cable-number`, {
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

export const SubscribeCableTv = async ({
  token,
  provider,
  phone,
  iucnumber,
  ref,
  pin,
  cableplanId,
  subtype,
}) => {
  const formdata = new FormData();
  formdata.append('provider', provider);
  formdata.append('phone', phone);
  formdata.append('subtype', subtype);
  formdata.append('iucnumber', iucnumber);
  formdata.append('transref', ref);
  formdata.append('transkey', pin);
  formdata.append('cableplan', cableplanId);
  try {
    const response = await fetch(`${BaseUrl}subscribe-cabletv`, {
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

export const GetElectricityProviders = async ({ token }) => {
  return await sendRequest({
    url: 'meter-providers',
    token,
  });
};
export const VerifyMeterNumber = async ({
  token,
  meternumber,
  provider,
  metertype,
}) => {
  const formdata = new FormData();
  formdata.append('provider', provider);
  formdata.append('meternumber', meternumber);
  formdata.append('metertype', metertype);

  try {
    const response = await fetch(`${BaseUrl}meter-number`, {
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

export const PurchaseElectricityToken = async ({
  token,
  meternumber,
  provider,
  metertype,
  amount,
  pin,
  phone,
  ref,
}) => {
  const formdata = new FormData();
  formdata.append('provider', provider);
  formdata.append('meternumber', meternumber);
  formdata.append('metertype', metertype);
  formdata.append('amount', amount);
  formdata.append('phone', phone);
  formdata.append('transkey', pin);
  formdata.append('transref', ref);

  try {
    const response = await fetch(`${BaseUrl}purchase-meter`, {
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
export const GetExamPinProviders = async ({ token }) => {
  return await sendRequest({
    url: 'exam-providers',
    token,
  });
};

export const PurchaseExamPin = async ({
  token,
  provider,
  quantity,
  pin,
  ref,
}) => {
  const formdata = new FormData();
  formdata.append('provider', provider);
  formdata.append('quantity', quantity);
  formdata.append('transref', ref);
  formdata.append('transkey', pin);

  try {
    const response = await fetch(`${BaseUrl}purchase-exampin`, {
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

export const GetDataPinPlans = async ({
  token,
  fullname,
  role,
  accountstatus,
  username,
}) => {
  return await sendRequest({
    url: 'datapin-plans',
    token,
  });
};

export const GetDataPins = async ({ token }) => {
  return await sendRequest({
    // method: 'POST',
    url: 'datapin-tokens?pagenumber=1',
    token,
  });
};

export const GetAirtimePinDetails = async ({ token, ref }) => {
  return await sendRequest({
    url: 'rechargecard-tokens?ref=' + ref,
    token,
  });
};
export const GetDataPinDetails = async ({ token, ref }) => {
  return await sendRequest({
    url: 'datapin-tokens?ref=' + ref,
    token,
  });
};
export const PurchaseDataPin = async ({
  token,
  network,
  businessname,
  quantity,
  plan,
  ref,
  pin,
}) => {
  const formdata = new FormData();
  formdata.append('network', network);
  formdata.append('quantity', quantity);
  formdata.append('businessname', businessname);
  formdata.append('datapinplan', plan);
  formdata.append('transref', ref);
  formdata.append('transkey', pin);

  try {
    const response = await fetch(`${BaseUrl}purchase-datapin`, {
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

export const GetAirtimePinPlans = async ({ token }) => {
  return await sendRequest({
    url: 'rechargecard-plans',
    token,
  });
};

export const GetAirtimePins = async ({ token }) => {
  return await sendRequest({
    url: 'rechargecard-tokens?pagenumber=1',
    token,
  });
};

export const PurchaseAirtimePin = async ({
  token,
  network,
  businessname,
  quantity,
  plan,
  ref,
  pin,
}) => {
  const formdata = new FormData();
  formdata.append('network', network);
  formdata.append('amount', plan);
  formdata.append('quantity', quantity);
  formdata.append('businessname', businessname);
  formdata.append('transref', ref);
  formdata.append('transkey', pin);
  try {
    const response = await fetch(`${BaseUrl}purchase-rechargepin`, {
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

export const GetAlphaPlans = async ({ token }) => {
  return await sendRequest({
    url: 'alpha-plans',
    token,
  });
};

export const PurchaseAlpha = async ({ token, phone, ref, plan, pin }) => {
  const formdata = new FormData();
  formdata.append('alphaplan', plan);
  formdata.append('phone', phone);
  formdata.append('transref', ref);
  formdata.append('transkey', pin);

  try {
    const response = await fetch(`${BaseUrl}purchase-alpha`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GetAirtimeSwapDetails = async ({ token }) => {
  return await sendRequest({
    url: 'airtime-cash-details',
    token,
  });
};

export const SendAirtimeSwapRequest = async ({
  token,
  network,
  amount,
  ref,
  pin,
  phone,
}) => {
  console.log({ token, network, amount, ref, pin, phone });
  const formdata = new FormData();
  formdata.append('airtimetocashnetwork', network);
  formdata.append('airtimetocashphone', phone);
  formdata.append('airtimetocashamount', amount);
  formdata.append('transref', ref);
  formdata.append('transkey', pin);

  try {
    const response = await fetch(`${BaseUrl}airtime-cash-request`, {
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
export const GetSmilePlans = async ({ token }) => {
  return await sendRequest({
    url: 'smile-plans',
    token,
  });
};

export const PurchaseSmile = async ({
  token,
  phone,
  ref,
  plan,
  pin,
  accountType,
}) => {
  const formdata = new FormData();
  formdata.append('phone', phone);
  formdata.append('actype', accountType);
  formdata.append('dataplan', plan);
  formdata.append('transref', ref);
  formdata.append('transkey', pin);

  try {
    const response = await fetch(`${BaseUrl}purchase-smile`, {
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

export const GetTransactions = async ({
  token,
  keyword,
  service,
  date,
  page,
}) => {
  return await sendRequest({
    url: `transactions?pagenumber=${page || 1}`,
    token,
  });
};

export const GetTransactionDetails = async ({
  token,
  ref,
}) => {
  try {

    const response = await axios.get(
      `${BaseUrl}transaction-details?ref=${ref}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const GetCommissionList = async ({ token }) => {
  return await sendRequest({
    url: 'referral-bonus',
    token,
  });
};
