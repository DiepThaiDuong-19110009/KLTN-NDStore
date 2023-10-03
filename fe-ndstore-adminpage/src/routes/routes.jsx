import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { getLocalItem } from '../helpers/storage';
import { LOCAL_STORAGE } from '../contants/LocalStorage';
import { PATH } from '../contants/Path';
import { AuthenticatedRoute, UnauthenticatedRoute } from '../components/RestrictedRoutes/ProtectedRoute';
import React from 'react';

const CommonLayout = React.lazy(() => import('../components/CommonLayout/CommonLayout'));
const HomePage = React.lazy(() => import('../pages/Home/Home'));
const LoginPage = React.lazy(() => import('../pages/Login/Login'));
const UserManagementPage = React.lazy(() => import('../pages/UserManagement/UserManagement'));
const CategoryManagementPage = React.lazy(() => import('../pages/CategoryManagement/CategoryManagement'));

const AppRoutes = () => {
    const isAuthenticated = getLocalItem(LOCAL_STORAGE.ACCESS_TOKEN);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route index element={<Navigate to={isAuthenticated ? PATH.HOME : PATH.LOGIN} replace />} />
                    {/* Un-authenticated routes */}
                    <Route element={<UnauthenticatedRoute />}>
                        <Route path={PATH.LOGIN} element={<LoginPage />} />
                    </Route>

                    {/* Authenticated routes */}
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.HOME} element={<HomePage />} />
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.USER} element={<UserManagementPage />} />
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.CATEGORY} element={<CategoryManagementPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;