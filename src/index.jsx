import React from 'react';
import ReactDOM from 'react-dom/client';
import { MovieProvider } from './context/MovieContext';
import App from './App';

// Import styles
import './styles/index.css';
import './styles/tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </React.StrictMode>
);