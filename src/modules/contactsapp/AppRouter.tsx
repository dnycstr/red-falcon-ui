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

import { routes } from '@config/routes';

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
    ],
  },
]);
