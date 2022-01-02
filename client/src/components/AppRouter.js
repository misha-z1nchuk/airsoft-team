import React, {useContext} from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import {authRoutes, publicRoutes} from "../routes";
import Auth from "../pages/Main";
import NotFound from "../pages/NotFound";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <div>
            <main>
                <Routes>
                    {publicRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component />}/>
                    )}
                    {user.isAuth  && authRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component/>} exact/>
                    )}
                    <Route path="*" element={<NotFound/>} exact/>

                </Routes>
            </main>

        </div>

    );
};


export default AppRouter;