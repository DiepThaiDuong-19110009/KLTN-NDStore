import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { getLocalItem } from '../helpers/storage';
import { LOCAL_STORAGE } from '../contants/LocalStorage';
import { PATH } from '../contants/Path';
import Login from '../pages/Login/Login';

const AppRoutes = () => {
    const isAuthenticated = getLocalItem(LOCAL_STORAGE.ACCESS_TOKEN);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route index element={<Navigate to={isAuthenticated ? PATH.HOME : PATH.LOGIN} replace />} />
                </Route>
                <Route>
                    <Route path={PATH.LOGIN} element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;