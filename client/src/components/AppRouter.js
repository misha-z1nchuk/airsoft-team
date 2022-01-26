import React, {useContext} from 'react';

import {Routes, Route } from 'react-router-dom';

import {adminRoutes, authRoutes, managerRoutes, playerRoutes, publicRoutes} from "../routes";
import NotFound from "../pages/NotFound";
import {Context} from "../index";
import Roles from "../utils/enums";

const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <div>
            <main>
                <Routes>
                    {user.user.roleId === Roles.PLAYER && playerRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component/>} exact/>
                    )}

                    {user.user.roleId === Roles.MANAGER && managerRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component/>} exact/>
                    )}

                    {user.user.roleId === Roles.ADMIN && adminRoutes.map(({path, Component}) =>
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