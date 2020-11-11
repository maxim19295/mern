import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
export const AuthPage = () =>{
    const message = useMessage();
    const auth = useContext(AuthContext);
    const {loading, error, request,clearError} = useHttp();
    const [form, setForm] = useState({email: '', password: ''});
    useEffect(()=>{
        message(error);
        clearError();
    },[error,message,clearError]);
    useEffect(()=>{
        window.M.updateTextFields();
    })
    const changeHandler = event =>{
        setForm({...form, [event.target.id]: event.target.value})
    }
    const registerHandler =async () =>{
        try{
            const data = await request('/api/auth/register','POST',{...form})
            message(data.message);
        }
        catch(error){

        }
    }
    const signInHandler = async () =>{
        try {
            const data = await request('/api/auth/login','POST',{...form});
            auth.login(data.token, data.userId)
        } catch (error) {
            
        }
    }
    return <div className='row'>
        <div className="col s6 offset-s3">
            <h1>Short link</h1>
            <div className="card blue darken-1">
                <div className="card-content white-text">
                     <span className="card-title">Авторизация</span>
                     <div className="input-field">
                        <input placeholder="Enter e-mail" id="email" type="email" className="yellow-input" onChange={changeHandler}/>
                        <label htmlFor="first_name">e-mail</label>
                    </div>
                    <div className="input-field">
                        <input placeholder="Enter password" id="password" type="password" className="yellow-input" onChange={changeHandler}/>
                        <label htmlFor="first_name">password</label>
                    </div>
                </div>
                <div className="card-action">
                    <button className='btn yellow darken-4' style={{marginRight: 100}} disabled={loading} onClick={signInHandler}>Sign In</button>
                    <button className='btn grey lighten-1 black-text' onClick={registerHandler} disabled={loading}>Sign Up</button>
                 </div>
            </div>
        </div>
    </div>
}