/* eslint-disable prettier/prettier */
import React from 'react';

export interface DataInterface {
    id: number;
    firstname: string;
}

export interface ApiResponse {
    data: DataInterface[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

interface DisplayContactsProps {
    data: ApiResponse | null
}


export const DisplayContacts: React.FC<DisplayContactsProps> = ({data}) => {

    return (
        <div>
            {data?.data.map((item) => (
                <div key={item.id}>
                    {item.id} - {item.firstname}
                </div>
            ))}
        </div>
    );
};