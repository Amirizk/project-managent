
import {Redirect, useHistory} from 'react-router-dom';
import React from 'react';
import SignIn from './Sign_In';
import {useContext} from 'react';
import {UserContext} from './UserContext';
export default function Logout(){
    const { user, setUser } = useContext(UserContext);

    const history = useHistory();


     setUser("");
    localStorage.clear();

    history.push('/');


return (

    <Redirect to='/login'>
       
    </Redirect>
)




}

















