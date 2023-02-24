import React from 'react';
import { Outlet } from 'react-router-dom';
import PageContainer from '../containers/PageContainer';
import PageHeader from './PageHeader';

const Layout = () => {
    return (
        <PageContainer>
            <PageHeader />
            <Outlet />
        </PageContainer>
    );
}

export default Layout;
