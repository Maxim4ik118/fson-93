import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AppHTTPRequests from 'AppHTTPRequests';
// import { App } from 'App';
// import { AppWithUseMemo } from 'AppWithUseMemo';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/react-homework-template">
    <AppHTTPRequests />
  </BrowserRouter>
);
