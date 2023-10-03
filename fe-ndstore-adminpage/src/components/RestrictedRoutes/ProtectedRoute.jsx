import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "../../contants/Path";
import { LOCAL_STORAGE } from "../../contants/LocalStorage";
import { getLocalItem } from "../../helpers/storage";

export const AuthenticatedRoute = () => {
    const isAuthenticated = getLocalItem(LOCAL_STORAGE.ACCESS_TOKEN);

    if (!isAuthenticated) {
        return <Navigate to={PATH.LOGIN} replace />;
    }

    return <Outlet />;
};

export const UnauthenticatedRoute = () => {
    const isAuthenticated = getLocalItem(LOCAL_STORAGE.ACCESS_TOKEN);

    if (isAuthenticated) {
        return <Navigate to={PATH.HOME} replace />;
    }

    return <Outlet />;
};