/* eslint-disable prettier/prettier */
import { Outlet } from 'react-router-dom';

import { PageContent, PageHeading } from '@components/Page/Page';

export const Contact = () => {
  return (
    <>
          <PageHeading>
              Contact Page
          </PageHeading>


      <PageContent>
        <Outlet />
      </PageContent>
    </>
  );
};
