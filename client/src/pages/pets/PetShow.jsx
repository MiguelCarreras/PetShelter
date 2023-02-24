import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

const PetShow = () => {

    const { id } = useParams();
    const [pet, setPet] = useState({});
    const navigate = useNavigate();

    const getPet = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/pet/${id}`)
            .then((response) => {
                setPet(response.data);
                console.log(pet);
            }).catch(e => console.log(e));

    }

    const adoptPet = async () => {
        await axios.put(`${process.env.REACT_APP_API_URL}/pet/${id}`, { wasAdopted: true })
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
                <div className='col-md-9'>
                    <span className='page-subtitle'>Details about: {pet.name}</span>
                </div>
                <div className='col-md-3 row'>

                    <div className='col-md-6'>
                        <button type='button' className='btn btn-outline-danger' onClick={adoptPet} title='Adopt'><FontAwesomeIcon icon={regular('heart')} /> {pet.name}</button>
                    </div>
                    <div className='col-md-6'>
                        <Link to={'/'} className='page-link'><FontAwesomeIcon icon={solid('house')} /> Home</Link>
                    </div>
                </div>
            </div>

            <div className='col-md-12'>
                    <div className='card form-container'>
                        <div className='card-body'>
                            <div className='form-group row mb-5'>
                                <h4 className='label control-label col-md-3'>Pet Type:</h4>
                                <div className='col-md-9'>
                                    <h4>{pet.type}</h4>
                                </div>
                            </div>
                            <div className='form-group row mb-5'>
                                <h4 className='label control-label col-md-3'>Description:</h4>
                                <div className='col-md-9'>
                                    <h4>{pet.description}</h4>
                                </div>
                            </div>
                            <div className='form-group row'>
                                <h4 className='label control-label col-md-3'>Skills:</h4>
                                <div className='col-md-9'>
                                    <h4>{pet.skill1}</h4>
                                    <h4>{pet.skill2}</h4>
                                    <h4>{pet.skill3}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


        </>
    );
}

export default PetShow;
