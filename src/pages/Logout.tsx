import React from 'react';
import { useAuth } from '../services/AuthServices';
import { FiLogOut } from 'react-icons/fi';

import '../styles/pages/logout.css';
import { Link, useHistory } from 'react-router-dom';
import { Popup } from 'react-leaflet';

const LogoutButton: React.FC = () => {
    const history = useHistory();
    const auth = useAuth();

    return <button className='logout' onClick={() =>  {
        auth.logout() 
        history.push('/successLogout');


        }}>
        <FiLogOut></FiLogOut>
        </button>;
};

export default LogoutButton;
