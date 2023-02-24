import React , { useEffect } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';

const PollList = () => {

    return (
        <div>
            <h1>Lista de Encuentas</h1>
            <Link to={'/poll/new'}>Crear</Link>
        </div>
    );
}

export default PollList;
