/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

//Page Layout
//Select from one of the contacts created
//We then create a form
//Enter the gross income in the input
//Load the 3 taxes from the backend
//Load the Organizations too
//Do the calculations based on the tax rates
//Submit

import { Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DateInput } from '@components/Form/DateInput';
import { Input } from '@components/Form/Input';
import { Select } from '@components/Form/Select';
import { routes } from '@config/routes';
import { SelectOptions } from '@models/common/SelectOptions';
import {
  ContactValidation,
  ContactViewModel,
  contactDefaultValue,
} from '@models/Contact';
import { OrganizationTableViewModel } from '@models/Organization';
import { ContactServices } from '@services/Contact';
import { OrganizationServices } from '@services/Organization';
import { TaxServices } from '@services/Tax';

import {
  TaxViewModel,
  TaxTableViewModel,
  taxDefaultValue,
  taxValidation,
} from '@models/Tax';

const initialOrganizations: SelectOptions[] = [];
const provinceSelection: SelectOptions[] = [
  { value: 'Alberta', text: 'Alberta' },
  { value: 'British Columbia', text: 'British Columbia' },
];

export const TaxCalculation: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [contactData, setContactData] =
    useState<ContactViewModel>(contactDefaultValue);
  const [isContactLoading, setIsContactLoading] = useState(true);
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [provinces, setProvinces] = useState([{ value: '0', text: '' }]);
  const [isOrganizationsLoading, setIsOrganizationsLoading] = useState(true);
  const [isTaxLoading, setIsTaxLoading] = useState(true);
  const [taxData, setTaxData] = useState<TaxViewModel>(taxDefaultValue);

  useEffect(() => {
    //loadContactData();
    //loadOrganizations();
    //loadTaxData();
    setProvinces(provinceSelection);
  }, [id]);

  //   const loadContactData = () => {
  //     ContactServices.getById(Number(id))
  //       .then((response) => response.json() as Promise<ContactViewModel>)
  //       .then((data) => {
  //         setContactData(data);
  //         setIsContactLoading(false);
  //       });
  //   };

  //   const loadOrganizations = () => {
  //     OrganizationServices.getList(1, 1000)
  //       .then(
  //         (response) => response.json() as Promise<OrganizationTableViewModel>
  //       )
  //       .then((result) => {
  //         const organizationSelection = [{ value: '0', text: '' }].concat(
  //           result.data.map((row) => ({
  //             value: row.id.toString(),
  //             text: row.name,
  //           }))
  //         );
  //         setOrganizations(organizationSelection);

  //         setIsOrganizationsLoading(false);
  //       });
  //   };

  //   const loadTaxData = () => {
  //     TaxServices.getByProvince(String('Alberta'), Number(135000))
  //       .then((response) => response.json() as Promise<TaxViewModel>)
  //       .then((data) => {
  //         setTaxData(data);
  //         //console.log(data);
  //         setIsTaxLoading(false);
  //         //console.log(taxData);
  //       });
  //   };

  return (
    <>
      <div className="flex flex-col py-4">
        Result : {taxData.tax}
        <Formik
          validationSchema={taxValidation}
          validateOnChange={true}
          validateOnBlur={true}
          initialValues={taxData}
          onSubmit={(values, action) => {
            console.log(values);
            TaxServices.getPersonTax(values.province, values.taxableIncome)
              .then((response) => response.json() as Promise<TaxViewModel>)
              .then((data) => {
                setTaxData(data);
              });
          }}
        >
          {(formikProps) => {
            return (
              <div className="max-w-lg mx-40">
                <form method="POST" onSubmit={formikProps.handleSubmit}>
                  {/* <Input name="firstname" label="Firstname" />
                  <Input name="lastname" label="Lastname" />
                  <Input name="email" label="Email" />
                  <DateInput name="birthDate" label="Birth Date" />
                  <Input name="phone" label="Phone Number" />
                  <Select
                    label="Organization"
                    name="organizationId"
                    selection={organizations}
                    value="0"
                  /> */}
                  <Input name="taxableIncome" label="Taxable Income" />
                  <Select
                    label="Province"
                    name="province"
                    selection={provinces}
                    value="0"
                  />
                  <button
                    type="button"
                    className="border mt-4 p-2 rounded-md bg-gray-400 hover:bg-gray-700 text-white"
                    onClick={() => {
                      navigate(`${routes.CONTACTS}`);
                    }}
                  >
                    Cancel
                  </button>
                  {/* <button
                    type="button"
                    className="border mt-4 p-2 rounded-md bg-red-500 hover:bg-red-700 text-white"
                    onClick={() => console.log('Allo')}
                  >
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="border mt-4 p-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                  >
                    Update
                  </button> */}
                  <button
                    type="submit"
                    className="border mt-4 p-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                  >
                    Calculate
                  </button>
                </form>
              </div>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
