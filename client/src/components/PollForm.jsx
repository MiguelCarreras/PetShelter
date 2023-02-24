import React, { useState } from 'react';
import axios from 'axios';

const PollForm = () => {

    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');

    const onSubmitHandler = e => {
        //evitar el comportamiento por defecto de submit
        e.preventDefault();
        //hacer una petición POST para crear una nueva persona
        axios.post('http://localhost:8000/api/poll', {
            question,
            option1,
            option2
        })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Question</label><br/>
                <input type="text" onChange = {(e)=>setQuestion(e.target.value)} value={question}/>
            </p>
            <p>
                <label>Option 1</label><br/>
                <input type="text" onChange = {(e)=>setOption1(e.target.value)} value={option1}/>
            </p>
            <p>
                <label>Option 2</label><br/>
                <input type="text" onChange = {(e)=>setOption2(e.target.value)} value={option2}/>
            </p>
            <input type="submit"/>
        </form>
    );
}

export default PollForm;
