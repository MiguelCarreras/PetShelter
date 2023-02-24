import React from 'react';

const PageContainer = ({children}) => {
    return (
        <div className='container-fluid'>
            {children}
        </div>
    );
}

export default PageContainer;
