/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/14/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

// Internal Dependencies
import App from './App.jsx';
import { AppContextProvider } from './context/AppContext.jsx';

// Styles
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Router>
  </StrictMode>,
);
