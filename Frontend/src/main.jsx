import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import './styles/main.scss';
import Navbar from './components/Navbar';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <div className="app-container">
        <Navbar />
      <App />
      </div>
    </AuthProvider>
  </BrowserRouter>
);
