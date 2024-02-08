/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
//Would need to load organizations
//Would need to load the contacts
//Only need to create a post and getByID function
//We will use the getByID function in the details page

import { getDataUrl } from '../core/utils/dataUrl';

import { api } from '@config/apiEndpoints';
import { TaxViewModel } from '@models/Tax';


export const TaxServices = {
    create: async function (tax: TaxViewModel) {
        const createUrl = `${api.BASE_URL}${api.TAXES_ENDPOINT}`;
        const createOptions = {
            method: 'POST',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            }),
            body: JSON.stringify(tax),
        };

        return fetch(createUrl, createOptions);
    },

    getByProvince: async function (province: string, taxableIncome: number) {
        const dataUrl = `${api.BASE_URL}${api.TAXES_ENDPOINT}/${province}?taxableIncome=${taxableIncome}`;
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
            api.TAXES_ENDPOINT,
            page,
            pageSize,
            search
        )

        const dataOptions = {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            }),
        };
        return fetch(dataUrl, dataOptions);
    },
}