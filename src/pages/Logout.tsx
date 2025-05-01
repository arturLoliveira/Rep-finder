import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import '../styles/pages/logout.css';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // ⬅️ Encerra a sessão do Firebase
      navigate('/successLogout');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <button className="logout" onClick={handleLogout} title="Sair">
      <FiLogOut size={24} color="#FFF" />
    </button>
  );
};

export default LogoutButton;
