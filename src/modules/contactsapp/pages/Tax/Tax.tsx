/* eslint-disable prettier/prettier */
import { Outlet } from 'react-router-dom';

import { PageContent, PageHeading } from '@components/Page/Page';

export const Tax = () => {
    return (
        <>
            <PageHeading>Taxes Page</PageHeading>
            <PageContent>
                <Outlet />
            </PageContent>
        </>
    );
};