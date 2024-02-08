/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@components/Form/Input';
import { routes } from '@config/routes';
import { SelectOptions } from '@models/common/SelectOptions';

import {
  OrganizationValidation,
  OrganizationViewModel,
  OrganizationDefaultValue,
  OrganizationTableViewModel,
} from '@models/Organization';

import { OrganizationServices } from '@services/Organization';

const initialOrganizations: SelectOptions[] = [];

export const OrganizationCreate: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleFormSubmit = (
    //Values is the format in which we would be sending the form data to the api.
    values: OrganizationViewModel,
    action: FormikHelpers<OrganizationViewModel>
  ) => {
    OrganizationServices.create(values).then((response) => {
      if (response.status == 201) {
        alert('Successfully Added');
        action.resetForm();
        navigate(`${routes.ORGANIZATIONS}`);
      }
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <Formik
          validationSchema={OrganizationValidation}
          validateOnChange={true}
          validateOnBlur={true}
          initialValues={OrganizationDefaultValue}
          onSubmit={(values, action) => {
            handleFormSubmit(values, action);
          }}
        >
          {(formikProps) => {
            return (
              <div className="max-w-lg mx-40 py-4">
                <form method="POST" onSubmit={formikProps.handleSubmit}>
                  <Input name="name" label="Organization name" />
                  <Input name="description" label="Description" />
                  <button
                    type="button"
                    className="border mt-4 p-2 rounded-md bg-gray-400 hover:bg-gray-700 text-white"
                    onClick={() => {
                      navigate(`${routes.ORGANIZATIONS}`);
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
  );
};
