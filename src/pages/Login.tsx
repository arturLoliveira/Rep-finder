import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../services/AuthServices';
import Sidebar from '../components/Sidebar';
import '../styles/pages/login.css';



export default function Login() {
  const auth = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await auth.login(email, password);
    console.log(auth.login)
    history.push('/successLogin');
  }


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

