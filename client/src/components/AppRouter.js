import React, {useContext} from 'react';

import {Routes, Route } from 'react-router-dom';

import {authRoutes, managerRoutes, playerRoutes, publicRoutes} from "../routes";
import NotFound from "../pages/NotFound";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <div>
            <main>
                <Routes>
                    {user.user.roleId === 1 && playerRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component/>} exact/>
                    )}

                    {user.user.roleId === 2 && managerRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component/>} exact/>
                    )}


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