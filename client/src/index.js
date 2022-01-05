import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/userStore";
import {BrowserRouter as Router} from "react-router-dom";
import RequestStore from "./store/requestStore";



export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        request: new RequestStore()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);

