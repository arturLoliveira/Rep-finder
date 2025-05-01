import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import '../styles/pages/login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';



export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, "Users", user.uid);
      const userDoc = await getDoc(userRef);
      

      
        const role = userDoc.data()?.role;
        console.log(userDoc.data())
        if (role === "admin") {
          navigate("/app");
        } else if (role === "user") {
          navigate("/");
        } else {
          setError("Papel do usuário não reconhecido.");
        }
      

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Credenciais inválidas. Tente novamente.");
    }
  };
  return (
    <div id="page-create-republica">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-republica-form">
          <fieldset>
            <legend>Login</legend>



            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                value={email}
                onChange={event => setEmail(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input
                type='password'
                id="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <div className="input-block">
              <span>Ainda não tem cadastro? <Link to="/users/create" className="create-login">Crie agora!</Link></span>
            </div>

          </fieldset>


          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
