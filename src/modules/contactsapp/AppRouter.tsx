/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { createHashRouter } from 'react-router-dom';

import App from './App';
import {
  Contact,
  ContactCreate,
  ContactDetails,
  ContactEdit,
  ContactList,
} from './pages/Contact';
import { Home } from './pages/Home';
import { Tax, TaxCalculation } from './pages/Tax';

import { routes } from '@config/routes';
import { LoginPage, SignUp, UserLogin } from './pages/Login';
import { Customer } from './pages/Customer/Customer';
import { CustomerCreate } from './pages/Customer/CustomerCreate';
import { CustomerList } from './pages/Customer/CustomerList';
import { ContextDemo } from './pages/ContextDemo/Context';

export const AppRouter = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: `${routes.CONTACTS}`,
        element: <Contact />,
        children: [
          { index: true, element: <ContactList /> },
          { path: `create`, element: <ContactCreate /> },
          { path: `:id`, element: <ContactDetails /> },
          { path: `:id/edit`, element: <ContactEdit /> },
        ],
      },
      { path: 'context-demo', element: <ContextDemo /> },
      {
        path: `${routes.TAXES}`,
        element: <Tax />,
        children: [{ index: true, element: <TaxCalculation /> }],
      },
      {
        path: `${routes.LOGIN}`,
        element: <LoginPage />,
        children: [{ index: true, element: <UserLogin /> }],
      },

      {
        path: `signup`,
        element: <SignUp />,
      },

      {
        path: `customers`,
        element: <Customer />,
        children: [
          { index: true, element: <CustomerList /> },
          { path: 'create', element: <CustomerCreate /> },
        ],
      },
    ],
  },
]);
