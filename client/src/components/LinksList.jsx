import React from 'react';
import { Link } from 'react-router-dom';
export const LinksList = ({links}) =>{
    if(!links.length){
        return <p>You have no links</p>
    }
    return <table>
        <thead>
            <tr>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
                <th>Clicks</th>
            </tr>
        </thead>
        <tbody>
            {links.map((el, index)=><tr key={index}>
                <th>{el.from}</th>
                <th>{el.to}</th>
                <th>{el.date}</th>
                <th>{el.clicks}</th>
                <th><Link to={`/details/${el._id}`}>Open details</Link></th>
            </tr>)}
        </tbody>
    </table>

}