import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { getLocalItem } from '../helpers/storage';
import { LOCAL_STORAGE } from '../contants/LocalStorage';
import { PATH } from '../contants/Path';
import { AuthenticatedRoute, UnauthenticatedRoute } from '../components/RestrictedRoutes/ProtectedRoute';
import React from 'react';
import BrandManagement from '../pages/BrandManagement/BrandManagement';

const CommonLayout = React.lazy(() => import('../components/CommonLayout/CommonLayout'));
const HomePage = React.lazy(() => import('../pages/Home/Home'));
const LoginPage = React.lazy(() => import('../pages/Login/Login'));
const UserManagementPage = React.lazy(() => import('../pages/UserManagement/UserManagement'));
const BrandManagementPage = React.lazy(() => import('../pages/BrandManagement/BrandManagement'));
const BrandCreateManagementPage = React.lazy(() => import('../pages/BrandManagement/BrandCreateManagement/BrandCreateManagement'));
const CategoryManagementPage = React.lazy(() => import('../pages/CategoryManagement/CategoryManagement'));
const ProductManagementPage = React.lazy(() => import('../pages/ProductManagement/ProductManagement'));

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
                        <Route path={PATH.BRAND} element={<BrandManagementPage />} />
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.BRAND_CREATE} element={<BrandCreateManagementPage />} />
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.CATEGORY} element={<CategoryManagementPage />} />
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.PRODUCT} element={<ProductManagementPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;