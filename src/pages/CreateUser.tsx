import { useHistory } from "react-router-dom";
import React, { FormEvent, useState } from "react"
import api from "../services/api";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function CreateUser() {
    const history = useHistory();

    const [name, setNameUser] = useState('');
    const [email, setEmailUser] = useState('');
    const [password, setPasswordUser] = useState('');

    console.log(name, email, password);

    async function handleSubmitUser(event: FormEvent) {
        event.preventDefault();

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('password', password);


        await api.post('/users', { name, email, password });
        history.push('/success');
    }

    return (
        <div id="page-create-republica">
            <Sidebar />

            <main>
                <form onSubmit={handleSubmitUser} className="create-republica-form">
                    <fieldset>
                        <legend>Criar Usuario</legend>



                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                value={name}
                                onChange={event => setNameUser(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={event => setEmailUser(event.target.value)}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={event => setPasswordUser(event.target.value)}
                            />
                        </div>
                    </fieldset>


                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    )

}