/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { routes } from '@config/routes';
import {
  OrganizationViewModel,
  OrganizationDefaultValue,
} from '@models/Organization';
import { OrganizationServices } from '@services/Organization';

export const OrganizationDetails: React.FC = () => {
  const navigate = useNavigate();
  //Need Navigate to go back when clicked on back button
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [organizationData, setOrganizationData] =
    useState<OrganizationViewModel>(OrganizationDefaultValue);
  //The initial organizationData state would be the default values

  useEffect(() => {
    loadOrganizationData();
  }, [id]);
  //the useEffect hook runs our function once

  const loadOrganizationData = () => {
    OrganizationServices.getById(Number(id))
      .then((response) => response.json() as Promise<OrganizationViewModel>)
      .then((data) => {
        setOrganizationData(data);
        setIsLoading(false);
      });
  };

  //we contact the Api by giving the id as the parameter, which
  //returns a response json we assert it as OrganizationViewModel
  //Change the state of  organizationData to newly obtained data

  if (isLoading) {
    return <div className="p-10">Is Loading....</div>;
  } else {
    return (
      <>
        <div className="flex flex-col py-4">
          <div>
            <h1 className="text-2xl font-bold">Contact Details</h1>
          </div>
          <div>Name: {organizationData.name}</div>
          <div>Description: {organizationData.description}</div>
          <div>
            <button
              type="button"
              className="border mt-4 p-2 rounded-md bg-gray-400 hover:bg-gray-700 text-white"
              onClick={() => {
                navigate(`${routes.ORGANIZATIONS}`);
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
