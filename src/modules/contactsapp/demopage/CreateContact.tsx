import { useState } from 'react';

interface ContactModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export const CreateContact: React.FC = () => {
  const [contact, setContact] = useState<ContactModel>();

  return (
    <div className="w-80">
      <h1 className="p-4">Create Contact Form</h1>
      <CustomInput label="First Name" />

      <CustomInput label="Last Name" />

      <CustomInput label="Phone" />

      <CustomInput label="Email" />

      <div className="flex flex-row justify-end space-x-2">
        <button className="bg-gray-500 hover:bg-gray-400 p-2 rounded-lg text-white hover:text-gray-700">
          Cancel
        </button>
        <button className="bg-blue-500 hover:bg-blue-400 p-2 rounded-lg text-white hover:text-blue-700">
          Save
        </button>
      </div>
    </div>
  );
};

interface CustomInputProps {
  label: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label }) => {
  return (
    <div className="flex flex-col p-2">
      <label> {label}</label>
      <input className="w-80" type="text" />
    </div>
  );
};
