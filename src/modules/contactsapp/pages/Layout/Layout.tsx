/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import { routes } from '@config/routes';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion } from '../../../../core/components/Accordion/Accordion';




function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}


export const Layout: React.FC = ({ children }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);





    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-sky-900 py-8">
                <h1 className="text-4xl text-center text-yellow-100">Contact App v0.2.8</h1>
            </header>

            <main className="flex flex-grow">
           
                <aside className="bg-white text-blue-900 w-1/5 py-8 px-4">
                    <ul className="space-y-4">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex w-full hover:bg-sky-200 justify-center gap-x-1.5 rounded-full bg-white px-7 py-2 text-md font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300">
                                    + Create New
                                </Menu.Button>
                                
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute shadow-2xl left-20 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a onClick={() => navigate(routes.CUSTOMERS)}
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Customer
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Vendor
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Transaction
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <form method="POST" action="#">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        type="submit"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block w-full px-4 py-2 text-left text-sm'
                                                        )}
                                                    >
                                                        Sign out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </form>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <li>
                            <button
                                className="block text-left w-full py-2 px-2 rounded hover:bg-blue-200"
                                onClick={() => navigate(routes.HOME)}
                            >
                                Home
                            </button>
                        </li>
                        <li>
                            <button
                                className="block text-left w-full py-2 px-2 rounded hover:bg-blue-200"
                                onClick={() => navigate(routes.CONTACTS)}
                            >
                                Contacts
                            </button>
                        </li>
                        <li>
                            <button
                                className="block text-left w-full py-2 px-2 rounded hover:bg-blue-200"
                                onClick={() => navigate(routes.TAXES)}
                            >
                               Taxes
                            </button>
                        </li>
                        <li>
                            <button
                                className="block text-left w-full py-2 px-2 rounded"
                            >
                                <Accordion name="Accounting">
                                    <div>
                                        <button
                                            className="block text-left w-full py-2 px-2 rounded hover:bg-blue-200"
                                            onClick={() => navigate(routes.TAXES)}
                                        >
                                            Taxes 1
                                        </button>
                                        <button
                                            className="block text-left w-full py-2 px-2 rounded hover:bg-blue-200"
                                            onClick={() => navigate(routes.TAXES)}
                                        >
                                            Taxes 2
                                        </button>
                                        <button
                                            className="block text-left w-full py-2 px-2 rounded hover:bg-blue-200"
                                            onClick={() => navigate(routes.TAXES)}
                                        >
                                            Taxes 3
                                        </button>
                                    </div>
                                </Accordion>
                            </button>
                        </li>
                    </ul>
                </aside>

              
                <section className="w-3/4 bg-slate-200 p-4">
                    {children}
                </section>
            </main>
        </div>
    );
};

