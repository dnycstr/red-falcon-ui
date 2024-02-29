/* eslint-disable prettier/prettier */
/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field,Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DateInput } from '@components/Form/DateInput';
import { Input } from '@components/Form/Input';
import { Select } from '@components/Form/Select';
import { routes } from '@config/routes';
import { SelectOptions } from '@models/common/SelectOptions';
import {
    CustomerValidation,
    CustomerViewModel,
    customerDefaultValue,
    CustomerTableViewModel
} from '@models/Customer';


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


export const CustomerCreate: React.FC = () => {
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    //console.log(countries)
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    console.log(countries)
    return (
        <>
            <div className="flex flex-col">
                <Formik
                    validationSchema={CustomerValidation}
                    validateOnChange={true}
                    validateOnBlur={true}
                    initialValues={customerDefaultValue}
                    onSubmit={(values, action) => {
                        //handleFormSubmit(values, action);
                        console.log(values);
                    }}
                >
                    {(formikProps) => {
                        return (
                            <div className="max-w-lg mx-40 py-4">
                                <form method="POST" onSubmit={formikProps.handleSubmit}>
                                    <Input name="customer" label="Customer" />
                                    <Input name="firstname" label="Firstname" />
                                    <Input name="lastname" label="Lastname" />
                                    <Input name="email" label="Email" />
                                    <Input name="phone" label="Phone" />
                                    <Input name="fax" label="Fax" />
                                    <Input name="mobile" label="Mobile" />
                                    <Input name="tollfree" label="Toll-Free" />
                                    <Input name="accountnumber" label="Account Number" />
                                    <Input name="website" label="Website" />
                     
                                    <label>Notes</label>
                                    <Field
                                        as="textarea"
                                        id="notes"
                                        name="notes"
                                        placeholder="Enter your notes here"
                                    />
                                    <Input name="currency" label="Currency" />


                            
                                    <Input name="phone" label="Phone Number" />
                                    {/*<Select*/}
                                    {/*    label="Organization"*/}
                                    {/*    name="organizationId"*/}
                                    {/*    selection={organizations}*/}
                                    {/*    value="0"*/}
                                    {/*/>*/}
                                    <button
                                        type="button"
                                        className="border mt-4 p-2 rounded-md bg-gray-400 hover:bg-gray-700 text-white"
                                        onClick={() => {
                                            navigate(`${routes.CONTACTS}`);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="border mt-4 p-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        );
                    }}
                </Formik>
            </div>
        </>
    )
}