import React, {useContext, useEffect} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import ReactNotification from 'react-notifications-component'
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import Notifications from "./components/Notifications";




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
            <Notifications/>
            <ReactNotification/>

        </BrowserRouter>
    )}
export default observer(App);
