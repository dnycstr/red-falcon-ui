/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Field,useFormik } from 'formik';

export const TaxCalculation: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            taxableIncome: '',
            province: '',
            provincialTax: 0,
        },

        onSubmit: (values, { setSubmitting, resetForm }) => {
            console.log('Form submitted:', values);
            resetForm();
            setSubmitting(false);
        },
    });

    const calculateProvincialTax = (income: string): number => {
        const parsedIncome = parseFloat(income);
        if (!isNaN(parsedIncome)) {
            return parsedIncome * 20;
        } else {
            return 0; // Or any default value you prefer
        }
    };

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='taxableIncome'>Taxable Income</label>
                <input
                    type='text'
                    id='taxableIncome'
                    name='taxableIncome'
                    onChange={(event) => {
                        formik.handleChange(event);
                        const provincialTax = calculateProvincialTax(event.target.value);
                        formik.setFieldValue('provincialTax', provincialTax);
                    }}
                    value={formik.values.taxableIncome}
                />

                <label htmlFor='province'>Province</label>
                <label htmlFor='provincialTax'>Provincial Tax</label>
                <input
                    type='provincialTax'
                    id='provincialTax'
                    name='provincialTax'
                    readOnly
                    value={formik.values.provincialTax}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};
