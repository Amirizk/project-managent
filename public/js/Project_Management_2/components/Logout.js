
import {Redirect, useHistory} from 'react-router-dom';
import React from 'react';
export default function Logout(){


    const history = useHistory();



    localStorage.clear();
    history.push('/');


return (

    <div></div>
)




}

















