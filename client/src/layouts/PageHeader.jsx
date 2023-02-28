import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { useNavigate } from 'react-router-dom';

const PageHeader = () => {
    const navigate = useNavigate();
    
    const goToHome = () => {
        navigate('/');
    }
    
    return (
        <div className='row page-header'>
            <div className='col-md-10 pull-left'>
                <span className='page-header-icon' onClick={goToHome}>
                    <FontAwesomeIcon icon={solid('otter')} />
                </span>
                <span className='page-header-title' onClick={goToHome}> Pet Shelter</span>
            </div>
        </div>
    );
}

export default PageHeader;
