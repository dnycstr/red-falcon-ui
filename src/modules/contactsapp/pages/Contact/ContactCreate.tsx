import { Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const initialOrganizations: SelectOptions[] = [];

export const ContactCreate: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [isOrganizationsLoading, setIsOrganizationsLoading] = useState(true);

  const loadOrganizations = () => {
    OrganizationServices.getList(1, 1000)
      .then(
        (response) => response.json() as Promise<OrganizationTableViewModel>
      )
      .then((result) => {
        const organizationSelection = [{ value: '0', text: '' }].concat(
          result.data.map((row) => ({
            value: row.id.toString(),
            text: row.name,
          }))
        );

        setOrganizations(organizationSelection);

        setIsOrganizationsLoading(false);
      });
  };

  const handleFormSubmit = (
    values: ContactViewModel,
    action: FormikHelpers<ContactViewModel>
  ) => {
    ContactServices.create(values).then((response) => {
      if (response.status == 201) {
        alert('Successfully Added123');
        action.resetForm();
        navigate(`${routes.CONTACTS}`);
      }
    });
  };

  useEffect(() => {
    if (!isOrganizationsLoading) {
      setIsLoading(false);
    }
  }, [isOrganizationsLoading]);

  useEffect(() => {
    loadOrganizations();
  }, []);

  if (isLoading) {
    return <div className="p-10">Is Loading....Shravan</div>;
  } else {
    return (
      <>
        <div className="flex flex-col">
          <Formik
            validationSchema={ContactValidation}
            validateOnChange={true}
            validateOnBlur={true}
            initialValues={contactDefaultValue}
            onSubmit={(values, action) => {
              handleFormSubmit(values, action);
            }}
          >
            {(formikProps) => {
              return (
                <div className="max-w-lg mx-40 py-4">
                  <form method="POST" onSubmit={formikProps.handleSubmit}>
                    <Input name="firstname" label="Firstname" />
                    <Input name="lastname" label="Lastname" />
                    <Input name="email" label="Email" />
                    <DateInput name="birthDate" label="Birth Date" />
                    <Input name="phone" label="Phone Number" />
                    <Select
                      label="Organization"
                      name="organizationId"
                      selection={organizations}
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
  }
};
