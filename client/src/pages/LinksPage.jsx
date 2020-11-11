import React, { useCallback, useContext, useEffect, useState } from 'react';
import { LinksList } from '../components/LinksList';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
export const LinksPage = () =>{
    const [links, setLinks] = useState([]);
    const {loading,request} = useHttp();
    const {token} = useContext(AuthContext);
    const getLinks = useCallback(async () =>{
        try{const data = await request('/api/link/','GET',null,{Authorization: `Bearer ${token}` });
        setLinks(data);}
        catch(error){

        }
    },[token,request])
    useEffect(()=>{
        getLinks();
    },[getLinks]);
    if(loading){
        return <Loader/>
    }
    return <div>
        {!loading && links && <LinksList links={links}/>}
    </div>
}