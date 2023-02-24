import React, { useState, useEffect } from 'react';
import PageHeader from '../../layouts/PageHeader';
import PetForm from '../../components/PetForm';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const PetEdit = () => {

    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({});
    const navigate = useNavigate();

    const getPet = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/pet/${id}`)
        .then((response) => {
            setInitialValues(response.data);
        }).catch(e => console.log(e));
    }

    const updatePet = async (params) => {
        await axios.put(`${process.env.REACT_APP_API_URL}/pet/${id}`, params)
        .then((response) => {
            navigate('/');
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        getPet();
    }, [])

    return (
        <>
            <div className='row m-2'>
                <div className='col-md-10'>
                    <span className='page-subtitle'>Edit {initialValues.name}</span>
                </div>
                <div className='col-md-2'>
                    <Link to={'/'} className='page-link  '><FontAwesomeIcon icon={solid('house')} /> Home</Link>
                </div>
                <div className='col-md-12'>
                    <PetForm
                        initialValues={ initialValues }
                        funcAction={ updatePet }
                    />
                </div>
            </div>
        </>
    );
}

export default PetEdit;
