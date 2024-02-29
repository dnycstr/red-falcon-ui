/* eslint-disable prettier/prettier */
import { Outlet } from 'react-router-dom';

import { PageContent, PageHeading } from '@components/Page/Page';

export const Customer = () => {
    return (
        <>
            <PageHeading>New Customer</PageHeading>
            <div>
            </div>
            <PageContent>
                <Outlet />
            </PageContent>
        </>
    );
};
