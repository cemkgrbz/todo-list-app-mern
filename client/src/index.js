import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ContextProvider from './components/Context';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <BrowserRouter>
        <Routes>

          <Route element={<Login />} path='/'/>
          <Route element={<Register />} path='/register'/>

          <Route element={<App />} path='/todo-list'/>
          
        </Routes>
    </BrowserRouter>
  </ContextProvider>
);

