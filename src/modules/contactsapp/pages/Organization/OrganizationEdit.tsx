/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DateInput } from '@components/Form/DateInput';
import { Input } from '@components/Form/Input';
import { Select } from '@components/Form/Select';
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

export const OrganizationEdit: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [isContactLoading, setIsContactLoading] = useState(true);
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [isOrganizationsLoading, setIsOrganizationsLoading] = useState(true);
  const [organizationData, setOrganizationData] =
    useState<OrganizationViewModel>(OrganizationDefaultValue);

  useEffect(() => {
    loadOrganizationData();
  }, [id]);

  useEffect(() => {
    if (!isOrganizationsLoading) {
      setIsLoading(false);
    }
  }, [isOrganizationsLoading]);

  const loadOrganizationData = () => {
    OrganizationServices.getById(Number(id))
      .then((response) => response.json() as Promise<OrganizationViewModel>)
      .then((data) => {
        setOrganizationData(data);
        setIsOrganizationsLoading(false);
      });
  };

  const handleUpdate = (
    values: OrganizationViewModel,
    action: FormikHelpers<OrganizationViewModel>
  ) => {
    OrganizationServices.update(Number(id), values).then((response) => {
      if (response.status == 204) {
        alert('Successfully Updated');
        action.resetForm();
        navigate(`${routes.ORGANIZATIONS}`);
      }
    });
  };

  const handleDelete = () => {
    OrganizationServices.delete(Number(id)).then((response) => {
      if (response.status == 204) {
        alert('Successfully Deleted');
        navigate(`${routes.ORGANIZATIONS}`);
      }
    });
  };

  if (isLoading) {
    return <div className="p-10">Is Loading....</div>;
  } else {
    return (
      <>
        <div className="flex flex-col py-4">
          <Formik
            validationSchema={OrganizationValidation}
            validateOnChange={true}
            validateOnBlur={true}
            initialValues={organizationData}
            onSubmit={(values, action) => {
              handleUpdate(values, action);
            }}
          >
            {(formikProps) => {
              return (
                <div className="max-w-lg mx-40">
                  <form method="POST" onSubmit={formikProps.handleSubmit}>
                    <Input name="name" label="Organization Name" />
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
                      type="button"
                      className="border mt-4 p-2 rounded-md bg-red-500 hover:bg-red-700 text-white"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      type="submit"
                      className="border mt-4 p-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      Update
                    </button>
                  </form>
                </div>
              );
            }}
          </Formik>
        </div>
      </>
    );
  }
};
