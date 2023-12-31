import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Verify from '../pages/Verify/Verify';
import Home from '../pages/Home/Home';
import UserDetail from '../pages/UserDetail/UserDetail';
import OrderHistory from '../pages/OrderHistory/OrderHistory';
import Product from '../pages/Product/Product';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Cart from '../pages/Cart/Cart';
import Payment from '../pages/Payment/Payment';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import AuthGoogle from '../pages/AuthGoogle/AuthGoogle';
import CheckOut from '../pages/Payment/CheckOut/CheckOut';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ResetPassword from '../pages/ResetPassword/ResetPassword';

const ClientRouter = () => {
  return (
    <>
      <main className='py-0'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/oauth2/redirect' element={<AuthGoogle />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user-detail' element={<UserDetail />} />
          <Route path='/verify/:type/:email' element={<Verify />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:id/:token' element={<ResetPassword />}/>
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/product' element={<Product />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/checkout/order/payment' element={<CheckOut />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default ClientRouter;
