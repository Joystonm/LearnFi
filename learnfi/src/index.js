// Import process patch first
import './process-patch';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';

// Polyfills
import { Buffer } from 'buffer';
window.Buffer = Buffer;

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
