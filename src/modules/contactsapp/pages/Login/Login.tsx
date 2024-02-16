/* eslint-disable prettier/prettier */
import { Outlet } from 'react-router-dom';

import { PageContent, PageHeading } from '@components/Page/Page';

export const LoginPage = () => {
    return (
        <>
            <PageHeading>Login Page</PageHeading>

            <PageContent>
                <Outlet />
            </PageContent>
        </>
    );
};
