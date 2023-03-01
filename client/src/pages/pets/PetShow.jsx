import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { io } from 'socket.io-client';

const PetShow = () => {

    const { id } = useParams();
    
    const navigate = useNavigate();

    const [pet, setPet] = useState({});
    const [wasLiked, setWasLiked] = useState(false);
    const [socket, setSocket] = useState();

    const adoptPet = async () => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/pet/${id}`)
            .then((response) => {
                socket.emit('pet-adopt', response.data);
                navigate('/');
            }).catch(e => console.log(e));
    }

    const likePet = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/pet/${id}/like`)
            .then((response) => {
                setPet(response.data);
                setWasLiked(true);
                socket.emit('pet-like', response.data);
            }).catch(e => console.log(e));
    }

    // DidMount and didUpdate(only when change id)
    useEffect(() => {
        const getPet = async () => {
            await axios.get(`${process.env.REACT_APP_API_URL}/pet/${id}`)
                .then((response) => {
                    setPet(response.data);
                }).catch(e => console.log(e));
        }
        getPet();
    }, [id]);

    // DidMount and WillUnMount
    useEffect(() => {
        const newSocket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`);
        newSocket.on('pet-liked', (pet) => {
            setPet(pet);
        });
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <>
            <div className='row m-2'>
                <div className='col-md-9'>
                    <span className='page-subtitle'>Details about: {pet.name}</span>
                </div>
                <div className='col-md-3 row'>
                    <div className='col-md-6'>
                        <button type='button' 
                                className='btn btn-outline-danger' 
                                onClick={adoptPet} 
                                title='Adopt'>
                            <FontAwesomeIcon icon={regular('heart')} /> {pet.name}
                        </button>
                    </div>
                    <div className='col-md-6'>
                        <Link to={'/'} 
                              className='page-link'>
                            <FontAwesomeIcon icon={solid('house')} /> Home
                        </Link>
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
                        <div className='row text-center pt-5'>
                            <div className='col-md-12'>
                                <button type='button'
                                        className='btn btn-success'
                                        onClick={likePet}
                                        disabled={wasLiked}>
                                    <FontAwesomeIcon icon={solid('thumbs-up')} /> Like {pet.name}
                                </button>
                                <span className='d-inline-block' 
                                      style={{ marginLeft: '5px' }}>{pet.likes} like(s)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PetShow;