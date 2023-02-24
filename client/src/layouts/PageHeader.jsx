import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const PageHeader = ({ goToHome }) => {
    return (
        <div className='row page-header'>
            <div className='col-md-10 pull-left'>
                <span className='page-header-icon'>
                    <FontAwesomeIcon icon={solid('otter')} />
                </span>
                <span className='page-header-title'> Pet Shelter</span>
            </div>
        </div>
    );
}

export default PageHeader;
