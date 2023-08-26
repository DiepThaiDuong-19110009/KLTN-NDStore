import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

const ClientRouter = () => {
  return (
    <>
      <main className='py-0'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

export default ClientRouter;
