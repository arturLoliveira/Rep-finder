import React from 'react';
import Image from "../images/Vector.svg"
import '../styles/pages/success-page.css';
import { Link } from 'react-router-dom';


export default function SuccessLogout() {
    return (
    <main className="success-main">
        <div className="content">
            <h2>Logout realizado com sucesso!!</h2>
            <Link to="/app" className="GoBackToMap">
            <button>Voltar para o mapa</button>
            </Link>
        </div>
        
    </main>
    );
}