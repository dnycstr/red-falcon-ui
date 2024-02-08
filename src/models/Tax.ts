/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import * as Yup from 'yup';

import { TableViewModel } from './common/TableViewModel';

export const taxValidation = Yup.object().shape({
  taxableIncome: Yup.number().required('Enter your taxable income'),
});
export interface TaxViewModel {
  province: string;
  taxableIncome: number;
  tax?: number;
}

export interface TaxTableViewModel extends TableViewModel {
  data: TaxViewModel[];
}

export const taxDefaultValue: TaxViewModel = {
  province: '',
  taxableIncome: 0,
  tax: 0,
};

export const TaxTableDefaultValue: TaxTableViewModel = {
  data: [],
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
};
