import { useState } from 'react';

import { CustomInput } from './CustomInput';

interface ContactModel {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
}

const defaultContact: ContactModel = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
};

// Parent Component
export const CreateContact: React.FC = () => {
  const [contact, setContact] = useState<ContactModel>(defaultContact);

  // console.log(`Contact Firstname: ${contact?.firstName}`);
  // console.log(`Contact Lastname: ${contact?.lastName}`);
  // console.log(`Contact Email: ${contact?.email}`);
  // console.log(`Contact Phone: ${contact?.phoneNumber}`);

  return (
    <div className="w-80">
      <h1 className="p-4">Create Contact Form</h1>
      <CustomInput
        label="First Name"
        onChangeHandler={(value) => {
          // Immutable way of updating the state
          const updatedContact = {
            ...contact, // Spread operator
            firstname: value,
          };

          setContact(updatedContact);
        }}
      />

      <CustomInput
        label="Last Name"
        onChangeHandler={(value) => {
          // Immutable way of updating the state
          const updatedContact = {
            ...contact, // Spread operator
            lastname: value,
          };

          setContact(updatedContact);
        }}
      />

      <CustomInput
        label="Phone"
        onChangeHandler={(value) => {
          // Immutable way of updating the state
          const updatedContact = {
            ...contact, // Spread operator
            phone: value,
          };

          setContact(updatedContact);
        }}
      />

      <CustomInput
        label="Email"
        onChangeHandler={(value) => {
          // Immutable way of updating the state
          const updatedContact = {
            ...contact, // Spread operator
            email: value,
          };

          setContact(updatedContact);
        }}
      />

      <div className="flex flex-row justify-end space-x-2">
        <button className="bg-gray-500 hover:bg-gray-400 p-2 rounded-lg text-white hover:text-gray-700">
          Cancel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-400 p-2 rounded-lg text-white hover:text-blue-700"
          onClick={() => {
            console.log('Saving Contact');
            console.log(contact);

            // Fetch API
            fetch('https://localhost:7034/api/contacts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(contact),
            });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
