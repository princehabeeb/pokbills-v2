import { BaseUrl, sendRequest } from './api';

export const ReportTransactionApi = async ({
  token,
  transref,
  description,
}) => {
  const formdata = new FormData();
  formdata.append('ref', transref);
  formdata.append('queryContent', description);

  
  try {
    const response = await fetch(`${BaseUrl}report-issue`, {
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

export const GetManualFundingDetails = async ({ token }) => {
  return await sendRequest({
    url: 'user/manualfund',
    token,
  });
};

export const MakeBankTransfer = async ({
  token,
  accountname,
  accountnumber,
  bankname,
  bankcode,
  amount,
}) => {
  return await sendRequest({
    method: 'POST',
    url: 'user/funding/banktransfer',
    token,
    data: {
      accountname,
      accountnumber,
      bankname,
      bankcode,
      amount,
    },
  });
};

export const MakeBankWithdrawal = async ({
  token,
  accountname,
  accountnumber,
  bankname,
  bankcode,
  amount,
}) => {
  return await sendRequest({
    method: 'POST',
    url: 'user/funding/withdrawal',
    token,
    data: {
      accountname,
      accountnumber,
      bankname,
      bankcode,
      amount,
    },
  });
};

export const GetBankList = async ({ token }) => {
  return await sendRequest({
    url: 'user/funding/banks',
    token,
  });
};

export const VerifyAccountNumber = async ({
  token,
  accountnumber,
  bankname,
  bankcode,
}) => {
  return await sendRequest({
    method: 'POST',
    url: 'user/funding/accountname',
    token,
    data: {
      accountnumber,
      bankname,
      bankcode,
    },
  });
};

export const GiftAUser = async ({ token, phone, amount }) => {
  return await sendRequest({
    method: 'POST',
    url: 'user/giftuser',
    token,
    data: {
      phone,
      amount,
    },
  });
};

export const GenerateMonnifyVirtualAccount = async ({ token }) => {
  return await sendRequest({
    url: 'user/funding/monnify',
    token,
  });
};

export const GenerateKudaVirtualAccount = async ({ token }) => {
  return await sendRequest({
    url: 'user/funding/kuda',
    token,
  });
};

export const GenerateVirtualAccount = async ({ token, bank }) => {
  const formdata = new FormData();
  formdata.append('bank', bank);

  try {
    const response = await fetch(`${BaseUrl}create-virtual-account`, {
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

export const GetSiteDetails = async ({ token }) => {
  return await sendRequest({
    url: 'site-details',
    token,
  });
};

export const GetFaq = async ({ token }) => {
  return await sendRequest({
    url: 'faq',
    token,
  });
};

export const WithdrawCommission = async ({ token, amount, ref, pin }) => {
  console.log({token,amount,ref,pin})
  const formdata = new FormData();
  formdata.append('amount', amount);
  formdata.append('transfertype', "referral-wallet");
  formdata.append('transkey', pin);

  try {
    const response = await fetch(`${BaseUrl}commission-withdrawal`, {
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

export const GetNotifications = async ({ token }) => {
  return await sendRequest({
    url: 'notifications',
    token,
  });
};

export const UpdateAccountSettings = async ({ token }) => {
  return await sendRequest({
    url: 'user/account-setting',
    token,
  });
};

export const submitManualFunding = async ({
  token,
  payamount,
  payaccount,
  paymethod,
}) => {
  const formdata = new FormData();
  formdata.append('payamount', payamount);
  formdata.append('payaccount', payaccount);
  formdata.append('paymethod', paymethod);

  try {
    const response = await fetch(`${BaseUrl}manual-funding-request`, {
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
