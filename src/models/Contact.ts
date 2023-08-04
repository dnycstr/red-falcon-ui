import * as Yup from 'yup';

import { TableViewModel } from './common/TableViewModel';

export const ContactValidation = Yup.object().shape({
  firstname: Yup.string()
    .max(100, 'Sobra ang Pangalan')
    .required('Firstname is Required'),
  lastname: Yup.string().max(100, 'Sobra ang Apelyido').nullable(),
  email: Yup.string().email('Invalid Email').required('Email is Required'),
  birthDate: Yup.date()
    .max(new Date(), 'Must be lesser than today')
    .required('Birth Date is Required'),
  phone: Yup.string().required('Phone is Required'),
});

export interface ContactViewModel {
  id: number;
  firstname: string;
  lastname: string;
  birthDate?: Date;
  email: string;
  phone?: string;
  organizationId?: number;
}

export interface ContactTableViewModel extends TableViewModel {
  data: ContactViewModel[];
}

export const contactDefaultValue: ContactViewModel = {
  id: 0,
  firstname: '',
  lastname: '',
  email: '',
  birthDate: undefined,
  phone: '',
  organizationId: 0,
};

export const contactTableDefaultValue: ContactTableViewModel = {
  data: [],
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
};
