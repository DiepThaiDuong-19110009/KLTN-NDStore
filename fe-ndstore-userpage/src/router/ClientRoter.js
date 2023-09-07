import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Verify from '../pages/Verify/Verify';
import Home from '../pages/Home/Home';
import UserDetail from '../pages/UserDetail/UserDetail';
import OrderHistory from '../pages/OrderHistory/OrderHistory';

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
        </Routes>
      </main>
    </>
  );
}

export default ClientRouter;
