import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
export const CreatePage = () =>{
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [link,setLink] = useState('');
    useEffect(()=>{
        window.M.updateTextFields();
    })
    const changeHandler = event =>{
        setLink(event.target.value);
    }
    const pressHandler = async event =>{
        if(event.key === 'Enter'){
            try {
                const data = await request('/api/link/generate','POST',{from: link},{Authorization: `Bearer ${auth.token}`});
                console.log(data);
                history.push(`/details/${data.link._id}`)
            } catch (error) {
                
            }
        }
    }
    return <div className='row'>
        <div className="col s8 offset-s2">
            <div className="input-field">
                <input placeholder='Insert link' id='link' type='text' value={link} 
                onChange={changeHandler} onKeyPress={pressHandler}/>
                <label htmlFor='link'>Insert link</label>
            </div>
        </div>
        CreatePage
    </div>
}