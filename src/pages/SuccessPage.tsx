import React from 'react';
import Image from "../images/Vector.svg"
import '../styles/pages/success-page.css';
import { Link } from 'react-router-dom';


export default function SuccessPage() {
    return (
    <main className="success-main">
        <div className="content">
            <h1>Ebaaa!</h1>
            <h2>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é so esperar :)</h2>
            <Link to="/app" className="GoBackToMap">
            <button>Voltar para o mapa</button>
            </Link>
        </div>
        
    </main>
    );
}