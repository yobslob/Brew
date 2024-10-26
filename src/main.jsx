import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MediumClone from './home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MediumClone />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
