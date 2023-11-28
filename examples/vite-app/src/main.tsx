import React from 'react';

import { ThemeProvider } from '@paalan/tailwind-ui/providers';
import ReactDOM from 'react-dom/client';

import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
