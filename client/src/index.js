import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/userStore";
import RequestStore from "./store/requestStore";
import TeamsStore from "./store/teamsStore";



export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        request: new RequestStore(),
        teams:  new TeamsStore()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);

