import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Verify from '../pages/Verify/Verify';
import Home from '../pages/Home/Home';

const ClientRouter = () => {
  return (
    <>
      <main className='py-0'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify/:email' element={<Verify />} />
        </Routes>
      </main>
    </>
  );
}

export default ClientRouter;
