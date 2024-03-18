import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

import logoImg from '../images/Logo.svg';



function Landing() {
    return(
        <div id="page-landing">
            <div className="content-wrapper">
                <img src="" alt="Finder"/>

            <main>
                <h1>Encontre uma república.</h1>
                <p>Venha viver os melhores anos da sua vida.</p>
            </main>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
                </Link>
            </div>
        </div>
    );
}

export default Landing;