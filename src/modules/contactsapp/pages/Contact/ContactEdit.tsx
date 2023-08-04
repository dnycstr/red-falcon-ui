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

const initialOrganizations: SelectOptions[] = [];

export const ContactEdit: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [contactData, setContactData] =
    useState<ContactViewModel>(contactDefaultValue);
  const [isContactLoading, setIsContactLoading] = useState(true);
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [isOrganizationsLoading, setIsOrganizationsLoading] = useState(true);

  useEffect(() => {
    loadContactData();
    loadOrganizations();
  }, [id]);

  useEffect(() => {
    if (!isOrganizationsLoading && !isContactLoading) {
      setIsLoading(false);
    }
  }, [isContactLoading, isOrganizationsLoading]);

  const loadContactData = () => {
    ContactServices.getById(Number(id))
      .then((response) => response.json() as Promise<ContactViewModel>)
      .then((data) => {
        setContactData(data);
        setIsContactLoading(false);
      });
  };

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

  const handleUpdate = (
    values: ContactViewModel,
    action: FormikHelpers<ContactViewModel>
  ) => {
    ContactServices.update(Number(id), values).then((response) => {
      if (response.status == 204) {
        alert('Successfully Updated');
        action.resetForm();
        navigate(`${routes.CONTACTS}`);
      }
    });
  };

  const handleDelete = () => {
    ContactServices.delete(Number(id)).then((response) => {
      if (response.status == 204) {
        alert('Successfully Deleted');
        navigate(`${routes.CONTACTS}`);
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
            validationSchema={ContactValidation}
            validateOnChange={true}
            validateOnBlur={true}
            initialValues={contactData}
            onSubmit={(values, action) => {
              handleUpdate(values, action);
            }}
          >
            {(formikProps) => {
              return (
                <div className="max-w-lg mx-40">
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
