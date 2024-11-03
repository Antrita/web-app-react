// src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

// Create root div dynamically
const rootDiv = document.createElement('div');
rootDiv.id = 'root';
document.body.appendChild(rootDiv);

const root = createRoot(rootDiv);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);