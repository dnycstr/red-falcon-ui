import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { routes } from '@config/routes';
import { ContactViewModel, contactDefaultValue } from '@models/Contact';
import { ContactServices } from '@services/Contact';

export const ContactDetails: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [contactData, setContactData] =
    useState<ContactViewModel>(contactDefaultValue);

  useEffect(() => {
    loadContactData();
  }, [id]);

  const loadContactData = () => {
    ContactServices.getById(Number(id))
      .then((response) => response.json() as Promise<ContactViewModel>)
      .then((data) => {
        setContactData(data);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div className="p-10">Is Loading....</div>;
  } else {
    return (
      <>
        <div className="flex flex-col py-4">
          <div>
            <h1 className="text-2xl font-bold">Contact Details</h1>
          </div>
          <div>
            Name: {contactData.firstname} {contactData.lastname}
          </div>
          <div>Email: {contactData.email}</div>
          <div>Phone: {contactData.phone}</div>
          <div>
            <button
              type="button"
              className="border mt-4 p-2 rounded-md bg-gray-400 hover:bg-gray-700 text-white"
              onClick={() => {
                navigate(`${routes.CONTACTS}`);
              }}
            >
              Back
            </button>
          </div>
        </div>
      </>
    );
  }
};
