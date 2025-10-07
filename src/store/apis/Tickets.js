import { BaseUrl, sendRequest } from './api';

export const CreateSupportTicket = async ({ token, subject, message }) => {
  const formdata = new FormData();
  formdata.append('ref', subject);
  formdata.append('queryContent', message);

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
    return error;
  }
};

export const GetSupportTickets = async ({ token }) => {
  return await sendRequest({
    url: 'tickets',
    token,
  });
};

export const SendTicketMessage = async ({ token, ticketid, message }) => {
  const formdata = new FormData();
  formdata.append('issueId', ticketid);
  formdata.append('replyContent', message);

  try {
    const response = await fetch(`${BaseUrl}reply-ticket`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const GetTicketMessages = async ({ token, ticketid }) => {
  return await sendRequest({
    url: 'ticket-messages?id=' + ticketid,
    token,
  });
};
