/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
import { Formik, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@components/Form/Input';
import { Select } from '@components/Form/Select';
import { routes } from '@config/routes';
import {
    ContactViewModel,
    contactDefaultValue
} from '@models/Contact';
import { taxValidation } from '@models/Tax';
import { SelectOptions } from '../../../../models/common/SelectOptions';

const initialOrganizations: SelectOptions[] = [];

const provinceSelection: SelectOptions[] = [
    { value: ' ', text: ' ' },
    { value: 'Alberta', text: 'Alberta' },
    { value: 'British Columbia', text: 'British Columbia' },
    { value: 'Nova Scotia', text: 'Nova Scotia' },
    { value: 'Prince Edward Island', text: 'Prince Edward Island' },
    { value: 'Quebec', text: 'Quebec' },
    { value: 'Yukon', text: 'Yukon' },
    { value: 'Northwest Territories', text: 'Northwest Territories' },
    { value: 'Newfoundland and Labrador', text: 'Newfoundland and Labrador' },
    { value: 'Ontario', text: 'Ontario' },
    { value: 'Manitoba', text: 'Manitoba' },
    { value: 'New Brunswick', text: 'New Brunswick' }
];

export const TaxCalculation: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { id } = useParams();
    const [contactData, setContactData] = useState<ContactViewModel>(contactDefaultValue);
    const [isContactLoading, setIsContactLoading] = useState(true);
    const [organizations, setOrganizations] = useState(initialOrganizations);
    const [provinces, setProvinces] = useState([{ value: '0', text: '' }]);
    const [isOrganizationsLoading, setIsOrganizationsLoading] = useState(true);
    const [isTaxLoading, setIsTaxLoading] = useState(true);
    const [taxData, setTaxData] = useState(0);
    const [taxableIncome, setTaxableIncome] = useState(0)
    const [provincialTax, setProvincialTax] = useState(0)

    useEffect(() => {
        //loadContactData();
        //loadOrganizations();
        //loadTaxData();
        setProvinces(provinceSelection);
    }, [id]);

    const computeProvincialTax = (province: string, taxableIncome: number) => {
        console.log(province);
        console.log(taxableIncome);
        let tax = 0;
        if (province === 'Alberta') {
            if (taxableIncome <= 142292) {
                tax = taxableIncome * 0.1;
            } else if (taxableIncome <= 170751) {
                tax = 142292 * 0.1 + (taxableIncome - 142292) * 0.12;
            } else if (taxableIncome <= 227668) {
                tax = 142292 * 0.1 + (170751 - 142292) * 0.12 + (taxableIncome - 170751) * 0.13;
            } else if (taxableIncome <= 341502) {
                tax = 142292 * 0.1 + (170751 - 142292) * 0.12 + (227668 - 170751) * 0.13 + (taxableIncome - 227668) * 0.14;
            } else {
                tax = 142292 * 0.1 + (170751 - 142292) * 0.12 + (227668 - 170751) * 0.13 + (341502 - 227668) * 0.14 + (taxableIncome - 341502) * 0.15;
            }
        }
        else if (province === 'British Columbia') {
            if (taxableIncome <= 45654) {
                tax = taxableIncome * 0.0506;
            } else if (taxableIncome <= 91310) {
                tax = 45654 * 0.0506 + (taxableIncome - 45654) * 0.077;
            } else if (taxableIncome <= 104835) {
                tax = 45654 * 0.0506 + (91310 - 45654) * 0.077 + (taxableIncome - 91310) * 0.105;
            } else if (taxableIncome <= 127299) {
                tax = 45654 * 0.0506 + (91310 - 45654) * 0.077 + (104835 - 91310) * 0.105 + (taxableIncome - 104835) * 0.1229;
            } else if (taxableIncome <= 172602) {
                tax = 45654 * 0.0506 + (91310 - 45654) * 0.077 + (104835 - 91310) * 0.105 + (127299 - 104835) * 0.1229 + (taxableIncome - 127299) * 0.147;
            } else if (taxableIncome <= 240716) {
                tax = 45654 * 0.0506 + (91310 - 45654) * 0.077 + (104835 - 91310) * 0.105 + (127299 - 104835) * 0.1229 + (172602 - 127299) * 0.147 + (taxableIncome - 172602) * 0.168;
            } else {
                tax = 45654 * 0.0506 + (91310 - 45654) * 0.077 + (104835 - 91310) * 0.105 + (127299 - 104835) * 0.1229 + (172602 - 127299) * 0.147 + (240716 - 172602) * 0.168 + (taxableIncome - 240716) * 0.205;
            }
        }
        else if (province === 'Manitoba')
            if (taxableIncome <= 36842) {
                tax = taxableIncome * 0.108;
            } else if (taxableIncome <= 79625) {
                tax = 36842 * 0.108 + (taxableIncome - 36842) * 0.1275;
            } else {
                tax = 36842 * 0.108 + (79625 - 36842) * 0.1275 + (taxableIncome - 79625) * 0.174;
            }
        return tax;
    };

    const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProvince = event.target.value;
        const taxableIncome = 0
        const computedTax = computeProvincialTax(selectedProvince, taxableIncome);
        setTaxData(computedTax);
    };

    const handleTaxableIncomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Update the state with the new value from the input
        setProvincialTax(taxData);
    };
  
    return (
        <>
            <div className="flex flex-col py-4">
                Provincial Tax: {}
                <Formik
                    validationSchema={taxValidation}
                    validateOnChange={true}
                    validateOnBlur={true}
                    initialValues={{
                        taxableIncome: 0,
                        province: ' ',
                        provincialTax: 0,
                    }}
                    onSubmit={(values: { taxableIncome: number; province: string }, action) => {
                        console.log(values);
                        setTaxData(computeProvincialTax(values.province, values.taxableIncome))
                    }}
                >
                    {(formikProps) => {
                        return (
                            <div className="max-w-lg mx-40">
                                <form method="POST" onSubmit={formikProps.handleSubmit}>
                                    <Input name="taxableIncome" label="Taxable Income" onChange={formikProps.handleChange} />
                                    <Select
                                        label="Province"
                                        name="province"
                                        selection={provinces}
                                        value="10"
                                        onChange={handleProvinceChange} />
                                    <Input name="provincialTax" label="Provincial Tax" value="19999" readonly onChange={handleTaxableIncomeChange} />
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
                                        Calculate
                                    </button>
                                    {/*<div>Provincial Tax : {computeProvincialTax(values.province, values.taxableIncome)}</div>*/}
                                </form>

                            </div>
                        );
                    }}
                </Formik>

            </div>
        </>
    );
};
