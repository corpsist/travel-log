import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { createLogEntry } from './API';


function LogEntryForm({ location, onClose }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit =  async (data) => {
        //console.log(data);
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            await createLogEntry(data);
            onClose();
        } catch (error) {
            console.log(error)
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
            {error ? <h3 className='error'>{error}</h3> : null}
            <label htmlFor='apiKey'>API KEY</label>
            <input type="password" name='apiKey' required ref={register}/>
            <label htmlFor='title'>Title</label>
            <input name='title' required ref={register}/>
            <label htmlFor='description'>Description</label>
            <textarea name='description' row={3} ref={register} />
            <label htmlFor='comments'>Comments</label>
            <textarea name='comments' row={3} ref={register} />
            <label htmlFor='image'>Image</label>
            <input name='image' ref={register} />
            <label htmlFor='visitDate'>Visit Date</label>
            <input name='visitDate' type='date' ref={register} />
            <button type='submit' disabled={loading}>{loading ? 'Loading...' : 'Create Entry!'}</button>
        </form>
    );
}

export default LogEntryForm;
