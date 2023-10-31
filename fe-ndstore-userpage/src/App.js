import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientRouter from './router/ClientRoter';
import './style/main.css'
import ScrollToTop from 'react-scroll-to-top';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/*' element={<ClientRouter />} />
        </Routes>
      </div>
      {
        <ScrollToTop viewBox="0 0 24 24" color='var(--main-color)'
          svgPath='M18 15l-6-6-6 6' smooth />
      }
    </BrowserRouter>
  );
}

export default App;
