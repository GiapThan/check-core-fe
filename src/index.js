import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

export const UserContext = createContext();
const initSate = {
  mssv: '',
  name: '',
  stars: {},
  accessToken: '',
  role: '',
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContext.Provider value={initSate}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContext.Provider>,
);
