import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/common/utils/i18n';
import App from './App';
import '@react-starter/shared/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
