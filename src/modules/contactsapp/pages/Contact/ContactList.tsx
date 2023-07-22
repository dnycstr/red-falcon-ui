import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@config/routes';
import { ContactTableViewModel } from '@models/Contact';
import { ContactServices } from '@services/Contact';

const initialContacts: ContactTableViewModel = {
  contacts: [],
};

export const ContactList: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contactListData, setContactListData] =
    useState<ContactTableViewModel>(initialContacts);

  useEffect(() => {
    loadContactListData();
  }, []);

  const loadContactListData = () => {
    ContactServices.getList()
      .then((response) => response.json() as Promise<ContactTableViewModel>)
      .then((data) => {
        setContactListData(data);
        console.log(data);
        setIsLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    ContactServices.delete(id).then((response) => {
      if (response.status == 204) {
        alert('Successfully Deleted');
        loadContactListData();
      }
    });
  };

  if (isLoading) {
    return <div className="p-10">Is Loading....</div>;
  } else {
    return (
      <>
        <div className="p-10">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              navigate(`${routes.CONTACTS}/create`);
            }}
          >
            Create
          </button>
        </div>
        <div className="flex flex-col p-10">
          <table>
            <tr>
              <td>Name </td>
              <td>Email </td>
              <td>Phone </td>
              <td> </td>
            </tr>
            {contactListData.contacts.map((row, index) => (
              <tr key={index}>
                <td>
                  {row.firstname} {row.lastname}
                </td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      navigate(`${routes.CONTACTS}/${row.id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      navigate(`${routes.CONTACTS}/${row.id}/edit`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      handleDelete(row.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </>
    );
  }
};
