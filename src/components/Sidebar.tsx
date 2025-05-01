import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import mapMarkerImg from '../images/Local.svg';

import '../styles/components/sidebar.css';




export default function Sidebar() {
    const navigate = useNavigate();


    
    return (
        <aside className ="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
        
          <button type="button" onClick={() => navigate(-1)}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>

        </footer>
      </aside>
    );
}