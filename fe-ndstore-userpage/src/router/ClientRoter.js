import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Login from '../pages/Login/Login';

const ClientRouter = () => {
  return (
    <>
      <main className='py-0'>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default ClientRouter;
