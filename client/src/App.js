import React, {useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";




function App() {
    const {user} = useContext(Context);

    useEffect(() => {
        if(localStorage.getItem('token')){
            user.checkAuth()
        }
    }, [])

    if (user.isLoading){
        return <div>Loading...</div>
    }


    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
            {/*<button onClick={() => doSmth()}>Log out</button>*/}
            {/*<h1>{store.isAuth ? `User authorized ${store.user.email}` : `Authorize pls`}</h1>*/}
            {/*<h1>{store.user.isActivated ? 'Account activated' : "Activate your account pls"}</h1>*/}
            {/*<button onClick={() => store.logout()}>Log out</button>*/}
            {/*<EventListening/>*/}
            {/*<ReactNotification/>*/}
        </BrowserRouter>
    )}

export default observer(App);
