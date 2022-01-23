import Login from "./pages/Login";
import {
    FORGOT_PASSWORD_ROUTE,
    LOGIN_ROUTE, PLAYER_MENU,
    REGISTRATION_ROUTE, REQUEST_MENU, RESET_PASSWORD_ROUTE,
    SERVICE_ROUTE,
    SETTINGS_ROUTE, TEAMS_MENU
} from "./utils/consts";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
import Setting from "./pages/Setting";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TeamsMenu from "./pages/TeamsMenu";
import PlayerMenu from "./pages/PlayerMenu";
import RequestMenu from "./pages/RequestMenu";

export const authRoutes = [
    {
        path: SERVICE_ROUTE,
        Component: Main
    },
    {
        path: SETTINGS_ROUTE,
        Component: Setting
    },
    {
        path: TEAMS_MENU,
        Component: TeamsMenu
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: FORGOT_PASSWORD_ROUTE,
        Component: ForgotPassword
    },
    {
        path: RESET_PASSWORD_ROUTE,
        Component: ResetPassword
    }
]

export const playerRoutes = [
    {
        path: PLAYER_MENU,
        Component: PlayerMenu
    }

]


export const managerRoutes = [
    {
        path: REQUEST_MENU,
        Component: RequestMenu
    }

]