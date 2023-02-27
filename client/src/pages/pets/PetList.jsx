import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import io from 'socket.io-client';
    
const PetList = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);

    const getPets = async () => {
        console.log('getPets')
        await axios.get(`${process.env.REACT_APP_API_URL}/pets`)
            .then((response) => {
                setPets(response.data);
            }).catch(e => console.log(e));
    }

    useEffect(() => {
        getPets();
    }, []);

    useEffect(() => {
        const socket = io.connect('192.168.0.7:8000');
        socket.on('pet-created', (pet) => {
            setPets([...pets, pet]);
        });

        socket.on('pet-updated', (petUpdated) => {
            debugger;
            const updatedPets = pets.map((pet, index) => {
               return pet._id === petUpdated._id ? petUpdated : pet;
            });
            setPets(updatedPets);
        });

        socket.on('pet-adopted', (petAdopted) => {
            setPets(pets.filter(pet => 
                pet._id !== petAdopted._id
            ));
        });

        return () => {
            socket.disconnect();
        };
    }, [pets]);

    return (
        <>
            <div className='row m-2'>
                <div className='col-md-10'>
                    <span className='page-subtitle'>These pets are looking for a good home</span>
                </div>
                <div className='col-md-2'>
                    <Link to={'/pets/new'} className='page-link  '><FontAwesomeIcon icon={solid('clipboard')} /> Add Pet</Link>
                </div>
                <div className='table-responsive card'>
                    <table className='table table-hover table-borderedless'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map((pet, index) => <tr key={pet._id} onClick={() => navigate(`/pets/${pet._id}`)}>
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <td onClick={(e) => e.stopPropagation() } className="text-center">
                                    <Link to={`/pets/${pet._id}/edit`} title='Edit'><FontAwesomeIcon icon={solid('pen-to-square')} /></Link>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default PetList;
