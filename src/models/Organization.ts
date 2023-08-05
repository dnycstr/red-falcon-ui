import * as Yup from 'yup';

import { TableViewModel } from './common/TableViewModel';

export const OrganizationValidation = Yup.object().shape({
  name: Yup.string().max(100, 'Sobra ang Name').required('Name is Required'),
  description: Yup.string().max(500, 'Sobra ang Description').nullable(),
});

export interface OrganizationViewModel {
  id: number;
  name: string;
  description?: string;
}

export interface OrganizationTableViewModel extends TableViewModel {
  data: OrganizationViewModel[];
}

export const OrganizationDefaultValue: OrganizationViewModel = {
  id: 0,
  name: '',
  description: undefined,
};

export const OrganizationTableDefaultValue: OrganizationTableViewModel = {
  data: [],
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
};
