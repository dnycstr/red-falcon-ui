import { api } from '@config/apiEndpoints';
import { ContactViewModel } from '@models/Contact';

export const ContactServices = {
  create: async function (contact: ContactViewModel) {
    const createUrl = `${api.BASE_URL}${api.CONTACTS_ENDPOINT}`;
    const createOptions = {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }),
      body: JSON.stringify(contact),
    };

    return fetch(createUrl, createOptions);
  },
  delete: async function (id: number) {
    const deleteURL = `${api.BASE_URL}${api.CONTACTS_ENDPOINT}/${id}`;
    const deleteOptions = {
      method: 'DELETE',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }),
    };

    return fetch(deleteURL, deleteOptions);
  },
  getById: async function (id: number) {
    const dataUrl = `${api.BASE_URL}${api.CONTACTS_ENDPOINT}/${id}`;
    const dataOptions = {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }),
    };

    return fetch(dataUrl, dataOptions);
  },
  getList: async function () {
    const dataUrl = `${api.BASE_URL}${api.CONTACTS_ENDPOINT}`;

    const dataOptions = {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }),
    };
    return fetch(dataUrl, dataOptions);
  },
  update: async function (id: number, contact: ContactViewModel) {
    const updateUrl = `${api.BASE_URL}${api.CONTACTS_ENDPOINT}/${id}`;
    const updateOptions = {
      method: 'PUT',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }),
      body: JSON.stringify(contact),
    };

    return fetch(updateUrl, updateOptions);
  },
};
