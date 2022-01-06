import React, {useContext, useEffect, useState} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import ReactNotification from 'react-notifications-component'
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import Notifications from "./components/Notifications";
import {API_URL} from "./http";
import { io } from "socket.io-client";




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
            <Notifications/>
            <ReactNotification/>

        </BrowserRouter>
    )}
export default observer(App);
