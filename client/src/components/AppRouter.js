import React, {useContext} from 'react';

import {Routes, Route } from 'react-router-dom';

import {authRoutes, publicRoutes} from "../routes";
import NotFound from "../pages/NotFound";
import {Context} from "../index";
import PlayerMenu from "../pages/PlayerMenu";
import TeamsMenu from "../pages/TeamsMenu";

const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <div>
            <main>
                <Routes>
                    { (user.user.roleId === 1) ?
                        <>
                            <Route key={'player-menu'} path={"player-menu"} element={<PlayerMenu />}/>
                            <Route key={'teams-menu'} path={"teams-menu"} element={<TeamsMenu />}/>

                        </>


                        :
                        <></>
                    }

                    }
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