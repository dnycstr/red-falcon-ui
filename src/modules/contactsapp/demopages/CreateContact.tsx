/* eslint-disable prettier/prettier */
import { useState } from 'react';

import {CustomInput } from './CustomInput';
interface Contact {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    organizationID: null;
}

const defaultContact: Contact = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    organizationID: null
};

interface CreateContactProps {
    isCompleted: () => void
}

export const CreateContact: React.FC<CreateContactProps> = ({isCompleted}) => {
    const [contact, setContact] = useState<Contact>(defaultContact);

    const handleInputChange = (value: string, fieldname: string) => {
        setContact((prevContact) => ({ ...prevContact, [fieldname]: value }));
    };

    const handleSaveClick = () => {
        console.log('Saving Contact');
        console.log(contact);

        // Fetch API
        fetch('https://localhost:5001/api/contacts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        }).finally(() => {
            console.log("Already saved");
            isCompleted()
        });
    };

    return (
        <div>
            <CustomInput label="First Name" fieldname="firstname" onChange={handleInputChange} />
            <CustomInput label="Last Name" fieldname="lastname" onChange={handleInputChange} />
            <CustomInput label="Email" fieldname="email" onChange={handleInputChange} />
            <CustomInput label="Phone Number" fieldname="phone" onChange={handleInputChange} />
            <button
                type="button"
                className="m-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
                Cancel
            </button>
            <button
                type="button"
                onClick={handleSaveClick}
                className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Save
            </button>
        </div>
    );
};