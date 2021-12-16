import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

const LoginForm: FC = () => {
    const [first_name, setFirstName] = useState('Misha');
    const [last_name, setLastName] = useState('Ziref');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('PLAYER');
    const {store} = useContext(Context)

    return (
        <div>
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="text"
                placeholder="Password"
            />

            <button onClick={() => store.login(email, password)}>login</button>
            <button onClick={() => store.registration(first_name,last_name, email, password, role)}>registration</button>
            <a target="_blank"  href="http://localhost:5000/api/user/auth/google"><button onClick={() => store.googleAuth()}>Google</button></a>
        </div>
    );
};


export default observer(LoginForm);