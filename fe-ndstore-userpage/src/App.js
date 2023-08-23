import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientRouter from './router/ClientRoter';
import './style/main.css'

const App = () => {
  return (
    <BrowserRouter>
      <main className='py-0'>
        <Routes>
          <Route path='/*' element={<ClientRouter />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
