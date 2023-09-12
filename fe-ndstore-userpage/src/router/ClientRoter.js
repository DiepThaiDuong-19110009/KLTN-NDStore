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

const ClientRouter = () => {
  return (
    <>
      <main className='py-0'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user-detail' element={<UserDetail />} />
          <Route path='/verify/:email' element={<Verify />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/product' element={<Product />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </main>
    </>
  );
}

export default ClientRouter;
