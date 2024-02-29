/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Pagination,
  Table,
  TableContainer,
  TableDataCenter,
  TableDataLeft,
  TableDataRight,
  TableHeaderCenter,
  TableHeaderLeft,
  TableHeaderRight,
  TableSearchHead,
} from '@components/Table';
import { routes } from '@config/routes';
import {
  ContactTableViewModel,
  contactTableDefaultValue,
} from '@models/Contact';
import { ContactServices } from '@services/Contact';
import { getNextPage, getPreviousPage } from '@utils/pagination';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const ContactList: React.FC = () => {
  const navigate = useNavigate();
  const [dataUrlQueryPage, setDataUrlQueryPage] = useState(DEFAULT_PAGE);
  const [dataUrlQuerySearch, setDataUrlQuerySearch] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contactListData, setContactListData] = useState<ContactTableViewModel>(
    contactTableDefaultValue
  );
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  useEffect(() => {
    loadContactListData();
  }, [dataUrlQueryPage, dataUrlQuerySearch]);

  const loadContactListData = () => {
    ContactServices.getList(
      dataUrlQueryPage,
      DEFAULT_PAGE_SIZE,
      dataUrlQuerySearch
    )
      .then((response) => response.json() as Promise<ContactTableViewModel>)
      .then((data) => {
        setContactListData(data);
        setIsLoading(false);
      });
  };

  const updateDataUrlSearchString = (search: string) => {
    setDataUrlQuerySearch(search);
  };

  const nextPage = () => {
    const nextPage = getNextPage(
      contactListData.page,
      contactListData.totalPages
    );
    setDataUrlQueryPage(nextPage);
  };

  const previousPage = () => {
    const prevPage = getPreviousPage(contactListData.page);
    setDataUrlQueryPage(prevPage);
  };

  const handleDelete = (id: number) => {
    ContactServices.delete(id).then((response) => {
      if (response.status == 204) {
        alert('Successfully Deleted');
        loadContactListData();
      }
    });
  };

  const toggleViewMode = () => {
      setViewMode((prevMode) => (prevMode === 'list' ? 'grid' : 'list'));
  };

  if (isLoading) {
    return <div className="p-10">Is Loading....</div>;
  } else {
    return (
        <>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
                    onClick={toggleViewMode}
                >
                    {viewMode === 'list' ? 'Grid View' : 'List View'}
                </button>
            </div>
        <TableSearchHead
          loadData={loadContactListData}
          setSearchString={updateDataUrlSearchString}
          createRoute={`${routes.CONTACTS}/create`}
         />

            {viewMode === 'list' ? (
                <TableContainer>
                <Table>
                    <thead className="bg-white">
                        <tr>
                            <TableHeaderLeft>Name</TableHeaderLeft>
                            <TableHeaderCenter>Email</TableHeaderCenter>
                            <TableHeaderCenter>Phone</TableHeaderCenter>
                            <TableHeaderRight></TableHeaderRight>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {contactListData.data.map((row, index) => (
                            <tr
                                key={row.id}
                                className={index % 2 === 0 ? undefined : 'bg-gray-50'}
                            >
                                <TableDataLeft>
                                    {row.firstname} {row.lastname}
                                </TableDataLeft>
                                <TableDataCenter>{row.email}</TableDataCenter>
                                <TableDataCenter>{row.phone}</TableDataCenter>
                                <TableDataRight>
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
                                </TableDataRight>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>
            ) : (
                    <div className="grid grid-cols-3 gap-4 my-4">
                        {contactListData.data.map((row) => (
                            <div key={row.id} onClick={() => {
                            navigate(`${routes.CONTACTS}/${row.id}`);
                                        }} className="border p-4 rounded hover:bg-red-700 bg-red-200 ">
                                <h2 className="text-lg font-semibold">
                                    {row.firstname} {row.lastname}
                                </h2>
                                <p>{row.email}</p>
                                <p>{row.phone}</p>

                            </div>
                        ))}
                    </div>
                )
       }

        <Pagination
          page={contactListData.page}
          pageSize={contactListData.pageSize}
          total={contactListData.total}
          onPrevious={() =>
            contactListData.page > 0 ? previousPage() : undefined
          }
          onNext={() =>
            contactListData.page < contactListData.totalPages
              ? nextPage()
              : undefined
          }
        />
      </>
    );
  }
};
