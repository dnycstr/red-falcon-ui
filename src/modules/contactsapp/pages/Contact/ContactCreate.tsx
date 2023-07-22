import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

import { DateInput } from '@components/Form/DateInput';
import { Input } from '@components/Form/Input';
import { routes } from '@config/routes';
import {
  ContactValidation,
  ContactViewModel,
  contactDefaultValue,
} from '@models/Contact';
import { ContactServices } from '@services/Contact';

export const ContactCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (
    values: ContactViewModel,
    action: FormikHelpers<ContactViewModel>
  ) => {
    ContactServices.create(values).then((response) => {
      if (response.status == 201) {
        alert('Successfully Added');
        action.resetForm();
        navigate(`${routes.CONTACTS}`);
      }
    });
  };

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
};
