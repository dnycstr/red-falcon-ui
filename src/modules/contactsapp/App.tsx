/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useState } from 'react'

import { CreateContact } from './demopages/CreateContact';

import { DisplayContacts , ApiResponse } from './demopages/DisplayContacts';

import { useEffect } from 'react';




const App: React.FC = () => {
    const isCompleted = () => {
        fetchDataFromApi();
    }

    const [data, setData] = useState<ApiResponse | null>(null);

    useEffect(() => {
        // Fetch data from API when the component mounts
        fetchDataFromApi();
    }, []);

    const fetchDataFromApi = async () => {
        try {
            const response = await fetch('https://localhost:5001/api/contacts?page=1&pagesize=100');
            const newData: ApiResponse = await response.json();
            setData(newData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div >
            <CreateContact isCompleted={isCompleted} />
            <DisplayContacts data={data} />
        </div>
    )
}

export default App;
