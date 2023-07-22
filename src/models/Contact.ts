import * as Yup from 'yup';

export interface ContactViewModel {
  id: number;
  firstname: string;
  lastname: string;
  birthDate?: Date;
  email: string;
  phone?: string;
}

export interface ContactTableViewModel {
  contacts: ContactViewModel[];
}

export const contactDefaultValue: ContactViewModel = {
  id: 0,
  firstname: '',
  lastname: '',
  email: '',
  birthDate: undefined,
  phone: '',
};

export const ContactValidation = Yup.object().shape({
  firstname: Yup.string()
    .max(20, 'Sobra ang Pangalan')
    .required('Firstname is Required'),
  lastname: Yup.string().max(21, 'Sobra ang Apelyido').nullable(),
  email: Yup.string().email('Invalid Email').required('Email is Required'),
  birthDate: Yup.date()
    .max(new Date(), 'Must be lesser than today')
    .required('Birth Date is Required'),
  phone: Yup.string().required('Phone is Required'),
});
