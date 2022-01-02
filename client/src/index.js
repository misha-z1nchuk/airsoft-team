import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./store/store";
import {BrowserRouter as Router} from "react-router-dom";


const store = new Store()

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        user: new Store()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);

