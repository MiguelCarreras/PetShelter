import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import io from 'socket.io-client';

const PetList = () => {
    const navigate = useNavigate();

    const [pets, setPets] = useState([]);

    const thereArePets = pets.length !== 0;

    const getPets = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/pets`)
            .then((response) => {
                setPets(response.data);
            }).catch(e => console.log(e));
    }

    // Only didMount
    useEffect(() => {
        getPets();
    }, []);

    // DidMount, DidUpdate(Only when change pets state) and WillUnmount
    useEffect(() => {
        const socket = io.connect(`${process.env.DOMAIN}`);
        socket.on('pet-created', (pet) => {
            setPets([...pets, pet]);
        });

        socket.on('pet-updated', (petUpdated) => {
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

    // Table body content according pets quantity
    let tBodyContent;
    if (thereArePets) {
        tBodyContent = pets.map((pet, index) => <tr key={pet._id}
            onClick={() => navigate(`/pets/${pet._id}`)}>
            <td>{pet.name}</td>
            <td>{pet.type}</td>
            <td onClick={(e) => e.stopPropagation()}
                className="text-center">
                <Link to={`/pets/${pet._id}/edit`} title='Edit'>
                    <FontAwesomeIcon icon={solid('pen-to-square')} />
                </Link>
            </td>
        </tr>)
    } else {
        tBodyContent = <tr>
            <td colSpan={3} >
                There aren't pets looking for a good home!!
            </td>
        </tr>
    }

    return (
        <>
            <div className='row m-2'>
                <div className='col-md-10'>
                    <span className='page-subtitle'>These pets are looking for a good home</span>
                </div>
                <div className='col-md-2'>
                    <Link to={'/pets/new'}
                        className='page-link'>
                        <FontAwesomeIcon icon={solid('clipboard')} /> Add Pet
                    </Link>
                </div>
                <div className={`table-responsive card ${thereArePets ? 'table-scroll' : ''}`}>
                    <table className='table table-hover table-borderedless'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tBodyContent}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default PetList;
