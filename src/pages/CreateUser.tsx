import { useNavigate } from "react-router-dom";
import React, { FormEvent, useEffect, useState } from "react"

import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";

import Sidebar from "../components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function CreateUser() {
    const navigate = useNavigate();

    const [name, setNameUser] = useState('');
    const [email, setEmailUser] = useState('');
    const [password, setPasswordUser] = useState('');
    const [role, setRole] = useState<string>("user");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [user] = useAuthState(auth);


    useEffect(() => {
        const fetchRole = async () => {
          if (user) {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
    
            if (userDoc.exists()) {
              const userRole = userDoc.data()?.role;
              if (userRole === "admin") {
                setIsAdmin(true);
              }
            }
          }
        };
        fetchRole();
      }, [user]);

    async function handleSubmitUser(event: FormEvent) {
        event.preventDefault();

        if (!email || !name || !password || !role) {
            setMessage("Todos os campos são obrigatórios.");
            return;
          }
      
          if (password.length < 6) {
            setMessage("A senha deve ter pelo menos 6 caracteres.");
            return;
          }

          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
      
            await setDoc(doc(db, "Users", uid), {
              email,
              name,
              role,
            });
      
            setMessage(`Usuário criado com sucesso! ID: ${uid}`);
      
            navigate("/login")
          }catch (error) {
            console.error("Erro ao adicionar profissional:", error);
            setMessage("Erro ao adicionar profissional.");
        }
    };

    
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