import { BaseUrl, sendRequest } from './api';

export const GetContactList = async ({ token }) => {
  const response = await sendRequest({
    url: 'beneficiary',
    token,
  });

  return response;
};

export const AddToContactList = async ({ token, name, contact }) => {
  const formdata = new FormData();
  formdata.append('name', name);
  formdata.append('phone', contact);

  try {
    const response = await fetch(`${BaseUrl}save-beneficiary`, {
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

export const UpdateContactList = async ({ token, name, contact, id }) => {
  const response = await sendRequest({
    method: 'POST',
    url: 'user/contact',
    token,
    data: {
      id,
      name,
      contact,
    },
  });

  return response;
};

export const DeleteContactList = async ({ token, id }) => {
  const formdata = new FormData();
  formdata.append('contact', id);

  try {
    const response = await fetch(`${BaseUrl}delete-beneficiary`, {
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

  return response;
};
