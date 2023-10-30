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
const BrandManagementPage = React.lazy(() => import('../pages/BrandManagement/BrandManagement'));
const BrandCreateManagementPage = React.lazy(() => import('../pages/BrandManagement/BrandCreateManagement/BrandCreateManagement'));
const BrandEditManagementPage = React.lazy(() => import('../pages/BrandManagement/BrandEditManagement/BrandEditManagement'));
const CategoryManagementPage = React.lazy(() => import('../pages/CategoryManagement/CategoryManagement'));
const CategoryCreateManagementPage = React.lazy(() => import('../pages/CategoryManagement/CategoryCreateManagement/CategoryCreateManagement'));
const CategoryEditManagementPage = React.lazy(() => import('../pages/CategoryManagement/CategoryEditManagement/CategoryEditManagement'));
const ProductManagementPage = React.lazy(() => import('../pages/ProductManagement/ProductManagement'));
const ProductCreateManagement = React.lazy(() => import('../pages/ProductManagement/ProductCreateManagement/ProductCreateManagement'))
const ProductEditManagement = React.lazy(() => import('../pages/ProductManagement/ProductEditManagement/ProductEditManagement'))
const OrderManagementPage = React.lazy(() => import('../pages/OrderManagement/OrderManagement'));
const StatisticManagement = React.lazy(() => import('../pages/StatisticMangement/StatisticManagement'));

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
                    {/* Brand */}
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.BRAND} element={<BrandManagementPage />} />
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.BRAND_CREATE} element={<BrandCreateManagementPage />} />
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.BRAND_EDIT} element={<BrandEditManagementPage />} />
                    </Route>
                    {/* Category */}
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.CATEGORY} element={<CategoryManagementPage />} />
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.CATEGORY_CREATE} element={<CategoryCreateManagementPage />} />
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.CATEGORY_EDIT} element={<CategoryEditManagementPage />} />
                    </Route>
                    {/* Product */}
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.PRODUCT} element={<ProductManagementPage />} />
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.PRODUCT_CREATE} element={<ProductCreateManagement />} />
                    </Route>
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.PRODUCT_EDIT} element={<ProductEditManagement />} />
                    </Route>
                    {/* Order */}
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.ORDER} element={<OrderManagementPage />} />
                    </Route>
                    {/* Statistic */}
                    <Route element={<AuthenticatedRoute />}>
                        <Route path={PATH.STATISTIC} element={<StatisticManagement />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;