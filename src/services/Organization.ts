import { api } from '@config/apiEndpoints';
import { OrganizationViewModel } from '@models/Organization';
import { getDataUrl } from '@utils/dataUrl';

export const OrganizationServices = {
  create: async function (organization: OrganizationViewModel) {
    const createUrl = `${api.BASE_URL}${api.ORGANIZATIONS_ENDPOINT}`;
    const createOptions = {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }),
      body: JSON.stringify(organization),
    };

    return fetch(createUrl, createOptions);
  },
  delete: async function (id: number) {
    const deleteURL = `${api.BASE_URL}${api.ORGANIZATIONS_ENDPOINT}/${id}`;
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
    const dataUrl = `${api.BASE_URL}${api.ORGANIZATIONS_ENDPOINT}/${id}`;
    const dataOptions = {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }),
    };

    return fetch(dataUrl, dataOptions);
  },
  getList: async function (page?: number, pageSize?: number, search?: string) {
    const dataUrl = getDataUrl(
      api.BASE_URL,
      api.ORGANIZATIONS_ENDPOINT,
      page,
      pageSize,
      search
    );

    const dataOptions = {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }),
    };
    return fetch(dataUrl, dataOptions);
  },
  update: async function (id: number, organization: OrganizationViewModel) {
    const updateUrl = `${api.BASE_URL}${api.ORGANIZATIONS_ENDPOINT}/${id}`;
    const updateOptions = {
      method: 'PUT',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }),
      body: JSON.stringify(organization),
    };

    return fetch(updateUrl, updateOptions);
  },
};
