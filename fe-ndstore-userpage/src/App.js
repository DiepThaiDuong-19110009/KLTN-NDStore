import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientRouter from './router/ClientRoter';
import './style/main.css'
import ScrollToTop from 'react-scroll-to-top';

const App = () => {
  const [path, setPath] = useState('/')

  useEffect(() => {
    setPath(window.location.pathname)
  }, [])

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/*' element={<ClientRouter />} />
        </Routes>
      </div>
      {path !== '/login' &&
        <ScrollToTop viewBox="0 0 24 24" color='var(--main-color)'
          svgPath='M18 15l-6-6-6 6' smooth />
      }
      {path !== '/login' &&
        <div style={{position: 'fixed', bottom: '120px', right: '43px'}}>
          <i style={{fontSize: '40px', color: 'var(--main-color)', cursor: 'pointer'}} className="fab fa-facebook-messenger"></i>
        </div>
      }
    </BrowserRouter>
  );
}

export default App;
