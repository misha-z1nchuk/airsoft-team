import Login from "./pages/Login";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SERVICE_ROUTE} from "./utils/consts";
import Main from "./pages/Main";
import Registration from "./pages/Registration";

export const authRoutes = [
    {
        path: SERVICE_ROUTE,
        Component: Main
    },
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
]