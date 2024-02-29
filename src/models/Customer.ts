/* eslint-disable prettier/prettier */
import * as Yup from 'yup';

import { TableViewModel } from './common/TableViewModel';

export const CustomerValidation = Yup.object().shape({
    customer: Yup.string()
        .max(100, 'Characters cannot exceed 100 characters!')
        .required('Customer name is required'),
    firstname: Yup.string()
        .max(100, 'Cannot exceed 100 characters!'),
    lastname: Yup.string().max(100, 'Cannot exceed 100 characters!').nullable(),
    email: Yup.string().email('Invalid Email'),
    phone: Yup.string(),
    fax: Yup.string(),
    mobile: Yup.string(),
    tollfree: Yup.string(),
    accountnumber: Yup.string(),
    website: Yup.string(),
    notes: Yup.string(),
    currency: Yup.string(),
    address: Yup.string(),
    address2: Yup.string(),
    country: Yup.string(),
    province: Yup.string(),
    city: Yup.string(),
    postal: Yup.string(),

});


export interface CustomerViewModel {
    id: number;
    customer: string
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    fax?: string;
    mobile?: string;
    tollfree?: string;
    accountnumber?: string;
    website?: string,
    notes?: string,
    currency?: string;
    address?: string;
    address2?: string;
    country?: string;
    province?: string;
    city: string;
    postal: string;
}

export interface CustomerTableViewModel extends TableViewModel {
    data: CustomerViewModel[];
}

export const customerDefaultValue: CustomerViewModel = {
    id: 0,
    customer: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    fax: '',
    mobile: '',
    tollfree: '',
    accountnumber: '',
    website: '',
    notes: '',
    currency: '',
    address: '',
    address2: '',
    country: '',
    province: '',
    city: '',
    postal: '',
};

export const customerTableDefaultValue: CustomerTableViewModel = {
    data: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
};