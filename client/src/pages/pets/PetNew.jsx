import React from 'react';
import PetForm from '../../components/PetForm';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const PetNew = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        type: '',
        description: '',
        skill1: '',
        skill2: '',
        skill3: ''
    };

    const createPet = async (requestParams) => {
        await axios.post(`${process.env.REACT_APP_API_URL}/pet`, requestParams)
            .then(navigate('/'))
            .catch(e => {
                console.log(e);
            })
    };

    return (
        <>
            <div className='row m-2'>
                <div className='col-md-10'>
                    <span className='page-subtitle'>Know a pet needing a home?</span>
                </div>
                <div className='col-md-2'>
                    <Link to={'/'} className='page-link  '><FontAwesomeIcon icon={solid('house')} /> Home</Link>
                </div>
                <div className='col-md-12'>
                    <PetForm
                        initialValues={initialValues}
                        funcAction={createPet}
                        newPet={true}
                    />
                </div>
            </div>
        </>
    );
}

export default PetNew;
