import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientRouter from './router/ClientRoter';
import './style/main.css'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/*' element={<ClientRouter />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
