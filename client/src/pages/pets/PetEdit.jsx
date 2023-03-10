import React, { useState, useEffect } from 'react';
import PetForm from '../../components/PetForm';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { io } from 'socket.io-client';

const PetEdit = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    
    const [initialValues, setInitialValues] = useState({});
    const [socket, setSocket] = useState();
    
    const getPet = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/pet/${id}`)
        .then((response) => {
            setInitialValues(response.data);
        }).catch(e => console.log(e));
    }

    const updatePet = async (params) => {
        await axios.put(`${process.env.REACT_APP_API_URL}/pet/${id}`, params)
        .then((response) => {
            socket.emit('pet-update', response.data);
            navigate('/');
        }).catch(e => console.log(e));
    }

    // DidMount and didUpdate
    useEffect(() => {
        getPet();
    });

    // DidMount and didUnMount
    useEffect(() => {
        const newSocket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`);
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <>
            <div className='row m-2'>
                <div className='col-md-10'>
                    <span className='page-subtitle'>Edit {initialValues.name}</span>
                </div>
                <div className='col-md-2'>
                    <Link to={'/'} className='page-link'>
                        <FontAwesomeIcon icon={solid('house')} /> Home
                    </Link>
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