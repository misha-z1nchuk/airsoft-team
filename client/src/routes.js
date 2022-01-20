import Login from "./pages/Login";
import {
    FORGOT_PASSWORD_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SERVICE_ROUTE,
    SETTINGS_ROUTE
} from "./utils/consts";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
import Setting from "./pages/Setting";
import ForgotPassword from "./pages/ForgotPassword";

export const authRoutes = [
    {
        path: SERVICE_ROUTE,
        Component: Main
    },
    {
        path: SETTINGS_ROUTE,
        Component: Setting
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
    }
]