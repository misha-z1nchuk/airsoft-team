import React, {useContext, useEffect} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

function App() {
    const {store} = useContext(Context);

    useEffect(() => {
        if(localStorage.getItem('token')){
            store.checkAuth()
        }
    }, [])

    if (store.isLoading){
        return <div>Loading...</div>
    }

    if (!store.isAuth){
        return (
            <LoginForm/>
        )
    }

    return (
    <div className="App">
        <h1>{store.isAuth ? `User authorized ${store.user.email}` : `Authorize pls`}</h1>
        <h1>{store.user.isActivated ? 'Account activated' : "Activate your account pls"}</h1>
        <button onClick={() => store.logout()}>Log out</button>
    </div>
);
}

export default observer(App);
